import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#00C49F", "#FF8042"];

const renderCustomLabel = ({ percent }) =>
  `${(percent * 100).toFixed(0)}%`;

const formatTooltip = (value, name) => [
  `₹${value.toLocaleString("en-IN")}`,
  name,
];

const Chart = ({ income = 0, expense = 0 }) => {
  const data = [
    { name: "Income", value: income },
    { name: "Expense", value: expense },
  ];

  return (
    <div className="bg-white shadow rounded-xl p-6 h-full">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">
        Income vs Expense
      </h2>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            label={renderCustomLabel}
          >
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={formatTooltip} />
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
