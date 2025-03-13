import React, { useEffect, useState } from "react";
import { FaDollarSign, FaChartLine, FaUsers } from "react-icons/fa";
//need pa ni i fix ang calculations, interval method
const MonthlySales: React.FC = () => {
  const [salesData, setSalesData] = useState({
    totalSales: 0,
    totalRevenue: 0,
    totalCommission: 0,
  });

  useEffect(() => {
    const fetchMonthlySales = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/sales-summary");
        const data = await response.json();
        setSalesData({
          totalSales: data.monthly_sales,
          totalRevenue: data.monthly_sales,
          totalCommission: data.monthly_commission,
        });
      } catch (error) {
        console.error("Error fetching monthly sales:", error);
      }
    };

    fetchMonthlySales();
  }, []);

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-3">Monthly Sales Summary</h2>

      <div className="p-4 bg-gray-100 rounded-lg shadow-sm flex items-center gap-3 mb-3">
        <FaDollarSign className="text-green-500 text-3xl" />
        <div>
          <p className="text-xl font-bold text-gray-900">${salesData.totalSales.toLocaleString()}</p>
          <p className="text-gray-500 text-sm">Monthly Total Sales</p>
        </div>
      </div>

      <div className="p-4 bg-gray-100 rounded-lg shadow-sm flex items-center gap-3 mb-3">
        <FaChartLine className="text-blue-500 text-3xl" />
        <div>
          <p className="text-xl font-bold text-gray-900">${salesData.totalRevenue.toLocaleString()}</p>
          <p className="text-gray-500 text-sm">Monthly Total Revenue</p>
        </div>
      </div>

      <div className="p-4 bg-gray-100 rounded-lg shadow-sm flex items-center gap-3">
        <FaUsers className="text-purple-500 text-3xl" />
        <div>
          <p className="text-xl font-bold text-gray-900">${salesData.totalCommission.toLocaleString()}</p>
          <p className="text-gray-500 text-sm">Monthly Total Commission</p>
        </div>
      </div>
    </div>
  );
};

export default MonthlySales;
