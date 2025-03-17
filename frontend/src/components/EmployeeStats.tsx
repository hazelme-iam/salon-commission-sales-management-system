import React, { useEffect, useState } from "react";
import { FaMedal } from "react-icons/fa";

interface Employee {
  employee_name: string;
  total_commission: number;
}

// Default data in case API is unavailable
const defaultEmployees: Employee[] = [ 
  { employee_name: "Hazel", total_commission: 5000 },
  { employee_name: "Roanne", total_commission: 4500 },
  { employee_name: "Angelie", total_commission: 4000 },
  { employee_name: "Pia", total_commission: 3500 },
  { employee_name: "Twella", total_commission: 3000 },
];

const EmployeeStats: React.FC = () => {
  const [topEmployees, setTopEmployees] = useState<Employee[]>(defaultEmployees);

  useEffect(() => {
    const fetchTopEmployees = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/top-employees");
        if (!response.ok) throw new Error("Failed to fetch");

        const data = await response.json();
        setTopEmployees(data);
      } catch (error) {
        console.error("Error fetching top employees:", error);
      }
    };

    fetchTopEmployees();
  }, []);

  return (
    <div className="p-6 rounded-lg shadow-mg bg-pink-100">
      <h2 className="text-2xl font-semibold text-pink-700 mb-4 text-center">🏆 Top Performing Employees</h2>

      {topEmployees.length === 0 ? (
        <p className="text-pink-600 text-center">No data available</p>
      ) : (
        topEmployees.map((employee, index) => (
          <div key={index} className="p-4 bg-white rounded-lg shadow-md flex items-center gap-4 mb-3 border border-pink-200">
            {/* Gold Medal Icon */}
            <FaMedal className="text-3xl text-yellow-500" />
            <div>
              <p className="text-lg font-bold text-gray-900">{employee.employee_name}</p>
              <p className="text-gray-600 text-sm">Commission: ${employee.total_commission.toLocaleString()}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default EmployeeStats;
