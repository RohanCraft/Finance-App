import React, { useEffect, useState } from "react";
import { FaUserCircle, FaEnvelope, FaIdBadge } from "react-icons/fa";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { getUserFromStorage } from "../utils/getUserFromStorage";
import { toast } from "react-toastify";

const Profile = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const user = getUserFromStorage();
    if (!user) {
      toast.error("User not found. Please log in again.");
      navigate("/login");
      return;
    }
    setName(user.name);
    setEmail(user.email);
    setUserId(user.userId);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-blue-50 via-blue-100 to-gray-100">
      <Navbar />

      {/* Floating abstract shapes */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 pointer-events-none"></div>

      <div className="min-h-screen flex items-center justify-center px-4 py-12">
        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden relative z-10">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-8 flex flex-col items-center">
            <FaUserCircle size={90} className="mb-4 text-white" />
            <h2 className="text-3xl font-bold text-white">{name}</h2>
            <p className="text-white/80 mt-1 text-sm">Welcome to your profile</p>
          </div>

          {/* User Info */}
          <div className="p-8 space-y-6">
            <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
              <FaEnvelope className="text-blue-600 text-xl" />
              <div className="text-gray-700">
                <p className="text-sm font-medium">Email</p>
                <p className="text-gray-600 text-sm truncate">{email}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
              <FaIdBadge className="text-blue-600 text-xl" />
              <div className="text-gray-700">
                <p className="text-sm font-medium">User ID</p>
                <p className="text-gray-600 text-sm truncate">{userId}</p>
              </div>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="w-full mt-4 bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl transition duration-200 font-semibold shadow-md hover:shadow-lg"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
