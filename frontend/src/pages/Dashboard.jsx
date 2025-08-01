import React, { useEffect, useState } from 'react';
import BalanceSummary from '../components/BalanceSummary';
import Chart from '../components/Chart';
import TransactionCard from '../components/TransactionCrad';
import Navbar from '../components/Navbar';
import { getTransactions } from '../api/transactionApi';
import { getUserFromStorage } from '../utils/getUserFromStorage';

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
        .filter(tx => tx.type === "income")
        .reduce((sum, tx) => sum + tx.amount, 0);

      const totalExpense = transactions
        .filter(tx => tx.type === "expense")
        .reduce((sum, tx) => sum + tx.amount, 0);

      setBalance(totalIncome - totalExpense);
      setExpense(totalExpense);
    };

    fetchTransactions();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto px-4 py-8 space-y-8">
        
        {/* Summary + Chart */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <BalanceSummary />
          <Chart income={balance + expense} expense={expense} />
        </div>

        {/* Transactions */}
        <TransactionCard />
      </div>
    </div>
  );
};

export default Dashboard;
