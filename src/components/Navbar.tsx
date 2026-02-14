import { NavLink } from "@/components/NavLink";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user || null);
    };

    loadUser();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user || null);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  return (
    <nav className="w-full bg-gray-900 text-white px-6 py-4 flex items-center justify-between relative z-50">
      {/* Logo */}
      <div className="text-2xl font-bold">Boboblox</div>

      {/* Navigation Links */}
      <div className="flex gap-6 text-lg items-center">
        <NavLink to="/" className="hover:text-blue-400" activeClassName="text-blue-500 font-bold">
          Home
        </NavLink>



        <NavLink to="/shop" className="hover:text-blue-400" activeClassName="text-blue-500 font-bold">
          Shop
        </NavLink>

        {/* Codex Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-1 hover:text-blue-400 transition-colors outline-none">
            Codex
            <ChevronDown className="w-4 h-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="bg-card border-border">
            <DropdownMenuItem asChild>
              <a href="/lore" className="cursor-pointer">📖 Overview</a>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <a href="/story" className="cursor-pointer">📚 Story</a>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <a href="/characters" className="cursor-pointer">👥 Characters</a>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <a href="/worlds" className="cursor-pointer">🌍 Worlds</a>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <a href="/cutscenes" className="cursor-pointer">🎬 Cut-Scenes</a>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <a href="/creator-code" className="cursor-pointer">💻 Creator-Code</a>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {user && (
          <NavLink to="/profile" className="hover:text-blue-400" activeClassName="text-blue-500 font-bold">
            Profile
          </NavLink>
        )}

        {!user ? (
          <NavLink to="/auth" className="hover:text-blue-400" activeClassName="text-blue-500 font-bold">
            Get Started
          </NavLink>
        ) : (
          <button
            onClick={handleSignOut}
            className="hover:text-red-400 font-semibold transition"
          >
            Sign Out
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
