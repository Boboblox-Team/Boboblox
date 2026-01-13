import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Plus, Gamepad2, Edit3, Trash2, Eye, EyeOff, Play } from "lucide-react";
import { toast } from "sonner";
import { UserGame, GameData } from "@/components/game-creator/types";

const Create = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [games, setGames] = useState<UserGame[]>([]);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<{ username: string } | null>(null);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
      return;
    }

    if (user) {
      loadUserGames();
      loadProfile();
    }
  }, [user, authLoading, navigate]);

  const loadProfile = async () => {
    if (!user) return;
    
    const { data } = await supabase
      .from('profiles')
      .select('username')
      .eq('user_id', user.id)
      .single();
    
    if (data) {
      setProfile(data);
    }
  };

  const loadUserGames = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('user_games')
      .select('*')
      .eq('user_id', user.id)
      .order('updated_at', { ascending: false });

    if (error) {
      toast.error("Failed to load your games");
    } else {
      // Cast the data properly
      const typedGames = (data || []).map(game => ({
        ...game,
        game_data: game.game_data as unknown as GameData
      })) as UserGame[];
      setGames(typedGames);
    }
    setLoading(false);
  };

  const handleDelete = async (gameId: string, gameTitle: string) => {
    if (!confirm(`Are you sure you want to delete "${gameTitle}"?`)) return;

    const { error } = await supabase
      .from('user_games')
      .delete()
      .eq('id', gameId);

    if (error) {
      toast.error("Failed to delete game");
    } else {
      toast.success("Game deleted");
      setGames(prev => prev.filter(g => g.id !== gameId));
    }
  };

  const togglePublish = async (game: UserGame) => {
    const { error } = await supabase
      .from('user_games')
      .update({ is_published: !game.is_published })
      .eq('id', game.id);

    if (error) {
      toast.error("Failed to update game");
    } else {
      toast.success(game.is_published ? "Game unpublished" : "Game published!");
      setGames(prev => prev.map(g => 
        g.id === game.id ? { ...g, is_published: !g.is_published } : g
      ));
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-secondary/50 border border-primary/20 rounded-full px-4 py-2 mb-6 backdrop-blur-sm">
              <Gamepad2 className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">Game Creator</span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Welcome, <span className="text-gradient-cyan">{profile?.username || 'Creator'}!</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Build your own games with our easy drag-and-drop editor. No coding needed!
            </p>
          </div>

          {/* Create New Button */}
          <div className="flex justify-center mb-12">
            <Link to="/create/new">
              <Button variant="hero" size="lg" className="gap-2 text-lg px-8">
                <Plus className="w-5 h-5" />
                Create New Game
              </Button>
            </Link>
          </div>

          {/* User's Games */}
          <div>
            <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-2">
              <span>🎮</span> Your Games
            </h2>

            {loading ? (
              <div className="text-center py-12 text-muted-foreground">
                Loading your games...
              </div>
            ) : games.length === 0 ? (
              <div className="text-center py-12 bg-card border border-border rounded-2xl">
                <p className="text-4xl mb-4">🎨</p>
                <p className="text-lg font-medium text-foreground mb-2">No games yet!</p>
                <p className="text-muted-foreground">Create your first game and share it with the world.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {games.map((game) => (
                  <div 
                    key={game.id}
                    className="bg-card-gradient border border-border rounded-2xl overflow-hidden hover:border-primary/50 transition-all"
                  >
                    {/* Thumbnail */}
                    <div 
                      className="h-32 flex items-center justify-center"
                      style={{ backgroundColor: game.thumbnail_color }}
                    >
                      <Gamepad2 className="w-12 h-12 text-white/30" />
                    </div>

                    {/* Info */}
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-display font-bold text-foreground truncate">
                          {game.title}
                        </h3>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          game.is_published 
                            ? 'bg-green-500/20 text-green-400' 
                            : 'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {game.is_published ? 'Live' : 'Draft'}
                        </span>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {game.description || 'No description'}
                      </p>

                      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
                        <Play className="w-3 h-3" />
                        <span>{game.play_count} plays</span>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2">
                        <Link to={`/create/edit/${game.id}`} className="flex-1">
                          <Button variant="outline" size="sm" className="w-full gap-1">
                            <Edit3 className="w-3 h-3" />
                            Edit
                          </Button>
                        </Link>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => togglePublish(game)}
                          className="gap-1"
                        >
                          {game.is_published ? (
                            <><EyeOff className="w-3 h-3" /> Hide</>
                          ) : (
                            <><Eye className="w-3 h-3" /> Publish</>
                          )}
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDelete(game.id, game.title)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Create;
