import React, { useEffect, useState } from "react";
import BalanceSummary from "../components/BalanceSummary";
import Chart from "../components/Chart";
import TransactionCard from "../components/TransactionCrad";
import Navbar from "../components/Navbar";
import { getTransactions } from "../api/transactionApi";
import { getUserFromStorage } from "../utils/getUserFromStorage";

const Dashboard = () => {
  const [balance, setBalance] = useState(0);
  const [expense, setExpense] = useState(0);

  useEffect(() => {
    const fetchTransactions = async () => {
      const user = await getUserFromStorage();
      if (!user) return;

      const transactions = await getTransactions(user.userId);
      if (!transactions) return;

      const totalIncome = transactions
        .filter((tx) => tx.type === "income")
        .reduce((sum, tx) => sum + tx.amount, 0);

      const totalExpense = transactions
        .filter((tx) => tx.type === "expense")
        .reduce((sum, tx) => sum + tx.amount, 0);

      setBalance(totalIncome - totalExpense);
      setExpense(totalExpense);
    };

    fetchTransactions();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-gray-100">
      <Navbar />

      <div className="container mx-auto px-4 py-8 space-y-10">
        {/* Summary + Chart */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <BalanceSummary />
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <Chart income={balance + expense} expense={expense} />
          </div>
        </div>

        {/* Transactions */}
        <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
          <TransactionCard />
        </div>
      </div>

      {/* Optional floating abstract shapes */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 pointer-events-none"></div>
    </div>
  );
};

export default Dashboard;
