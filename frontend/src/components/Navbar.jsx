import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { IoHomeOutline } from "react-icons/io5";
import { LuLayoutDashboard } from "react-icons/lu";
import { AiOutlineTransaction } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";

const Navbar = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    const user = localStorage.getItem("user");
    if (user) {
      try {
        const parsedUser = JSON.parse(user);
        if (parsedUser.name) setName(parsedUser.name);
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, [navigate]);

  const navLinkClasses = (isActive) =>
    isActive
      ? "flex items-center text-blue-600 font-semibold text-lg"
      : "flex items-center text-gray-700 hover:text-blue-600 transition-colors duration-200 text-lg font-medium";

  return (
    <nav className="bg-white shadow-md px-4 sm:px-6 py-3 md:py-4 flex items-center justify-between relative z-50">
      {/* Logo */}
      <NavLink
        to="/"
        className="flex items-center text-gray-800 hover:text-blue-600 text-xl font-bold"
      >
        <IoHomeOutline className="mr-2 text-2xl" />
        MyFinance
      </NavLink>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center space-x-6">
        <NavLink
          to="/dashboard"
          className={({ isActive }) => navLinkClasses(isActive)}
        >
          <LuLayoutDashboard className="mr-2 text-xl" /> Dashboard
        </NavLink>
        <NavLink
          to="/transactions"
          className={({ isActive }) => navLinkClasses(isActive)}
        >
          <AiOutlineTransaction className="mr-2 text-xl" /> Transactions
        </NavLink>
        <NavLink
          to="/profile"
          className={({ isActive }) => navLinkClasses(isActive)}
        >
          <CgProfile className="mr-2 text-xl" /> Profile
        </NavLink>
      </div>

      {/* Hello, User Badge */}
      <div className="hidden md:flex items-center ml-6">
        <span className="text-gray-500 mr-2">Hello,</span>
        <span className="bg-blue-100 text-blue-600 font-semibold px-3 py-1 rounded-full shadow-sm">
          {name || "User"}
        </span>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden flex items-center">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-gray-800 focus:outline-none text-2xl"
        >
          {menuOpen ? <HiOutlineX /> : <HiOutlineMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-md md:hidden flex flex-col px-4 py-4 space-y-3">
          <NavLink
            to="/dashboard"
            className={({ isActive }) => navLinkClasses(isActive)}
            onClick={() => setMenuOpen(false)}
          >
            <LuLayoutDashboard className="mr-2 text-xl" /> Dashboard
          </NavLink>
          <NavLink
            to="/transactions"
            className={({ isActive }) => navLinkClasses(isActive)}
            onClick={() => setMenuOpen(false)}
          >
            <AiOutlineTransaction className="mr-2 text-xl" /> Transactions
          </NavLink>
          <NavLink
            to="/profile"
            className={({ isActive }) => navLinkClasses(isActive)}
            onClick={() => setMenuOpen(false)}
          >
            <CgProfile className="mr-2 text-xl" /> Profile
          </NavLink>
          <div className="mt-2 flex items-center">
            <span className="text-gray-500 mr-2">Hello,</span>
            <span className="bg-blue-100 text-blue-600 font-semibold px-3 py-1 rounded-full shadow-sm">
              {name || "User"}
            </span>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
