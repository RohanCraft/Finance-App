import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { updateTransaction } from "../api/transactionApi";
import { FaEdit } from "react-icons/fa";

const EditTransaction = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const transaction = location.state?.transaction;
  const userId = location.state?.userId;

  const [type, setType] = useState(transaction?.type || "");
  const [description, setDescription] = useState(
    transaction?.description || ""
  );
  const [amount, setAmount] = useState(transaction?.amount || "");

  useEffect(() => {
    if (!transaction || !userId) {
      toast.error("Transaction data not found. Redirecting...");
      setTimeout(() => navigate("/transactions"), 2000);
    }
  }, [transaction, userId, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      type === transaction.type &&
      description === transaction.description &&
      amount === transaction.amount
    ) {
      toast.error("No changes made to the transaction.");
      setTimeout(() => navigate("/transactions"), 2000);
      return;
    }

    const updatedTransaction = {
      userId,
      type,
      description,
      amount: Number(amount),
    };

    try {
      const response = await updateTransaction(
        transaction._id,
        updatedTransaction
      );
      if (response) {
        toast.success("Transaction updated successfully!");
        setTimeout(() => navigate("/transactions"), 2000);
      } else {
        toast.error("Failed to update transaction.");
      }
    } catch (error) {
      toast.error("Error updating transaction: " + error.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 flex items-center justify-center px-4 pt-16 pb-16">
        <div className="w-full max-w-lg bg-white shadow-2xl rounded-xl p-8 sm:p-10">
          <div className="flex items-center justify-center mb-6">
            <FaEdit className="text-3xl text-blue-600 mr-2" />
            <h2 className="text-2xl font-bold text-gray-800">
              Edit Transaction
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Type
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Type</option>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="e.g. Grocery"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Amount */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Amount (₹)
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="e.g. 1000"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-between pt-4">
              <button
                type="button"
                className="bg-gray-200 text-gray-700 px-5 py-2 rounded-lg hover:bg-gray-300 transition duration-200"
                onClick={() => navigate("/transactions")}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
              >
                Update
              </button>
            </div>
          </form>
        </div>
        <ToastContainer position="top-right" autoClose={2000} />
      </div>
    </>
  );
};

export default EditTransaction;
