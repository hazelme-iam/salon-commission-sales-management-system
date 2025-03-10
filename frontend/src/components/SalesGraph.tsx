import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface SalesData {
  date: string;
  sales: number;
}

const salesData: SalesData[] = [
  { date: "Mar 1", sales: 1200 },
  { date: "Mar 2", sales: 1500 },
  { date: "Mar 3", sales: 1100 },
  { date: "Mar 4", sales: 1800 },
  { date: "Mar 5", sales: 1700 },
];

const SalesGraph: React.FC = () => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-3">Sales Summary</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={salesData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="sales" stroke="#4CAF50" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesGraph;