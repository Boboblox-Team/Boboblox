import React from "react";
import { Link } from "react-router-dom";

const Profile = () => {
  return (
    <div className="p-8 max-w-3xl mx-auto">
      {/* Page Title */}
      <h1 className="text-3xl font-bold mb-6">Your Profile</h1>

      {/* Avatar + Username */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-20 h-20 bg-gray-300 rounded-full" />
        <div>
          <h2 className="text-xl font-semibold">Username</h2>
          <p className="text-gray-500">Joined: Today</p>
        </div>
      </div>

      {/* Bobobux Wallet */}
      <div className="mb-8 p-4 border rounded-lg bg-gray-50">
        <h3 className="text-lg font-semibold mb-2">Bobobux Balance</h3>
        <p className="text-2xl font-bold">0</p>
      </div>

      {/* Your Games Section */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Your Games</h3>

        <p className="text-gray-500 mb-4">
          This will later show the games you created in /create.
        </p>

        <Link
          to="/create"
          className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          Go to My Games
        </Link>
      </div>

      {/* Settings */}
      <div className="mt-10">
        <h3 className="text-xl font-semibold mb-4">Settings</h3>

        <ul className="space-y-2">
          <li className="text-blue-600 cursor-pointer">Change Username</li>
          <li className="text-blue-600 cursor-pointer">Change Avatar</li>
          <li className="text-blue-600 cursor-pointer">Log Out</li>
        </ul>
      </div>
    </div>
  );
};

export default Profile;
