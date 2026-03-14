import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Link, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

const Profile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<{ username: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      const { data: auth } = await supabase.auth.getUser();

      if (!auth.user) {
        navigate("/auth");
        return;
      }

      // Fetch only the profile (no games)
      const { data: profileResult } = await supabase
        .from("profiles")
        .select("username")
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
        {/* Profile Header */}
        <div className="bg-gray-900 p-8 rounded-xl border border-gray-800 shadow-lg mb-8">
          <h1 className="text-4xl font-bold mb-4">
            {profile?.username ?? "No username set"}
          </h1>

          <p className="text-gray-400 mb-6">
            Welcome to your Boboblox profile.
          </p>

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

export default Profile;import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Link, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

const Profile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<{ username: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      const { data: auth } = await supabase.auth.getUser();

      if (!auth.user) {
        navigate("/auth");
        return;
      }

      // Fetch only the profile (no games)
      const { data: profileResult } = await supabase
        .from("profiles")
        .select("username")
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
        {/* Profile Header */}
        <div className="bg-gray-900 p-8 rounded-xl border border-gray-800 shadow-lg mb-8">
          <h1 className="text-4xl font-bold mb-4">
            {profile?.username ?? "No username set"}
          </h1>

          <p className="text-gray-400 mb-6">
            Welcome to your Boboblox profile.
          </p>

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
