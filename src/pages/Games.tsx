import { Gamepad2, Users, Star, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface Game {
  id: string;
  title: string;
  description: string;
  players: string;
  rating: number;
  category: string;
  imageColor: string;
}

const games: Game[] = [
  {
    id: "1",
    title: "Bobo Tycoon",
    description: "Build your own empire and become the richest player in Boboblox!",
    players: "1.2K",
    rating: 4.8,
    category: "Tycoon",
    imageColor: "from-cyan-500/30 to-blue-600/30"
  },
  {
    id: "2", 
    title: "Bobo Adventure",
    description: "Explore magical worlds and complete quests with friends!",
    players: "856",
    rating: 4.9,
    category: "Adventure",
    imageColor: "from-green-500/30 to-emerald-600/30"
  },
  {
    id: "3",
    title: "Bobo Obby",
    description: "Jump, climb, and race through challenging obstacle courses!",
    players: "2.1K",
    rating: 4.7,
    category: "Obby",
    imageColor: "from-orange-500/30 to-red-600/30"
  },
  {
    id: "4",
    title: "Bobo Simulator",
    description: "Collect pets, level up, and become the ultimate simulator master!",
    players: "945",
    rating: 4.6,
    category: "Simulator",
    imageColor: "from-purple-500/30 to-pink-600/30"
  },
  {
    id: "5",
    title: "Bobo Roleplay",
    description: "Create stories and roleplay with friends in a safe environment!",
    players: "1.5K",
    rating: 4.8,
    category: "Roleplay",
    imageColor: "from-yellow-500/30 to-amber-600/30"
  },
  {
    id: "6",
    title: "Bobo Racing",
    description: "Speed through tracks and compete for the fastest times!",
    players: "678",
    rating: 4.5,
    category: "Racing",
    imageColor: "from-red-500/30 to-rose-600/30"
  }
];

const GameCard = ({ game }: { game: Game }) => {
  return (
    <div className="group bg-card-gradient border border-border rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
      {/* Game Image Placeholder */}
      <div className={`h-40 bg-gradient-to-br ${game.imageColor} relative overflow-hidden`}>
        <div className="absolute inset-0 flex items-center justify-center">
          <Gamepad2 className="w-16 h-16 text-foreground/30" />
        </div>
        <div className="absolute top-3 right-3 bg-secondary/80 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium">
          {game.category}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
      </div>
      
      {/* Game Info */}
      <div className="p-5">
        <h3 className="font-display text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
          {game.title}
        </h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {game.description}
        </p>
        
        {/* Stats */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Users className="w-4 h-4" />
            <span>{game.players} playing</span>
          </div>
          <div className="flex items-center gap-1 text-sm">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            <span className="text-foreground font-medium">{game.rating}</span>
          </div>
        </div>
        
        {/* Play Button */}
        <Button variant="hero" className="w-full group/btn">
          <Play className="w-4 h-4 mr-2" />
          Play Now
        </Button>
      </div>
    </div>
  );
};

const Games = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-secondary/50 border border-primary/20 rounded-full px-4 py-2 mb-6 backdrop-blur-sm">
              <Gamepad2 className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">Kid-Safe Games</span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Explore <span className="text-gradient-cyan">Games</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Discover fun, age-appropriate games created just for Boboblox players. All games are moderated for safety!
            </p>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {["All", "Tycoon", "Adventure", "Obby", "Simulator", "Roleplay", "Racing"].map((category) => (
              <Button
                key={category}
                variant={category === "All" ? "default" : "outline"}
                size="sm"
                className="rounded-full"
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Games Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {games.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Games;
