import React, { useEffect, useState, useMemo } from "react";
import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";
import Breadcrumb from "../../components/breadcrumbs";
import Header from "../../layouts/header";
import Sidemenu from "../../layouts/sidemenu";
import Profile from "../../assets/avatar.png";

// Define types
interface Employee {
    id: string;
    firstName: string;
    lastName: string;
    baseSalary: number;
}

interface Commission {
    employeeId: string;
    sales: number;
    discount: number; // Add discount to the Commission interface
    amount: number; // Commission amount
    date: string;
}

const Salary_List: React.FC = () => {
    const [baseSalary, setBaseSalary] = useState<number>(0);
    const [salaryData, setSalaryData] = useState<any[]>([]);

    // Fetch salary data from localStorage
    const fetchSalaryData = () => {
        const employees: Employee[] = JSON.parse(localStorage.getItem("employees") || "[]");
        const commissions: Commission[] = JSON.parse(localStorage.getItem("commissions") || "[]");

        // Process employee salaries
        const data = employees.map((emp, index) => {
            const empCommissions = commissions.filter((c) => c.employeeId === emp.id);

            // Calculate total sales and total discount
            const totalSales = empCommissions.reduce((sum, c) => sum + (Number(c.sales) || 0), 0) || 0;
            const totalDiscount = empCommissions.reduce((sum, c) => sum + (Number(c.discount) || 0), 0) || 0;

            // Calculate net sales (sales after discount)
            const netSales = totalSales - totalDiscount;

            // Calculate total commission (based on net sales)
            const totalCommission = empCommissions.reduce((sum, c) => sum + (Number(c.amount) || 0), 0) || 0;

            // Calculate total salary (base salary + net sales - total commission)
            const totalSalary = (emp.baseSalary || 0) + netSales - totalCommission;

            return {
                id: index + 1,
                employeeId: emp.id,
                employeeName: `${emp.firstName} ${emp.lastName}`,
                baseSalary: `₱${(emp.baseSalary || 0).toFixed(2)}`,
                totalSales: `₱${totalSales.toFixed(2)}`,
                totalDiscount: `₱${totalDiscount.toFixed(2)}`, // Add total discount to the table
                totalCommission: `₱${totalCommission.toFixed(2)}`,
                totalSalary: `₱${totalSalary.toFixed(2)}`,
            };
        });

        setSalaryData(data);
    };

    // Function to update the base salary for all employees
    const updateBaseSalary = () => {
        const employees: Employee[] = JSON.parse(localStorage.getItem("employees") || "[]");
        const updatedEmployees = employees.map(emp => ({ ...emp, baseSalary }));

        localStorage.setItem("employees", JSON.stringify(updatedEmployees));
        fetchSalaryData(); // Refresh the table
        alert("Base salary updated for all employees!");
    };

    // Initialize data on component mount
    useEffect(() => {
        fetchSalaryData();
    }, []);

    // Define columns for the table
    const columns = useMemo(
        () => [
            {
                header: "#",
                accessorKey: "id",
            },
            {
                header: "Employee ID",
                accessorKey: "employeeId",
                cell: ({ row }: any) => (
                    <div className="flex items-center gap-3">
                        <img src={Profile} alt="Avatar" className="w-8 h-8 rounded-full" />
                        <span>{row.original.employeeId}</span>
                    </div>
                ),
            },
            {
                header: "Employee Name",
                accessorKey: "employeeName",
            },
            {
                header: "Base Salary",
                accessorKey: "baseSalary",
            },
            {
                header: "Total Sales",
                accessorKey: "totalSales",
            },
            {
                header: "Total Discount",
                accessorKey: "totalDiscount", // New column for total discount
            },
            {
                header: "Total Commission",
                accessorKey: "totalCommission",
            },
            {
                header: "Total Salary",
                accessorKey: "totalSalary",
            },
        ],
        []
    );

    // Create a table instance
    const table = useReactTable({
        data: salaryData,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <>
            <Header />
            <Sidemenu />
            <div className="main-content app-content">
                <div className="container-fluid">
                    <Breadcrumb
                        title="View Salary"
                        links={[{ text: "Dashboard", link: "/" }]}
                        active="View Salary"
                    />

                    <div className="grid grid-cols-12 gap-x-6">
                        <div className="xxl:col-span-12 col-span-12">
                            <div className="box overflow-hidden main-content-card">
                                <div className="box-body p-5">
                                    {/* Base Salary Input */}
                                    <div className="mb-4 flex items-center gap-3">
                                        <input
                                            type="number"
                                            placeholder="Set Base Salary"
                                            className="border px-3 py-2 rounded w-1/4"
                                            value={baseSalary}
                                            onChange={(e) => setBaseSalary(Number(e.target.value))}
                                        />
                                        <button
                                            onClick={updateBaseSalary}
                                            className="bg-green-500 text-white px-4 py-2 rounded"
                                        >
                                            Set New Base Salary
                                        </button>
                                    </div>

                                    {/* TanStack Table */}
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full bg-white">
                                            <thead>
                                                {table.getHeaderGroups().map(headerGroup => (
                                                    <tr key={headerGroup.id}>
                                                        {headerGroup.headers.map(header => (
                                                            <th
                                                                key={header.id}
                                                                className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                                                            >
                                                                {flexRender(
                                                                    header.column.columnDef.header,
                                                                    header.getContext()
                                                                )}
                                                            </th>
                                                        ))}
                                                    </tr>
                                                ))}
                                            </thead>
                                            <tbody>
                                                {table.getRowModel().rows.map(row => (
                                                    <tr key={row.id}>
                                                        {row.getVisibleCells().map(cell => (
                                                            <td
                                                                key={cell.id}
                                                                className="px-6 py-4 border-b border-gray-200"
                                                            >
                                                                {flexRender(
                                                                    cell.column.columnDef.cell,
                                                                    cell.getContext()
                                                                )}
                                                            </td>
                                                        ))}
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Salary_List;