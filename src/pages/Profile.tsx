import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Link, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

interface ProfileData {
  username: string;
  display_name: string | null;
  bio: string | null;
  avatar_url: string | null;
}

const Profile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      const { data: auth } = await supabase.auth.getUser();
      if (!auth.user) {
        navigate("/auth");
        return;
      }

      const { data: profileResult } = await supabase
        .from("profiles")
        .select("username, display_name, bio, avatar_url")
        .eq("user_id", auth.user.id)
        .maybeSingle();

      setProfile(profileResult);
      setLoading(false);
    };

    loadProfile();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 text-white pt-20 px-6 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white pt-20 px-6 pb-12">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-900 p-8 rounded-xl border border-gray-800 shadow-lg mb-8">
          <div className="flex items-start gap-6 mb-6">
            <div className="w-28 h-28 rounded-full bg-gray-800 border-2 border-gray-700 overflow-hidden flex-shrink-0 flex items-center justify-center">
              {profile?.avatar_url ? (
                <img
                  src={profile.avatar_url}
                  alt={profile.display_name || profile.username}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-4xl text-gray-500">?</span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-4xl font-bold mb-1 truncate">
                {profile?.display_name || profile?.username || "No username set"}
              </h1>
              {profile?.display_name && profile?.username && (
                <p className="text-gray-500 mb-2">@{profile.username}</p>
              )}
              {profile?.bio ? (
                <p className="text-gray-300 mt-3 whitespace-pre-wrap">{profile.bio}</p>
              ) : (
                <p className="text-gray-500 italic mt-3">No bio yet.</p>
              )}
            </div>
          </div>

          <Link
            to="/profile/edit"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold inline-block"
          >
            Edit Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;
