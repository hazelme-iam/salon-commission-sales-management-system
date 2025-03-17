import React, { useEffect, useState } from "react";
import {FaClipboardList, FaPesoSign, FaChartLine, FaUsers,} from "react-icons/fa6"; // Header icon


const WeeklySales: React.FC = () => {
  const [salesData, setSalesData] = useState({
    totalSales: 0,
    totalRevenue: 0,
    totalCommission: 0,
  });

  useEffect(() => {
    const fetchWeeklySales = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/sales-summary");
        const data = await response.json();
        setSalesData({
          totalSales: data.weekly_sales,
          totalRevenue: data.weekly_sales,
          totalCommission: data.weekly_commission,
        });
      } catch (error) {
        console.error("Error fetching weekly sales:", error);
      }
    };

    fetchWeeklySales();
  }, []);

  return (
    <div className="p-6 bg-pink-100 rounded-lg shadow-lg">
      {/* Centered Title with Icon */}
      <h2 className="text-2xl font-semibold text-pink-700 mb-6 flex items-center justify-center gap-2">
        <FaClipboardList className="text-pink-500 text-3xl" />
        Weekly Sales Summary
      </h2>

      {/* Sales Summary Cards */}
      <div className="space-y-3">
        {/* Total Sales */}
        <div className="p-4 bg-white rounded-lg shadow-md flex items-center gap-4 border border-pink-300">
          <FaPesoSign className="text-pink-500 text-3xl" />
          <div>
            <p className="text-xl font-bold text-gray-900">
              ₱{salesData.totalSales.toLocaleString()}
            </p>
            <p className="text-gray-600 text-sm">Weekly Total Sales</p>
          </div>
        </div>

        {/* Total Revenue */}
        <div className="p-4 bg-white rounded-lg shadow-md flex items-center gap-4 border border-pink-300">
          <FaChartLine className="text-pink-500 text-3xl" />
          <div>
            <p className="text-xl font-bold text-gray-900">
              ₱{salesData.totalRevenue.toLocaleString()}
            </p>
            <p className="text-gray-600 text-sm">Weekly Total Revenue</p>
          </div>
        </div>

        {/* Total Commission */}
        <div className="p-4 bg-white rounded-lg shadow-md flex items-center gap-4 border border-pink-300">
          <FaUsers className="text-pink-500 text-3xl" />
          <div>
            <p className="text-xl font-bold text-gray-900">
              ₱{salesData.totalCommission.toLocaleString()}
            </p>
            <p className="text-gray-600 text-sm">Weekly Total Commission</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeeklySales;
