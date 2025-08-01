import React, { useEffect, useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import { getUserFromStorage } from '../utils/getUserFromStorage';
import { toast } from 'react-toastify';

const Profile = () => {
  const navigate = useNavigate();

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [userId, setUserId] = useState();

  useEffect(() => {
    const user = getUserFromStorage();
    if(!user) {
      toast.error("User not found. Please log in again.");
      navigate("/login");
    }
    setName(user.name);
    setEmail(user.email);
    setUserId(user.userId);

  }, []);

  const handleClick = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <Navbar />
      <div className="h-screen bg-gray-100 flex items-center justify-center px-4 overflow-hidden">
        <div className="bg-white rounded-xl shadow-md p-8 w-full max-w-md text-center">
          <FaUserCircle className="text-blue-500 mx-auto mb-4" size={80} />
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">{name}</h2>
          <p className="text-gray-600 text-sm mb-1">
            <span className="font-medium">Email:</span> {email}
          </p>
          <p className="text-gray-600 text-sm mb-6">
            <span className="font-medium">User ID:</span> {userId}
          </p>

          <button
            className="bg-red-500 text-white px-4 py-2 rounded-md text-sm hover:bg-red-600 transition duration-200"
            onClick={handleClick}
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Profile;
