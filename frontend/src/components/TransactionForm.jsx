import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./Navbar";
import { getUserFromStorage } from "../utils/getUserFromStorage";
import { createTransaction } from "../api/transactionApi";
import { FaMoneyBillWave, FaInfoCircle } from "react-icons/fa";

const TransactionForm = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);
  const typeRef = useRef();
  const amountRef = useRef();
  const descriptionRef = useRef();

  useEffect(() => {
    const user = getUserFromStorage();
    if (!user) {
      toast.error("User not found. Please log in again.");
      navigate("/login");
    } else {
      setUserId(user.userId);
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      toast.error("User ID is not loaded yet. Please wait a moment.");
      return;
    }

    const type = typeRef.current.value;
    const amount = amountRef.current.value;
    const description = descriptionRef.current.value;

    const data = { userId, type, amount, description };

    try {
      await createTransaction(data);
      toast.success("Transaction added successfully!");
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } catch (error) {
      toast.error("Error adding transaction: " + error.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center px-4 pt-16">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 sm:p-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">
            Add New Transaction
          </h2>
          <p className="text-sm text-gray-500 mb-6 text-center">
            Record your income or expenses to keep your finances on track.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Type */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Type
              </label>
              <select
                ref={typeRef}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="">Select</option>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>

            {/* Amount */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Amount
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-gray-400">₹</span>
                <input
                  type="number"
                  ref={amountRef}
                  placeholder="100"
                  className="w-full pl-7 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />
              </div>
            </div>

            {/* Description */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
                <FaInfoCircle className="text-gray-400 mr-2" />
                <input
                  type="text"
                  ref={descriptionRef}
                  placeholder="e.g. Grocery"
                  className="w-full text-sm focus:outline-none"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 shadow-md transition transform hover:-translate-y-1"
            >
              Add Transaction
            </button>
          </form>
        </div>

        <ToastContainer
          position="top-right"
          autoClose={2000}
          pauseOnHover={false}
        />
      </div>
    </>
  );
};

export default TransactionForm;
