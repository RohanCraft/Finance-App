import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getUserFromStorage } from "../utils/getUserFromStorage";
import { getTransactions } from "../api/transactionApi";

const TransactionCard = () => {
  const [transactions, setTransactions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const user = getUserFromStorage();
      if (!user) {
        toast.error("User not found");
        navigate("/login");
        return;
      }

      const data = await getTransactions(user.userId);
      if (!data) {
        toast.error("Error fetching transactions");
        return;
      }

      const sorted = data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setTransactions(sorted.slice(0, 3));
    };

    fetchData();
  }, []);

  return (
    <div className="bg-gradient-to-br from-white via-blue-50 to-blue-100 shadow-xl rounded-2xl p-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
        <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-4 md:mb-0">
          {transactions.length
            ? `Recent Transactions (${transactions.length})`
            : "No Transactions Found"}
        </h2>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full text-sm shadow-md transition transform hover:-translate-y-1"
          onClick={() => navigate("/transactionForm")}
        >
          Add Transaction
        </button>
      </div>

      {transactions.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-gray-700">
            <thead className="bg-blue-500 text-white text-left text-xs uppercase tracking-wider rounded-t-xl">
              <tr>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Type</th>
                <th className="px-4 py-2">Description</th>
                <th className="px-4 py-2">Amount</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((txn) => (
                <tr
                  key={txn._id}
                  className="border-b hover:bg-gray-100 transition duration-200"
                >
                  <td className="px-4 py-2">
                    {new Date(txn.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded-full text-white text-xs font-semibold ${
                        txn.type === "income" ? "bg-green-500" : "bg-red-500"
                      }`}
                    >
                      {txn.type.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-4 py-2">{txn.description}</td>
                  <td
                    className={`px-4 py-2 font-semibold ${
                      txn.type === "income" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {txn.type === "income" ? "+" : "-"} ₹
                    {txn.amount.toLocaleString("en-IN")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TransactionCard;
