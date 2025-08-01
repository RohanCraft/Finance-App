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
    <div className="bg-white shadow rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-700">
          {transactions.length
            ? `Recent Transactions (${transactions.length})`
            : "No Transactions Found"}
        </h2>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm"
          onClick={() => navigate("/transactionForm")}
        >
          Add Transaction
        </button>
      </div>

      {transactions.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="text-left px-4 py-2">Date</th>
                <th className="text-left px-4 py-2">Type</th>
                <th className="text-left px-4 py-2">Description</th>
                <th className="text-left px-4 py-2">Amount</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((txn) => (
                <tr
                  key={txn._id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-2">
                    {new Date(txn.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 capitalize">{txn.type}</td>
                  <td className="px-4 py-2">{txn.description}</td>
                  <td
                    className={`px-4 py-2 font-semibold ${
                      txn.type === "income"
                        ? "text-green-600"
                        : "text-red-600"
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
