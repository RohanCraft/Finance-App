import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { updateTransaction } from '../api/transactionApi';

const EditTransaction = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const transaction = location.state?.transaction;
  const userId = location.state?.userId;

  const [type, setType] = useState(transaction?.type || '');
  const [description, setDescription] = useState(transaction?.description || '');
  const [amount, setAmount] = useState(transaction?.amount || '');

  useEffect(() => {
    if (!transaction || !userId) {
      toast.error("Transaction data not found. Please try again.");
      console.error("Transaction data not found in location state.");
      setTimeout(() => {
        navigate("/transactions");
      }, 2000);
    }
  }, [transaction, userId, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if any changes were made
    if (type === transaction.type && description === transaction.description && amount === transaction.amount) {
      toast.error("No changes made to the transaction.");
      
      setTimeout(() => {
        navigate("/transactions");
      }, 2000);
      return;
    }

    const updatedTransaction = {
      userId,
      type,
      description,
      amount: Number(amount),
    };

    const submitData = async () => {
      try {
        console.log("Submitting updated data:", updatedTransaction);
        const response = await updateTransaction(transaction._id, updatedTransaction);
        if (response) {
          toast.success("Transaction updated successfully!");
          setTimeout(() => {
            navigate("/transactions");
          }, 2000);
        } else {
          toast.error("Failed to update transaction. Please try again.");
        }
      } catch (error) {
        console.error("Error updating transaction:", error);
        toast.error("Error updating transaction: " + error.message);
      }
    };
    submitData();
  };

  return (
    <>
      <Navbar />
      <div className="max-w-xl mx-auto mt-10 px-4">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Edit Transaction
        </h2>

        <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-6 space-y-5">
          {/* Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Type
            </label>
            <select
              name="type"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="">Select type</option>
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
              name="description"
              placeholder="Enter description"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Amount (₹)
            </label>
            <input
              type="number"
              name="amount"
              placeholder="Enter amount"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-between pt-4">
            <button
              type="button"
              className="bg-gray-300 text-gray-700 px-5 py-2 rounded-md hover:bg-gray-400 text-sm"
              onClick={() => navigate("/transactions")}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 text-sm"
            >
              Update
            </button>
          </div>
        </form>
        <ToastContainer position="top-right" autoClose={2000} />
      </div>
    </>
  );
};

export default EditTransaction;
