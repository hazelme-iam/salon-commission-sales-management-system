import React, { useRef, useState } from "react";
import { Button, MenuItem, Select } from "@mui/material";
import Breadcrumb from "../../components/breadcrumbs";
import Header from "../../layouts/header";
import Sidemenu from "../../layouts/sidemenu";

const sampleData = [
    { id: 1, date: "2024-03-01", total_sales: "764432", commission: "45354", total_revenue: "10000", transactions: "40" },
    { id: 2, date: "2024-03-02", total_sales: "864532", commission: "55364", total_revenue: "12000", transactions: "45" },
    { id: 3, date: "2024-03-03", total_sales: "964632", commission: "65374", total_revenue: "14000", transactions: "50" },
];

const SalesReportList: React.FC = () => {
    const tableRef = useRef<HTMLDivElement>(null);
    const [filter, setFilter] = useState<string>("all");

    // Filter data based on selected date range
    const filteredData = sampleData.filter((row) => {
        const rowDate = new Date(row.date);
        const currentDate = new Date();
        switch (filter) {
            case "today":
                return (
                    rowDate.getDate() === currentDate.getDate() &&
                    rowDate.getMonth() === currentDate.getMonth() &&
                    rowDate.getFullYear() === currentDate.getFullYear()
                );
            case "this-week":
                const startOfWeek = new Date(currentDate);
                startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
                const endOfWeek = new Date(currentDate);
                endOfWeek.setDate(currentDate.getDate() + (6 - currentDate.getDay()));
                return rowDate >= startOfWeek && rowDate <= endOfWeek;
            case "this-month":
                return (
                    rowDate.getMonth() === currentDate.getMonth() &&
                    rowDate.getFullYear() === currentDate.getFullYear()
                );
            default:
                return true; // "all" filter
        }
    });

    // **Print Report**
    const printReport = () => {
        const printWindow = window.open("", "_blank");
        if (printWindow) {
            printWindow.document.write(`
                <html>
                    <head>
                        <title>Sales and Revenue Report</title>
                        <style>
                            body { font-family: Arial, sans-serif; padding: 20px; }
                            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                            th { background-color: #f4f4f4; }
                        </style>
                    </head>
                    <body>
                        <h2>Sales and Revenue Report</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Total Sales</th>
                                    <th>Total Commission</th>
                                    <th>Total Revenue</th>
                                    <th>Number of Transactions</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${filteredData.map(row => `
                                    <tr>
                                        <td>${row.id}</td>
                                        <td>${row.total_sales}</td>
                                        <td>${row.commission}</td>
                                        <td>${row.total_revenue}</td>
                                        <td>${row.transactions}</td>
                                        <td>${row.date}</td>
                                    </tr>
                                `).join("")}
                            </tbody>
                        </table>
                    </body>
                </html>
            `);
            printWindow.document.close();
            printWindow.print();
        }
    };

    // **Export CSV**
    const exportCSV = () => {
        const csvContent = [
            ["ID", "Total Sales", "Total Commission", "Total Revenue", "Number of Transactions", "Date"],
            ...filteredData.map(row => [row.id, row.total_sales, row.commission, row.total_revenue, row.transactions, row.date])
        ].map(e => e.join(",")).join("\n");

        const blob = new Blob([csvContent], { type: "text/csv" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "monthly_report.csv";
        link.click();
    };

    // **Export TXT**
    const exportTXT = () => {
        const content = filteredData.map(row =>
            `ID: ${row.id}, Total Sales: ${row.total_sales}, Total Commission: ${row.commission}, Total Revenue: ${row.total_revenue}, Number of Transactions: ${row.transactions}, Date: ${row.date}\n`
        ).join("\n");

        const blob = new Blob([content], { type: "text/plain" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "monthly_report.txt";
        link.click();
    };

    return (
        <>
            <Header />
            <Sidemenu />
            {/* Main Content with Left Margin */}
            <div className="main-content app-content ml-64 p-6 bg-gray-80 min-h-screen">
                <Breadcrumb
                    title="Revenue and Sales Report"
                    links={[
                        { text: "Dashboard", link: "/" },
                    ]}
                    active="Revenue and Sales Report"
                />

                {/* Filter and Export Buttons */}
                <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <label className="font-medium">Filter by Date:</label>
                        <Select
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            displayEmpty
                            sx={{ width: "150px", height: "30px", fontSize: "14px" }}
                        >
                            <MenuItem value="all">All</MenuItem>
                            <MenuItem value="today">Today</MenuItem>
                            <MenuItem value="this-week">This Week</MenuItem>
                            <MenuItem value="this-month">This Month</MenuItem>
                        </Select>
                    </div>

                    <div className="flex gap-4">
                        <Button variant="contained" color="primary" onClick={printReport}>Print Report</Button>
                        <Button variant="contained" color="secondary" onClick={exportCSV}>Export CSV</Button>
                        <Button variant="outlined" color="default" onClick={exportTXT}>Export TXT</Button>
                    </div>
                </div>

                {/* Report Table */}
                <div className="box overflow-hidden main-content-card">
                    <div className="box-body p-5">
                        <div ref={tableRef}>
                            <table className="w-full border-collapse border border-gray-300">
                                <thead>
                                    <tr className="bg-gray-200">
                                        <th className="border border-gray-300 px-4 py-2">ID</th>
                                        <th className="border border-gray-300 px-4 py-2">Total Sales</th>
                                        <th className="border border-gray-300 px-4 py-2">Total Commission</th>
                                        <th className="border border-gray-300 px-4 py-2">Total Revenue</th>
                                        <th className="border border-gray-300 px-4 py-2">Number of Transactions</th>
                                        <th className="border border-gray-300 px-4 py-2">Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredData.map((row, index) => (
                                        <tr key={index} className="text-center">
                                            <td className="border border-gray-300 px-4 py-2">{row.id}</td>
                                            <td className="border border-gray-300 px-4 py-2">{row.total_sales}</td>
                                            <td className="border border-gray-300 px-4 py-2">{row.commission}</td>
                                            <td className="border border-gray-300 px-4 py-2">{row.total_revenue}</td>
                                            <td className="border border-gray-300 px-4 py-2">{row.transactions}</td>
                                            <td className="border border-gray-300 px-4 py-2">{row.date}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SalesReportList;