import { useState, useEffect, useCallback, useRef } from "react";
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

  // Refs so updatePosition always has the freshest channel/user
  const channelRef = useRef<RealtimeChannel | null>(null);
  const subscribedRef = useRef(false);
  const userRef = useRef(user);
  userRef.current = user;

  useEffect(() => {
    if (!user) return;

    const username =
      user.user_metadata?.username ||
      user.email?.split("@")[0] ||
      "Explorer";
    const color = pickColor(user.id);
    setMyColor(color);

    const startPos: [number, number, number] = [0, 1, 8];

    const ch = supabase.channel(`island:${channelName}`, {
      config: { presence: { key: user.id } },
    });

    channelRef.current = ch;
    subscribedRef.current = false;

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
        if (p && p.position) {
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

    ch.on("presence", { event: "join" }, ({ key, newPresences }) => {
      console.log(`[${channelName}] joined:`, key, newPresences);
    });

    ch.on("presence", { event: "leave" }, ({ key, leftPresences }) => {
      console.log(`[${channelName}] left:`, key, leftPresences);
    });

    ch.subscribe(async (status) => {
      console.log(`[${channelName}] channel status:`, status);
      if (status === "SUBSCRIBED") {
        subscribedRef.current = true;
        const trackResult = await ch.track({
          userId: user.id,
          username,
          color,
          position: startPos,
        });
        console.log(`[${channelName}] initial track:`, trackResult);
      } else if (status === "CHANNEL_ERROR" || status === "TIMED_OUT") {
        console.error(`[${channelName}] subscription failed:`, status);
        subscribedRef.current = false;
      }
    });

    return () => {
      subscribedRef.current = false;
      channelRef.current = null;
      supabase.removeChannel(ch);
    };
  }, [user?.id, channelName]);

  const updatePosition = useCallback(
    async (position: [number, number, number]) => {
      const ch = channelRef.current;
      const u = userRef.current;
      if (!ch || !u || !subscribedRef.current) return;

      const username =
        u.user_metadata?.username || u.email?.split("@")[0] || "Explorer";

      await ch.track({
        userId: u.id,
        username,
        color: pickColor(u.id),
        position,
      });
    },
    []
  );

  return { otherPlayers, onlineCount, updatePosition, myColor };
};
