import React from "react";

const EmployeeStats: React.FC = () => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-3">Employee Statistics</h2>
      <p className="text-xl font-bold text-blue-600">Total Employees: 25</p>
      <p className="text-gray-500 text-sm">10 New Employees This Month</p>
    </div>
  );
};

export default EmployeeStats;