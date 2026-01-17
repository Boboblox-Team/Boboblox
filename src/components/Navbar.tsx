import { NavLink } from "@/components/NavLink";

const Navbar = () => {
  return (
    <nav className="w-full bg-gray-900 text-white px-6 py-4 flex items-center justify-between">
      {/* Logo */}
      <div className="text-2xl font-bold">Boboblox</div>

      {/* Navigation Links */}
      <div className="flex gap-6 text-lg">
        <NavLink
          to="/"
          className="hover:text-blue-400"
          activeClassName="text-blue-500 font-bold"
        >
          Home
        </NavLink>

        <NavLink
          to="/games"
          className="hover:text-blue-400"
          activeClassName="text-blue-500 font-bold"
        >
          Games
        </NavLink>

        <NavLink
          to="/create"
          className="hover:text-blue-400"
          activeClassName="text-blue-500 font-bold"
        >
          Create
        </NavLink>

        <NavLink
          to="/shop"
          className="hover:text-blue-400"
          activeClassName="text-blue-500 font-bold"
        >
          Shop
        </NavLink>

        <NavLink
          to="/profile"
          className="hover:text-blue-400"
          activeClassName="text-blue-500 font-bold"
        >
          Profile
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
