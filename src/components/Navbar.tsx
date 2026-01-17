import { NavLink } from "@/components/NavLink";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check auth state on mount
  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();
      setIsLoggedIn(!!data.user);
    };

    checkUser();

    // Listen for login/logout changes
    const { data: listener } = supabase.auth.onAuthStateChange(() => {
      checkUser();
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  // Sign out function
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

        {isLoggedIn && (
          <NavLink to="/profile" className="hover:text-blue-400" activeClassName="text-blue-500 font-bold">
            Profile
          </NavLink>
        )}

        {!isLoggedIn ? (
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
