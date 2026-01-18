import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Link, useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      const { data: auth } = await supabase.auth.getUser();

      // If not logged in → redirect to login
      if (!auth.user) {
        navigate("/auth");
        return;
      }

      const { data } = await supabase
        .from("profiles")
        .select("username")
        .eq("id", auth.user.id)
        .single();

      setProfile(data);
      setLoading(false);
    };

    loadProfile();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 text-white pt-20 px-6">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white pt-20 px-6">
      <div className="max-w-3xl mx-auto bg-gray-900 p-8 rounded-xl border border-gray-800 shadow-lg">
        <h1 className="text-4xl font-bold mb-4">{profile.username}</h1>

        <p className="text-gray-400 mb-8">
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
  );
};

export default Profile;
