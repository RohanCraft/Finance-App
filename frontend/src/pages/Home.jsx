import React from "react";
import Navbar from "../components/Navbar";
import {
  FaPlusCircle,
  FaEdit,
  FaUserCircle,
  FaWallet,
  FaRegMoneyBillAlt,
} from "react-icons/fa";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <Navbar />

      {/* Hero Section */}
      <section className="relative text-center py-24 px-4 bg-gradient-to-r from-blue-500 to-blue-700 text-white">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-md">
          Welcome Back to MyFinance Tracker
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto mb-12 drop-shadow-sm">
          Stay on top of your finances, manage your transactions, and make
          smarter budget decisions.
        </p>
        {/* Subtle illustration / icon */}
        <FaWallet className="mx-auto text-6xl md:text-8xl text-blue-100 opacity-30" />
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 bg-gray-50">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
          Key Features
        </h2>
        <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
          <div className="bg-white p-6 rounded-xl shadow-lg text-center transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl">
            <FaPlusCircle className="text-4xl text-blue-500 mx-auto mb-4" />
            <h3 className="font-semibold text-xl mb-2">Add Transactions</h3>
            <p className="text-gray-600 text-sm">
              Quickly log your income or expenses with all the details that
              matter.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg text-center transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl">
            <FaEdit className="text-4xl text-green-500 mx-auto mb-4" />
            <h3 className="font-semibold text-xl mb-2">Track & Edit</h3>
            <p className="text-gray-600 text-sm">
              View, edit, or delete your transaction history anytime.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg text-center transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl">
            <FaUserCircle className="text-4xl text-purple-500 mx-auto mb-4" />
            <h3 className="font-semibold text-xl mb-2">Profile Overview</h3>
            <p className="text-gray-600 text-sm">
              See your personal details like name, email, and user ID.
            </p>
          </div>
        </div>
      </section>

      {/* Dashboard Overview Section */}
      <section className="py-16 px-6 bg-gray-100">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
          Dashboard Overview
        </h2>
        <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <FaRegMoneyBillAlt className="text-4xl text-green-500 mx-auto mb-4" />
            <h3 className="font-semibold text-xl mb-2">Total Transactions</h3>
            <p className="text-gray-600 text-sm">
              Track all your income and expenses in one place.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <FaWallet className="text-4xl text-blue-500 mx-auto mb-4" />
            <h3 className="font-semibold text-xl mb-2">Recent Transaction</h3>
            <p className="text-gray-600 text-sm">
              Quickly access your last recorded transaction.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <FaUserCircle className="text-4xl text-purple-500 mx-auto mb-4" />
            <h3 className="font-semibold text-xl mb-2">Account Details</h3>
            <p className="text-gray-600 text-sm">
              View and manage your profile information.
            </p>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="py-8 bg-gray-100 text-gray-600 text-sm">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center px-4">
          <p className="mb-2 md:mb-0">Made by Rohan</p>
          <p>
            © {new Date().getFullYear()} MyFinance App. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
