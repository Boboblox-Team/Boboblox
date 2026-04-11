import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";
import type { RealtimeChannel } from "@supabase/supabase-js";

const PRESENCE_COLORS = [
  "#f43f5e", "#8b5cf6", "#ec4899", "#f59e0b",
  "#10b981", "#6366f1", "#14b8a6", "#f97316",
];

function pickColor(userId: string) {
  let hash = 0;
  for (let i = 0; i < userId.length; i++) {
    hash = userId.charCodeAt(i) + ((hash << 5) - hash);
  }
  return PRESENCE_COLORS[Math.abs(hash) % PRESENCE_COLORS.length];
}

export interface IslandPlayer {
  userId: string;
  username: string;
  color: string;
  position: [number, number, number];
}

export const useIslandPresence = (channelName: string) => {
  const { user } = useAuth();
  const [otherPlayers, setOtherPlayers] = useState<IslandPlayer[]>([]);
  const [onlineCount, setOnlineCount] = useState(0);
  const [myColor, setMyColor] = useState("#10b981");
  const [channel, setChannel] = useState<RealtimeChannel | null>(null);

  useEffect(() => {
    if (!user) return;

    const username =
      user.user_metadata?.username ||
      user.email?.split("@")[0] ||
      "Explorer";
    const color = pickColor(user.id);
    setMyColor(color);

    const startPos: [number, number, number] = [0, 1, 8];

    const ch = supabase.channel(channelName, {
      config: { presence: { key: user.id } },
    });

    ch.on("presence", { event: "sync" }, () => {
      const state = ch.presenceState<{
        userId: string;
        username: string;
        color: string;
        position: [number, number, number];
      }>();

      const players: IslandPlayer[] = [];
      for (const [key, presences] of Object.entries(state)) {
        if (key === user.id) continue;
        const p = presences[0];
        if (p) {
          players.push({
            userId: p.userId,
            username: p.username,
            color: p.color,
            position: p.position,
          });
        }
      }
      setOtherPlayers(players);
      setOnlineCount(Object.keys(state).length);
    });

    ch.on("presence", { event: "join" }, ({ newPresences }) => {
      console.log("[tropical_island] player joined:", newPresences);
    });

    ch.on("presence", { event: "leave" }, ({ leftPresences }) => {
      console.log("[tropical_island] player left:", leftPresences);
    });

    ch.subscribe(async (status) => {
      if (status === "SUBSCRIBED") {
        await ch.track({
          userId: user.id,
          username,
          color,
          position: startPos,
        });

        // Notify join via proxy edge function (avoids CORS preflight)
        try {
          const { data: sessionData } = await supabase.auth.getSession();
          const accessToken = sessionData?.session?.access_token;
          if (accessToken) {
            const projectId = import.meta.env.VITE_SUPABASE_PROJECT_ID;
            await fetch(
              `https://${projectId}.supabase.co/functions/v1/island-join`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify({
                  username,
                  color,
                  channel: channelName,
                }),
              }
            );
          }
        } catch (err) {
          console.warn("[tropical_island] join call failed:", err);
        }
      }
    });

    setChannel(ch);

    return () => {
      ch.unsubscribe();
    };
  }, [user, channelName]);

  const updatePosition = useCallback(
    async (position: [number, number, number]) => {
      if (!channel || !user) return;
      const username =
        user.user_metadata?.username ||
        user.email?.split("@")[0] ||
        "Explorer";
      await channel.track({
        userId: user.id,
        username,
        color: pickColor(user.id),
        position,
      });
    },
    [channel, user]
  );

  return { otherPlayers, onlineCount, updatePosition, myColor };
};
