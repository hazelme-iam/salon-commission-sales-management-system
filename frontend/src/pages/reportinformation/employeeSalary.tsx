import React, { useState, useRef, useMemo, useEffect } from "react";
import { Button, MenuItem, Select } from "@mui/material";
import { useReactTable, getCoreRowModel, flexRender, getPaginationRowModel } from "@tanstack/react-table";
import Breadcrumb from "../../components/breadcrumbs";
import Header from "../../layouts/header";
import Sidemenu from "../../layouts/sidemenu";

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

const Report_List: React.FC = () => {
    const [selectedDate, setSelectedDate] = useState<string>("all");
    const [salaryData, setSalaryData] = useState<any[]>([]);
    const tableRef = useRef<HTMLDivElement>(null);

    // Fetch salary data from localStorage (same as Salary_List component)
    const fetchSalaryData = () => {
        const employees: Employee[] = JSON.parse(localStorage.getItem("employees") || "[]");
        const commissions: Commission[] = JSON.parse(localStorage.getItem("commissions") || "[]");

        // Filter commissions based on the selected time period
        const currentDate = new Date();
        const filteredCommissions = commissions.filter((comm) => {
            const commissionDate = new Date(comm.date);
            switch (selectedDate) {
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

    useEffect(() => {
        fetchSalaryData();
    }, [selectedDate]);

    // Define columns for the table
    const columns = useMemo(
        () => [
            { header: "ID", accessorKey: "id" },
            { header: "Employee ID", accessorKey: "employeeId" },
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

    // Initialize TanStack Table
    const table = useReactTable({
        data: salaryData,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(), // Enable pagination
        initialState: {
            pagination: {
                pageSize: 5, // Set the number of rows per page
            },
        },
    });

    // Handle print functionality
    const handlePrint = () => {
        if (tableRef.current) {
            const printWindow = window.open("", "", "width=800,height=600");
            printWindow?.document.write(`
                <html>
                <head>
                    <style>
                        body { font-family: Arial, sans-serif; padding: 20px; }
                        h1 { text-align: center; line-height: 1.5; margin-bottom: 20px; }
                        .header-section { text-align: center; margin-bottom: 30px; line-height: 1.4; }
                        .header-section h2 { margin-bottom: 5px; }
                        .signature-section { margin-top: 40px; text-align: right; }
                        .signature-line { margin-top: 50px; border-top: 1px solid black; width: 200px; display: inline-block; }
                        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                        th, td { border: 1px solid black; padding: 8px; text-align: center; }
                        th { background-color: #f2f2f2; }
                    </style>
                </head>
                <body>
                    <div class="header-section">
                        <h2>Danica's Beauty Lounge</h2>
                        <p>Puerto, Cagayan De Oro City</p>
                    </div>
                    <h1>Weekly Report</h1>
                    <p>${new Date().toLocaleDateString()}</p>
                    <table>
                        <thead>
                            ${table.getHeaderGroups().map(headerGroup => `
                                <tr>
                                    ${headerGroup.headers.map(header => `
                                        <th>${flexRender(header.column.columnDef.header, header.getContext())}</th>
                                    `).join("")}
                                </tr>
                            `).join("")}
                        </thead>
                        <tbody>
                            ${salaryData.map(row => `
                                <tr>
                                    ${Object.values(row).map(value => `
                                        <td>${value}</td>
                                    `).join("")}
                                </tr>
                            `).join("")}
                        </tbody>
                    </table>
                    <div class="signature-section">
                        <p>Authorized Signature</p>
                        <div class="signature-line"></div>
                    </div>
                </body>
                </html>
            `);
            printWindow?.document.close();
            printWindow?.print();
        }
    };
    
    return (
        <>
            <Header />
            <Sidemenu />
            {/* Main Content with Left Margin */}
            <div className="main-content app-content ml-64 p-6 bg-gray-80 min-h-screen">
                <Breadcrumb
                    title="Employee Commission & Salary Report"
                    links={[{ text: "Dashboard", link: "/" }]}
                    active="Salary Report"
                />

                {/* Filter and Print Buttons */}
                <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <label className="font-medium" > Filter by Date:</label>
                        <Select
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            displayEmpty
                            sx={{ width: "150px", height: "30px", fontSize: "14px" }}
                        >
                            <MenuItem value="all">All Dates</MenuItem>
                            <MenuItem value="this-day">Today</MenuItem>
                            <MenuItem value="this-week">This Week</MenuItem>
                            <MenuItem value="this-month">This Month</MenuItem>
                        </Select>
                        <Button variant="contained" color="primary" onClick={handlePrint}>Print</Button>
                    </div>

                    
                </div>

                {/* TanStack Table */}
                <div className="box overflow-hidden main-content-card" ref={tableRef}>
                    <div className="box-body p-5">
                        <table className="min-w-full bg-white">
                            <thead>
                                {table.getHeaderGroups().map(headerGroup => (
                                    <tr key={headerGroup.id} className="bg-gray-200">
                                        {headerGroup.headers.map(header => (
                                            <th
                                                key={header.id}
                                                className="px-6 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase whitespace-nowrap"
                                            >
                                                {flexRender(header.column.columnDef.header, header.getContext())}
                                            </th>
                                        ))}
                                    </tr>
                                ))}
                            </thead>
                            <tbody>
                                {table.getRowModel().rows.map(row => (
                                    <tr key={row.id} className="text-center">
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
        </>
    );
};

export default Report_List;