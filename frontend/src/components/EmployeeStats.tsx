import React, { useEffect, useState } from "react";
import { FaMedal } from "react-icons/fa";

interface Employee {
  employee_name: string;
  total_commission: number;
}

const EmployeeStats: React.FC = () => {
  const [topEmployees, setTopEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    const fetchTopEmployees = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/top-employees");
        const data = await response.json();
        setTopEmployees(data);
      } catch (error) {
        console.error("Error fetching top employees:", error);
      }
    };

    fetchTopEmployees();
  }, []);

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-3">Top 3 Performing Employees</h2>
      {topEmployees.map((employee, index) => (
        <div key={index} className="p-4 bg-gray-100 rounded-lg shadow-sm flex items-center gap-3 mb-3">
          <FaMedal className={`text-3xl ${index === 0 ? "text-yellow-500" : index === 1 ? "text-gray-500" : "text-orange-500"}`} />
          <div>
            <p className="text-xl font-bold text-gray-900">{employee.employee_name}</p>
            <p className="text-gray-500 text-sm">Commission: ${employee.total_commission.toLocaleString()}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EmployeeStats;