import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface SalesData {
  date: string;
  sales: number;
}

const salesData: SalesData[] = [
  { date: "Jan", sales: 45000 },
  { date: "Feb", sales: 47000 },
  { date: "Mar", sales: 43000 },
  { date: "Apr", sales: 49000 },
  { date: "May", sales: 51000 },
  { date: "Jun", sales: 52000 },
  { date: "Jul", sales: 53000 },
  { date: "Aug", sales: 54000 },
  { date: "Sep", sales: 55000 },
  { date: "Oct", sales: 56000 },
  { date: "Nov", sales: 57000 },
  { date: "Dec", sales: 58000 },
];

const RevenueGraph: React.FC = () => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-3">Monthly Revenue Summary</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={salesData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis 
            domain={[0, 'dataMax + 5000']} 
            tickFormatter={(value) => `${value / 1000}K`} 
          />
          <Tooltip formatter={(value) => `$${value}`} />
          <Line type="monotone" dataKey="sales" stroke="#4CAF50" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueGraph;