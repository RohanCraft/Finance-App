import React, { useState, useEffect } from "react";
import { getUserFromStorage } from "../utils/getUserFromStorage";
import { getTransactions } from "../api/transactionApi";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

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
    <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl shadow-lg p-4 md:p-6 flex flex-col md:flex-row items-center justify-between gap-6 w-full">
      {/* Cards Section */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 w-full md:w-2/3">
        {/* Balance Card */}
        <div className="flex flex-col md:flex-row items-center md:items-start justify-center gap-4 w-full md:w-1/2 p-4 bg-white rounded-xl shadow-sm">
          <div className="bg-green-100 p-3 rounded-full flex-shrink-0">
            <FaArrowUp className="text-green-600 text-2xl" />
          </div>
          <div className="text-center md:text-left">
            <h2 className="text-gray-700 font-semibold text-md md:text-lg">
              Balance
            </h2>
            <p className="text-green-600 font-bold text-xl md:text-2xl">
              ₹{balance.toLocaleString("en-IN")}
            </p>
            <p className="text-gray-400 text-sm md:text-xs">As of now</p>
          </div>
        </div>

        {/* Expense Card */}
        <div className="flex flex-col md:flex-row items-center md:items-start justify-center gap-4 w-full md:w-1/2 p-4 bg-white rounded-xl shadow-sm">
          <div className="bg-red-100 p-3 rounded-full flex-shrink-0">
            <FaArrowDown className="text-red-600 text-2xl" />
          </div>
          <div className="text-center md:text-left">
            <h2 className="text-gray-700 font-semibold text-md md:text-lg">
              Expense
            </h2>
            <p className="text-red-600 font-bold text-xl md:text-2xl">
              ₹{expense.toLocaleString("en-IN")}
            </p>
            <p className="text-gray-400 text-sm md:text-xs">
              Tracked accurately
            </p>
          </div>
        </div>
      </div>

      {/* Illustration */}
      <div className="mt-6 md:mt-0 flex justify-center md:justify-end w-full md:w-1/3">
        <img
          src="/assets/Finance-bro.svg"
          alt="Finance illustration"
          className="h-40 md:h-48 lg:h-52 w-auto object-contain"
        />
      </div>
    </div>
  );
};

export default BalanceSummary;
