import { useState, useEffect } from "react";
import { Gamepad2, Users, Play, User, Plus, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

interface Game {
  id: string;
  title: string;
  description: string;
  players: string;
  category: string;
  imageColor: string;
  creatorName?: string;
}

const GameCard = ({ game }: { game: Game }) => (
  <div className="group bg-card-gradient border border-border rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
    <div className="h-40 relative overflow-hidden" style={{ backgroundColor: game.imageColor }}>
      <div className="absolute inset-0 flex items-center justify-center"><Gamepad2 className="w-16 h-16 text-foreground/30" /></div>
      <div className="absolute top-3 right-3 bg-secondary/80 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium">{game.category}</div>
      <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
    </div>
    <div className="p-5">
      <h3 className="font-display text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{game.title}</h3>
      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{game.description}</p>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-1 text-sm text-muted-foreground"><Users className="w-4 h-4" /><span>{game.players} plays</span></div>
        {game.creatorName && <div className="flex items-center gap-1 text-sm text-muted-foreground"><User className="w-3 h-3" /><span>{game.creatorName}</span></div>}
      </div>
      <Link to={`/play/${game.id}`}>
        <Button variant="hero" className="w-full group/btn"><Play className="w-4 h-4 mr-2" />Play Now</Button>
      </Link>
    </div>
  </div>
);

const Games = () => {
  const { user } = useAuth();
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGames = async () => {
      const { data, error } = await supabase
        .from('games')
        .select('id, title, description, thumbnail_color, play_count, profiles:user_id(username)')
        .eq('is_published', true)
        .order('play_count', { ascending: false });
      
      if (data && !error) {
        setGames(data.map((g: any) => ({
          id: g.id,
          title: g.title,
          description: g.description || 'A fun community game!',
          players: `${g.play_count}`,
          category: 'Community',
          imageColor: g.thumbnail_color,
          creatorName: g.profiles?.username || 'Anonymous'
        })));
      }
      setLoading(false);
    };
    fetchGames();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-secondary/50 border border-primary/20 rounded-full px-4 py-2 mb-6 backdrop-blur-sm"><Gamepad2 className="w-4 h-4 text-primary" /><span className="text-sm text-muted-foreground">Kid-Safe Games</span></div>
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">Explore <span className="text-gradient-cyan">Games</span></h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Discover fun games created by Boboblox and our community. All games are moderated for safety!</p>
          </div>
          {user && <div className="flex justify-center mb-8"><Link to="/create"><Button variant="outline" className="gap-2"><Plus className="w-4 h-4" />Create Your Own Game</Button></Link></div>}
          {loading ? (
            <div className="flex justify-center py-16"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
          ) : games.length === 0 ? (
            <div className="text-center py-16">
              <Gamepad2 className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
              <p className="text-muted-foreground text-lg">No published games yet. Be the first to create one!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{games.map((game) => <GameCard key={game.id} game={game} />)}</div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Games;