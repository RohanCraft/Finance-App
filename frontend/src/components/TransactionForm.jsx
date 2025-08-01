import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./Navbar";
import { getUserFromStorage } from "../utils/getUserFromStorage";
import { createTransaction } from "../api/transactionApi";

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
    }
    setUserId(user.userId);
  }, []);

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
      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 pt-16">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 sm:p-8">
          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
            Add New Transaction
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Type
              </label>
              <select
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                ref={typeRef}
                required
              >
                <option value="">Select</option>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>

            {/* Amount */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Amount
              </label>
              <input
                type="number"
                ref={amountRef}
                placeholder="e.g. 100"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <input
                type="text"
                ref={descriptionRef}
                placeholder="e.g. Grocery"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition duration-200"
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
