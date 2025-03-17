import React, { useEffect, useState } from "react";
import { FaPesoSign, FaChartLine, FaUsers, FaClipboardList } from "react-icons/fa6";

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

const SalesSummary: React.FC = () => {
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
    <div className="p-6 bg-pink-100 rounded-lg shadow-lg text-pink-700">
      {/* Sales Summary Header (Without White Background) */}
      <h2 className="text-2xl font-semibold text-pink-700 mb-6 flex items-center justify-center gap-2">
              <FaClipboardList className="text-pink-500 text-3xl" />
              Today's Sales Summary
            </h2>

      {/* Total Sales */}
      <div className="p-4 bg-white rounded-lg shadow-md flex items-center gap-4 mb-3 border border-pink-200">
        <FaPesoSign className="text-3xl" />
        <div>
          <p className="text-xl font-bold">${totalSales.toLocaleString()}</p>
          <p className="text-sm">Total Sales</p>
        </div>
      </div>

      {/* Sales Growth / Revenue */}
      <div className="p-4 bg-white rounded-lg shadow-md flex items-center gap-4 mb-3 border border-pink-200">
        <FaChartLine className="text-3xl" />
        <div>
          <p className="text-xl font-bold">${totalRevenue.toLocaleString()}</p>
          <p className="text-sm">Total Revenue</p>
        </div>
      </div>

      {/* Total Commission */}
      <div className="p-4 bg-white rounded-lg shadow-md flex items-center gap-4 border border-pink-200">
        <FaUsers className="text-3xl" />
        <div>
          <p className="text-xl font-bold">${totalCommission.toLocaleString()}</p>
          <p className="text-sm">Total Commission</p>
        </div>
      </div>
    </div>
  );
};

export default SalesSummary;
