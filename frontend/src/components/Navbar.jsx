import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { IoHomeOutline } from "react-icons/io5";
import { LuLayoutDashboard } from "react-icons/lu";
import { AiOutlineTransaction } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";

const Navbar = () => {

  const navigate = useNavigate();
  const [name, setName] = useState("");

  useEffect(() => {
   const token = localStorage.getItem("token");
   if (!token) {
     console.log("Token not found in local storage");
     navigate("/login");
     return;
   }
   const user = localStorage.getItem("user");
   if (user) {
    try {
      const parsedUser = JSON.parse(user);
      if (parsedUser.name) {
        setName(parsedUser.name);
      }
    } catch (error) {
      console.log("Error parsing user data from local storage:", error);
      return;

    }
   }
  }, [])
  
  return (
    <nav className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
      {/* Left Section */}
      <div className="flex items-center space-x-8">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "flex items-center text-blue-600 font-semibold text-xl"
              : "flex items-center text-gray-800 hover:text-blue-600 text-xl font-semibold"
          }
        >
          <IoHomeOutline className="mr-2 text-2xl" />
          MyFinance
        </NavLink>
      </div>

      {/* Navigation Links */}
      <div className="flex items-center space-x-6">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive
              ? "flex items-center text-blue-600 font-semibold text-lg"
              : "flex items-center text-gray-800 hover:text-blue-600 text-lg font-medium"
          }
        >
          <LuLayoutDashboard className="mr-2 text-xl" />
          Dashboard
        </NavLink>

        <NavLink
          to="/transactions"
          className={({ isActive }) =>
            isActive
              ? "flex items-center text-blue-600 font-semibold text-lg"
              : "flex items-center text-gray-800 hover:text-blue-600 text-lg font-medium"
          }
        >
          <AiOutlineTransaction className="mr-2 text-xl" />
          Transactions
        </NavLink>

        <NavLink
          to="/profile"
          className={({ isActive }) =>
            isActive
              ? "flex items-center text-blue-600 font-semibold text-lg"
              : "flex items-center text-gray-800 hover:text-blue-600 text-lg font-medium"
          }
        >
          <CgProfile className="mr-2 text-xl" />
          Profile
        </NavLink>
      </div>

      {/* Right Section */}
      <div>
        <span className="text-gray-800 font-medium text-lg">Hello, {name}</span>
      </div>
    </nav>
  );
};

export default Navbar;
