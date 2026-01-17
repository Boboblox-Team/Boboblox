import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

const Profile = () => {
  const { user } = useAuth(); // logged‑in user
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const loadProfile = async () => {
      if (!user) return;

      // Fetch profile from Supabase
      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      setProfile({
        username: data?.username || "Unknown User",
        avatar: data?.avatar_url || "https://api.dicebear.com/7.x/thumbs/svg?seed=Boboblox",
        bobobux: data?.bobobux || 0,
        joined: new Date(user.created_at).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
        }),
      });
    };

    loadProfile();
  }, [user]);

  if (!profile) {
    return (
      <div className="min-h-screen bg-gray-950 text-white pt-20 px-6 pb-10">
        <p>Loading profile…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white pt-20 px-6 pb-10">
      <div className="max-w-3xl mx-auto bg-gray-900 rounded-xl p-8 shadow-lg border border-gray-800">
        
        {/* Header */}
        <div className="flex items-center gap-6">
          <img
            src={profile.avatar}
            alt="Avatar"
            className="w-24 h-24 rounded-full border-4 border-blue-500"
          />

          <div>
            <h1 className="text-3xl font-bold">{profile.username}</h1>
            <p className="text-gray-400">Joined {profile.joined}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-gray-800 p-5 rounded-lg border border-gray-700">
            <h2 className="text-xl font-semibold">Bobobux</h2>
            <p className="text-3xl font-bold text-green-400">{profile.bobobux}</p>
          </div>

          <div className="bg-gray-800 p-5 rounded-lg border border-gray-700">
            <h2 className="text-xl font-semibold">Games Created</h2>
            <p className="text-3xl font-bold text-blue-400">0</p>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-10">
          <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
