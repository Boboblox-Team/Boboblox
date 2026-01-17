import { useState } from "react";

const Profile = () => {
  // Temporary placeholder data — replace with real user data later
  const [user] = useState({
    username: "Player123",
    avatar: "https://api.dicebear.com/7.x/thumbs/svg?seed=Boboblox",
    bobobux: 250,
    joined: "January 2025",
  });

  return (
    <div className="min-h-screen bg-gray-950 text-white px-6 py-10">
      <div className="max-w-3xl mx-auto bg-gray-900 rounded-xl p-8 shadow-lg border border-gray-800">
        
        {/* Header */}
        <div className="flex items-center gap-6">
          <img
            src={user.avatar}
            alt="Avatar"
            className="w-24 h-24 rounded-full border-4 border-blue-500"
          />

          <div>
            <h1 className="text-3xl font-bold">{user.username}</h1>
            <p className="text-gray-400">Joined {user.joined}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-gray-800 p-5 rounded-lg border border-gray-700">
            <h2 className="text-xl font-semibold">Bobobux</h2>
            <p className="text-3xl font-bold text-green-400">{user.bobobux}</p>
          </div>

          <div className="bg-gray-800 p-5 rounded-lg border border-gray-700">
            <h2 className="text-xl font-semibold">Games Created</h2>
            <p className="text-3xl font-bold text-blue-400">0</p>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-10">
          <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
