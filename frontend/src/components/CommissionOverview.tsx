import React from "react";

const CommissionOverview: React.FC = () => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-3">Commission Overview for This Month</h2>

      <p className="text-xl font-bold text-green-600">$6,000 earned this month</p>

      <p className="text-gray-500 text-sm">Based on employee performance and sales tiers.</p>
    </div>
  );
};

export default CommissionOverview;
