import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { getUserFromStorage } from '../utils/getUserFromStorage';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { deleteTransaction, getTransactions } from '../api/transactionApi';
import { useNavigate } from 'react-router-dom';

const Transactions = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [filterType, setFilterType] = useState('');

  useEffect(() => {
    const fetchTransactions = async () => {
      const user = await getUserFromStorage();
      if (!user) {
        toast.error("User not found in storage");
        return;
      }
      setUserId(user.userId);
      const data = await getTransactions(user.userId);
      if (!data) {
        toast.error("Failed to fetch transactions");
        return;
      }
      setTransactions(data);
      setFiltered(data);
    };
    fetchTransactions();
  }, []);

  const handleEdit = (txn) => {
    navigate(`/editTransaction/${txn._id}`, { state: { transaction: txn, userId } });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this transaction?")) {
      const deleteData = async () => {
        try {
          const response = await deleteTransaction(id);
          if (response) {
            const updated = transactions.filter((txn) => txn._id !== id);
            setTransactions(updated);
            setFiltered(
              filterType ? updated.filter((txn) => txn.type === filterType) : updated
            );
            toast.success("Transaction deleted successfully!");
          }
        } catch (error) {
          console.error("Error deleting transaction:", error);
          toast.error("Error deleting transaction: " + error.message);
        }
      };
      deleteData();
    }
  };

  const handleFilterChange = (e) => {
    const value = e.target.value;
    setFilterType(value);
    if (value === '') {
      setFiltered(transactions);
    } else {
      setFiltered(transactions.filter((txn) => txn.type === value));
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen px-4 pt-8 bg-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">All Transactions</h1>
            <select
              value={filterType}
              onChange={handleFilterChange}
              className="border border-gray-300 text-sm px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Types</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>

          <div className="overflow-x-auto bg-white shadow rounded-xl">
            <table className="min-w-full text-sm text-gray-700">
              <thead className="bg-blue-600 text-white text-left text-xs uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4">Created At</th>
                  <th className="px-6 py-4">Updated At</th>
                  <th className="px-6 py-4">Type</th>
                  <th className="px-6 py-4">Description</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length > 0 ? (
                  filtered.map((txn) => (
                    <tr key={txn._id} className="border-t hover:bg-gray-50 transition">
                      <td className="px-6 py-4">
                        {new Date(txn.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        {new Date(txn.updatedAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 capitalize">{txn.type}</td>
                      <td className="px-6 py-4">{txn.description}</td>
                      <td
                        className={`px-6 py-4 font-medium ${
                          txn.type === 'income' ? 'text-green-600' : 'text-red-500'
                        }`}
                      >
                        {txn.type === 'income' ? '+' : '-'} ₹{txn.amount}
                      </td>
                      <td className="px-6 py-4 text-center space-x-2">
                        <button
                          onClick={() => handleEdit(txn)}
                          className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-md text-xs"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(txn._id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-xs"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      className="text-center py-6 text-gray-500 text-sm"
                    >
                      No transactions found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <ToastContainer position="top-right" autoClose={2000} />
      </div>
    </>
  );
};

export default Transactions;
