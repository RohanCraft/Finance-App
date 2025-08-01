import React from "react";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <Navbar />

      {/* Hero Section */}
      <section className="text-center py-16 px-4 bg-white shadow-sm">
        <h1 className="text-4xl font-bold mb-4 text-blue-600">
          Welcome to MyFinance Tracker
        </h1>
        <p className="text-lg max-w-2xl mx-auto">
          Manage your income, expenses, and stay on top of your budget with ease.
        </p>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6">
        <h2 className="text-2xl font-bold text-center mb-10 text-gray-800">
          Key Features
        </h2>
        <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <h3 className="font-semibold text-lg mb-2">Add Transactions</h3>
            <p className="text-sm text-gray-600">
              Quickly log your income or expenses with the details that matter.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <h3 className="font-semibold text-lg mb-2">Track & Edit</h3>
            <p className="text-sm text-gray-600">
              View, edit, or delete your transaction history as needed.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <h3 className="font-semibold text-lg mb-2">Profile Overview</h3>
            <p className="text-sm text-gray-600">
              See your personal details like name, email, and user ID.
            </p>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="py-6 text-center text-gray-600 text-sm">
        <p>Made by Rohan</p>
        <p>© {new Date().getFullYear()} MyFinance App. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
