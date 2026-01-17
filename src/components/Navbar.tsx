import { NavLink } from "@/components/NavLink";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [user, setUser] = useState(null);

  // Load user on mount
  useEffect(() => {
    const loadUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user || null);
    };

    loadUser();

    // Listen for login/logout changes
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user || null);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  // Sign out
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

        <NavLink to="/games" className="hover:text-blue-400" activeClassName="text-blue-500 font-bold">
          Games
        </NavLink>

        <NavLink to="/create" className="hover:text-blue-400" activeClassName="text-blue-500 font-bold">
          Create
        </NavLink>

        <NavLink to="/shop" className="hover:text-blue-400" activeClassName="text-blue-500 font-bold">
          Shop
        </NavLink>

        <NavLink to="/about" className="hover:text-blue-400" activeClassName="text-blue-500 font-bold">
          About
        </NavLink>

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
