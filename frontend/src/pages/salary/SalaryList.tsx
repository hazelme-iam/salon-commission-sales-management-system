import React, { useEffect, useState, useMemo } from "react";
import { useReactTable, getCoreRowModel, flexRender, getPaginationRowModel } from "@tanstack/react-table";
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
    discount: number;
    amount: number;
    date: string;
}

const Salary_List: React.FC = () => {
    const [baseSalary, setBaseSalary] = useState<number>(0);
    const [salaryData, setSalaryData] = useState<any[]>([]);
    const [filter, setFilter] = useState<string>("all");

    // Fetch salary data from localStorage
    const fetchSalaryData = () => {
        const employees: Employee[] = JSON.parse(localStorage.getItem("employees") || "[]");
        const commissions: Commission[] = JSON.parse(localStorage.getItem("commissions") || "[]");

        // Filter commissions based on the selected time period
        const currentDate = new Date();
        const filteredCommissions = commissions.filter((comm) => {
            const commissionDate = new Date(comm.date);
            switch (filter) {
                case "this-day":
                    return (
                        commissionDate.getDate() === currentDate.getDate() &&
                        commissionDate.getMonth() === currentDate.getMonth() &&
                        commissionDate.getFullYear() === currentDate.getFullYear()
                    );
                case "this-week":
                    const startOfWeek = new Date(currentDate);
                    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
                    const endOfWeek = new Date(currentDate);
                    endOfWeek.setDate(currentDate.getDate() + (6 - currentDate.getDay()));
                    return commissionDate >= startOfWeek && commissionDate <= endOfWeek;
                case "this-month":
                    return (
                        commissionDate.getMonth() === currentDate.getMonth() &&
                        commissionDate.getFullYear() === currentDate.getFullYear()
                    );
                default:
                    return true;
            }
        });

        // Process employee salaries
        const data = employees.map((emp, index) => {
            const empCommissions = filteredCommissions.filter((c) => c.employeeId === emp.id);

            const totalSales = empCommissions.reduce((sum, c) => sum + (Number(c.sales) || 0), 0) || 0;
            const totalDiscountPercent = empCommissions.reduce((sum, c) => sum + (Number(c.discount) || 0), 0) || 0;
            const totalDiscountAmount = (totalSales * totalDiscountPercent) / 100;
            const totalCommission = empCommissions.reduce((sum, c) => sum + (Number(c.amount) || 0), 0) || 0;
            const totalRevenue = totalSales - totalDiscountAmount - totalCommission;
            const totalSalary = (emp.baseSalary || 0) + totalCommission;
            const latestCommissionDate = empCommissions.length > 0
                ? new Date(Math.max(...empCommissions.map((c) => new Date(c.date).getTime()))).toLocaleDateString()
                : "N/A";

            return {
                id: index + 1,
                employeeId: emp.id,
                employeeName: `${emp.firstName} ${emp.lastName}`,
                baseSalary: `₱${(emp.baseSalary || 0).toFixed(2)}`,
                totalSales: `₱${totalSales.toFixed(2)}`,
                totalDiscount: `${totalDiscountPercent.toFixed(2)}%`,
                totalRevenue: `₱${totalRevenue.toFixed(2)}`,
                totalCommission: `₱${totalCommission.toFixed(2)}`,
                totalSalary: `₱${totalSalary.toFixed(2)}`,
                date: latestCommissionDate,
            };
        });

        setSalaryData(data);
    };

    // Function to update the base salary for all employees
    const updateBaseSalary = () => {
        const employees: Employee[] = JSON.parse(localStorage.getItem("employees") || "[]");
        const updatedEmployees = employees.map(emp => ({ ...emp, baseSalary }));

        localStorage.setItem("employees", JSON.stringify(updatedEmployees));
        fetchSalaryData();
        alert("Base salary updated for all employees!");
    };

    useEffect(() => {
        fetchSalaryData();
    }, [filter]);

    const columns = useMemo(
        () => [
            { header: "#", accessorKey: "id" },
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
            { header: "Employee Name", accessorKey: "employeeName" },
            { header: "Base Salary", accessorKey: "baseSalary" },
            { header: "Total Sales", accessorKey: "totalSales" },
            { header: "Total Discount", accessorKey: "totalDiscount" },
            { header: "Total Revenue", accessorKey: "totalRevenue" },
            { header: "Total Commission", accessorKey: "totalCommission" },
            { header: "Total Salary", accessorKey: "totalSalary" },
            { header: "Date", accessorKey: "date" },
        ],
        []
    );

    const table = useReactTable({
        data: salaryData,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(), // Enable pagination
        initialState: {
            pagination: {
                pageSize: 15, // Set the number of rows per page
            },
        },
    });

    return (
        <>
            <Header />
            <Sidemenu />
            <div className="main-content app-content">
                <div className="container-fluid">
                    <Breadcrumb title="View Salary" links={[{ text: "Dashboard", link: "/" }]} active="View Salary" />

                    <div className="grid grid-cols-12 gap-x-6">
                        <div className="xxl:col-span-12 col-span-12">
                            <div className="box overflow-hidden main-content-card">
                                <div className="box-body p-5">
                                    {/* Base Salary Input & Filter Dropdown (Side by Side) */}
                                    <div className="mb-4 flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <input
                                                type="number"
                                                placeholder="Set Base Salary"
                                                className="border px-3 py-2 rounded w-36"
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

                                        <div className="flex items-center gap-2">
                                            <label htmlFor="filter" className="font-medium">Filter:</label>
                                            <select
                                                id="filter"
                                                value={filter}
                                                onChange={(e) => setFilter(e.target.value)}
                                                className="border rounded-sm py-1 px-2 text-sm min-w-[120px] max-w-[200px] truncate"
                                            >
                                                <option value="all">All</option>
                                                <option value="this-day">Today</option>
                                                <option value="this-week">This Week</option>
                                                <option value="this-month">This Month</option>
                                            </select>
                                        </div>
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
                                                                className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase whitespace-nowrap"
                                                            >
                                                                {flexRender(header.column.columnDef.header, header.getContext())}
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
                                                                className="px-6 py-4 border-b border-gray-200 whitespace-nowrap"
                                                            >
                                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                            </td>
                                                        ))}
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>

                                    {/* Pagination Controls */}
                                    <div className="flex items-center justify-between mt-4">
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => table.previousPage()}
                                                disabled={!table.getCanPreviousPage()}
                                                className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                                            >
                                                Previous
                                            </button>
                                            <button
                                                onClick={() => table.nextPage()}
                                                disabled={!table.getCanNextPage()}
                                                className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                                            >
                                                Next
                                            </button>
                                        </div>
                                        <span className="text-sm">
                                            Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                                        </span>
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