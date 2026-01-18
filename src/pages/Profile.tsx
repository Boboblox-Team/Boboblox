import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Link, useNavigate } from "react-router-dom";
import { Loader2, Gamepad2 } from "lucide-react";

interface UserGame {
  id: string;
  title: string;
  thumbnail_color: string;
  description: string | null;
  is_published: boolean;
  created_at: string;
}

const Profile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<{ username: string } | null>(null);
  const [games, setGames] = useState<UserGame[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfileAndGames = async () => {
      const { data: auth } = await supabase.auth.getUser();

      if (!auth.user) {
        navigate("/auth");
        return;
      }

      // Fetch profile and games in parallel
      const [profileResult, gamesResult] = await Promise.all([
        supabase
          .from("profiles")
          .select("username")
          .eq("user_id", auth.user.id)
          .maybeSingle(),
        supabase
          .from("user_games")
          .select("id, title, thumbnail_color, description, is_published, created_at")
          .eq("user_id", auth.user.id)
          .order("created_at", { ascending: false })
      ]);

      setProfile(profileResult.data);
      setGames(gamesResult.data || []);
      setLoading(false);
    };

    loadProfileAndGames();
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
          <h1 className="text-4xl font-bold mb-4">{profile?.username ?? "No username set"}</h1>
          <p className="text-gray-400 mb-6">Welcome to your Boboblox profile.</p>
          <Link
            to="/profile/edit"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold inline-block"
          >
            Edit Profile
          </Link>
        </div>

        {/* User's Games Section */}
        <div className="bg-gray-900 p-8 rounded-xl border border-gray-800 shadow-lg">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Gamepad2 className="h-6 w-6" />
            My Games
          </h2>

          {games.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400 mb-4">You haven't created any games yet.</p>
              <Link
                to="/create"
                className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg font-semibold inline-block"
              >
                Create Your First Game
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {games.map((game) => (
                <Link
                  key={game.id}
                  to={`/play/${game.id}`}
                  className="group block bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-blue-500 transition-all hover:scale-[1.02]"
                >
                  <div
                    className="h-32 flex items-center justify-center"
                    style={{ backgroundColor: game.thumbnail_color }}
                  >
                    <Gamepad2 className="h-12 w-12 text-white/70" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg truncate group-hover:text-blue-400 transition-colors">
                      {game.title}
                    </h3>
                    {game.description && (
                      <p className="text-gray-400 text-sm mt-1 line-clamp-2">
                        {game.description}
                      </p>
                    )}
                    <div className="mt-2 flex items-center gap-2">
                      <span
                        className={`text-xs px-2 py-1 rounded ${
                          game.is_published
                            ? "bg-green-600/20 text-green-400"
                            : "bg-yellow-600/20 text-yellow-400"
                        }`}
                      >
                        {game.is_published ? "Published" : "Draft"}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
