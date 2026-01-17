import { Coins, Sparkles, Gift, Star, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";

interface BobobuxPackage {
  id: string;
  amount: number;
  price: number;
  bonus?: number;
  popular?: boolean;
  bestValue?: boolean;
}

const packages: BobobuxPackage[] = [
  {
    id: "starter",
    amount: 100,
    price: 3.40,
  },
  {
    id: "basic",
    amount: 250,
    price: 7.99,
    bonus: 25,
  },
  {
    id: "popular",
    amount: 500,
    price: 14.99,
    bonus: 75,
    popular: true,
  },
  {
    id: "premium",
    amount: 1000,
    price: 27.99,
    bonus: 200,
  },
  {
    id: "mega",
    amount: 2500,
    price: 64.99,
    bonus: 625,
    bestValue: true,
  },
  {
    id: "ultimate",
    amount: 5000,
    price: 119.99,
    bonus: 1500,
  },
];

const BobobuxCard = ({ pkg }: { pkg: BobobuxPackage }) => {
  const totalAmount = pkg.amount + (pkg.bonus || 0);

  return (
    <div
      className={`relative bg-card-gradient border rounded-2xl p-6 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 ${
        pkg.popular
          ? "border-primary shadow-lg shadow-primary/20"
          : pkg.bestValue
          ? "border-green-500 shadow-lg shadow-green-500/20"
          : "border-border hover:border-primary/50"
      }`}
    >
      {/* Badge */}
      {pkg.popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-xs font-bold">
          MOST POPULAR
        </div>
      )}
      {pkg.bestValue && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-green-500 text-white px-4 py-1 rounded-full text-xs font-bold">
          BEST VALUE
        </div>
      )}

      {/* Bobobux Amount */}
      <div className="flex items-center justify-center gap-2 mb-4 mt-2">
        <Coins className="w-8 h-8 text-primary" />
        <span className="font-display text-3xl font-bold text-foreground">
          {pkg.amount.toLocaleString()}
        </span>
      </div>

      {/* Bonus */}
      {pkg.bonus && (
        <div className="flex items-center justify-center gap-1 mb-4">
          <Gift className="w-4 h-4 text-green-400" />
          <span className="text-green-400 text-sm font-medium">
            +{pkg.bonus} Bonus!
          </span>
        </div>
      )}

      {/* Total if bonus */}
      {pkg.bonus && (
        <div className="text-center mb-4">
          <span className="text-muted-foreground text-sm">Total: </span>
          <span className="text-foreground font-bold">
            {totalAmount.toLocaleString()} Bobobux
          </span>
        </div>
      )}

      {/* Price */}
      <div className="text-center mb-6">
        <span className="font-display text-2xl font-bold text-gradient-cyan">
          ${pkg.price.toFixed(2)}
        </span>
      </div>

      {/* Buy Button */}
      <Button
        variant={pkg.popular || pkg.bestValue ? "hero" : "outline"}
        className="w-full"
      >
        Buy Now
      </Button>
    </div>
  );
};

const Shop = () => {
  return (
    <div className="min-h-screen bg-background pt-20">
      <main className="pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-secondary/50 border border-primary/20 rounded-full px-4 py-2 mb-6 backdrop-blur-sm">
              <Coins className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">
                Official Bobobux Shop
              </span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Get <span className="text-gradient-cyan">Bobobux</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Bobobux is the official currency of Boboblox. Use it to buy items,
              accessories, and unlock special features!
            </p>
          </div>

          {/* Info Banner */}
          <div className="bg-secondary/30 border border-border rounded-2xl p-6 mb-10 max-w-3xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
                  <Sparkles className="w-8 h-8 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="font-display font-bold text-lg text-foreground mb-1">
                  Safe & Secure Purchasing
                </h3>
                <p className="text-muted-foreground text-sm">
                  All Bobobux purchases are handled securely. Parents can set
                  spending limits in the dashboard. Starting at just $3.40!
                </p>
              </div>
            </div>
          </div>

          {/* Packages Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {packages.map((pkg) => (
              <BobobuxCard key={pkg.id} pkg={pkg} />
            ))}
          </div>

          {/* Features */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="text-center p-6">
              <Star className="w-10 h-10 text-primary mx-auto mb-3" />
              <h4 className="font-display font-bold text-foreground mb-2">
                Instant Delivery
              </h4>
              <p className="text-muted-foreground text-sm">
                Bobobux are added to your account immediately after purchase
              </p>
            </div>
            <div className="text-center p-6">
              <Gift className="w-10 h-10 text-primary mx-auto mb-3" />
              <h4 className="font-display font-bold text-foreground mb-2">
                Bonus Rewards
              </h4>
              <p className="text-muted-foreground text-sm">
                Get extra Bobobux when you buy larger packages
              </p>
            </div>
            <div className="text-center p-6">
              <TrendingUp className="w-10 h-10 text-primary mx-auto mb-3" />
              <h4 className="font-display font-bold text-foreground mb-2">
                Parental Controls
              </h4>
              <p className="text-muted-foreground text-sm">
                Parents can manage and limit spending easily
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Shop;
