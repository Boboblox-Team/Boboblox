import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const PlayPage = () => {
  const { id } = useParams();
  const [game, setGame] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadGame = async () => {
      const { data, error } = await supabase
        .from("user_games")
        .select("*")
        .eq("id", id)
        .single();

      if (!error && data) {
        setGame(data);
      }

      setLoading(false);
    };

    loadGame();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading game…</p>
      </div>
    );
  }

  if (!game) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Game not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-16 container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-4">{game.title}</h1>
        <p className="text-muted-foreground mb-6">{game.description}</p>

        <div className="p-6 bg-card border border-border rounded-xl">
  <GameEngine gameData={game.game_data} title={game.title} />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PlayPage;
