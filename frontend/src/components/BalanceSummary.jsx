import React, { useState, useEffect } from "react";
import { getUserFromStorage } from "../utils/getUserFromStorage";
import { getTransactions } from "../api/transactionApi";

const BalanceSummary = () => {
  const [balance, setBalance] = useState(0);
  const [expense, setExpense] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const user = await getUserFromStorage();
      if (!user) return;

      const transactions = await getTransactions(user.userId);
      if (!transactions) return;

      const income = transactions
        .filter((tx) => tx.type === "income")
        .reduce((sum, tx) => sum + tx.amount, 0);

      const totalExpense = transactions
        .filter((tx) => tx.type === "expense")
        .reduce((sum, tx) => sum + tx.amount, 0);

      setBalance(income - totalExpense);
      setExpense(totalExpense);
    };

    fetchData();
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 w-full flex flex-col gap-6">
      {/* ✅ Top motivational line */}
      <h1 className="text-xl font-semibold text-gray-800 text-center md:text-left">
        Keep Tracking To Save More
      </h1>

      {/* ✅ Balance + Expense + Image */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        {/* ✅ Balance Section */}
        <div className="text-center md:text-left">
          <h2 className="text-lg font-semibold text-gray-700 mb-1">Balance</h2>
          <p className="text-3xl font-bold text-green-600 mb-1">
            ₹{balance.toLocaleString("en-IN")}
          </p>
          <p className="text-sm text-gray-500">As of now</p>
        </div>

        {/* ✅ Divider */}
        <div className="hidden md:block h-16 w-px bg-gray-200"></div>

        {/* ✅ Expense Section */}
        <div className="text-center md:text-left">
          <h2 className="text-lg font-semibold text-gray-700 mb-1">Expense</h2>
          <p className="text-3xl font-bold text-red-600 mb-1">
            ₹{expense.toLocaleString("en-IN")}
          </p>
          <p className="text-sm text-gray-500">Tracked accurately</p>
        </div>

        {/* ✅ Image */}
        <div className="mt-6 md:mt-0">
          <img
            src="/assets/payment-img.svg"
            alt="Finance illustration"
            className="h-32 md:h-40 lg:h-44 object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default BalanceSummary;
