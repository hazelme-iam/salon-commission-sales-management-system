import React, { useEffect, useState } from "react";
import { FaDollarSign, FaChartLine, FaUsers } from "react-icons/fa";

// Sample sales data for a day
const sampleSalesData = [
  { id: 1, amount: 500 },
  { id: 2, amount: 800 },
  { id: 3, amount: 1200 },
  { id: 4, amount: 900 },
  { id: 5, amount: 1100 },
  { id: 6, amount: 700 },
];

const commissionRate = 0.1; // 10% commission

const MonthlySales: React.FC = () => {
  const [totalSales, setTotalSales] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalCommission, setTotalCommission] = useState(0);

  useEffect(() => {
    // Calculate totals
    const salesSum = sampleSalesData.reduce((sum, sale) => sum + sale.amount, 0);
    const commission = salesSum * commissionRate;

    setTotalSales(salesSum);
    setTotalRevenue(salesSum); // Assuming revenue = total sales for simplicity
    setTotalCommission(commission);
  }, []);

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-3">Today's Sales Summary</h2>
      
      {/* Total Sales */}
      <div className="p-4 bg-gray-100 rounded-lg shadow-sm flex items-center gap-3 mb-3">
        <FaDollarSign className="text-green-500 text-3xl" />
        <div>
          <p className="text-xl font-bold text-gray-900">${totalSales.toLocaleString()}</p>
          <p className="text-gray-500 text-sm">Total Sales</p>
        </div>
      </div>
      
      {/* Sales Growth / Revenue */}
      <div className="p-4 bg-gray-100 rounded-lg shadow-sm flex items-center gap-3 mb-3">
        <FaChartLine className="text-blue-500 text-3xl" />
        <div>
          <p className="text-xl font-bold text-gray-900">${totalRevenue.toLocaleString()}</p>
          <p className="text-gray-500 text-sm">Total Revenue</p>
        </div>
      </div>
      
      {/* Total Commission */}
      <div className="p-4 bg-gray-100 rounded-lg shadow-sm flex items-center gap-3">
        <FaUsers className="text-purple-500 text-3xl" />
        <div>
          <p className="text-xl font-bold text-gray-900">${totalCommission.toLocaleString()}</p>
          <p className="text-gray-500 text-sm">Total Commission</p>
        </div>
      </div>
    </div>
  );
};

export default MonthlySales;
