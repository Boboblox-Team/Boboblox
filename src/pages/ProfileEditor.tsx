import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

const ProfileEditor = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      const { data: auth } = await supabase.auth.getUser();
      if (!auth.user) return;

      const { data } = await supabase
        .from("profiles")
        .select("username")
        .eq("id", auth.user.id)
        .single();

      if (data) {
        setUsername(data.username || "");
      }

      setLoading(false);
    };

    loadProfile();
  }, []);

  const handleSave = async () => {
    setLoading(true);

    const { data: auth } = await supabase.auth.getUser();
    if (!auth.user) return;

    await supabase
      .from("profiles")
      .update({ username })
      .eq("id", auth.user.id);

    navigate("/profile");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 text-white pt-20 px-6">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white pt-20 px-6">
      <div className="max-w-2xl mx-auto bg-gray-900 p-8 rounded-xl border border-gray-800 shadow-lg">
        <h1 className="text-3xl font-bold mb-6">Edit Profile</h1>

        {/* Username Field */}
        <div className="mb-6">
          <label className="block text-gray-300 mb-2">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
          />
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default ProfileEditor;
