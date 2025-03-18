import React, { useState, useRef } from "react";
import { Button, MenuItem, Select } from "@mui/material";
import Breadcrumb from "../../components/breadcrumbs";
import Header from "../../layouts/header";
import Sidemenu from "../../layouts/sidemenu";

const sampleData = [
    { id: 1, name: "Hazel", base_salary: "400", total_sales: "10", total_discount: "10", total_revenue:"10", total_commission:"900", total_salary:"100", date:"2025-01-01" },
    { id: 2, name: "Twella", base_salary: "400", total_sales: "10", total_discount: "10", total_revenue:"10", total_commission:"900", total_salary:"100", date:"2025-02-02" },
    { id: 3, name: "Hazel", base_salary: "400", total_sales: "10", total_discount: "10", total_revenue:"10", total_commission:"900", total_salary:"100", date:"2025-03-03" },
    { id: 4, name: "Hazel", base_salary: "400", total_sales: "10", total_discount: "10", total_revenue:"10", total_commission:"900", total_salary:"100", date:"2025-04-04" },
    { id: 5, name: "Hazel", base_salary: "400", total_sales: "10", total_discount: "10", total_revenue:"10", total_commission:"900", total_salary:"100", date:"2025-05-05" },
];

const Report_List: React.FC = () => {
    const [selectedDate, setSelectedDate] = useState<string>("all");
    const tableRef = useRef<HTMLDivElement>(null);

    const filteredData = selectedDate === "all" ? sampleData : sampleData.filter(row => row.date === selectedDate);

    const handlePrint = () => {
        if (tableRef.current) {
            const printWindow = window.open("", "", "width=800,height=600");
            printWindow?.document.write(`
                <html>
                <head>
                    <title>Employee Commission & Salary</title>
                    
                    <style>
                        body { font-family: Arial, sans-serif; padding: 20px; }
                        h1, h1 { text-align: center; }
                        .header-section { text-align: center; margin-bottom: 20px; }
                        .signature-section { margin-top: 50px; text-align: right; }
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
                    ${tableRef.current.outerHTML}
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
            <div className="main-content app-content">
                <Breadcrumb
                    title="Employee Commission & Salary Report"
                    links={[{ text: "Dashboard", link: "/" }]}
                    active="Salary Report"
                />

                <div className="mb-4">
                    <label className="mr-5">Filter by Date:</label>
                    <Select
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        displayEmpty
                        sx={{ width: "150px", height: "30px", fontSize: "14px", marginLeft: "10px" }}
                    >
                        <MenuItem value="all">All Dates</MenuItem>
                        {Array.from(new Set(sampleData.map(row => row.date))).map(date => (
                            <MenuItem key={date} value={date}>{date}</MenuItem>
                        ))}
                    </Select>
                </div>

                <div className="mb-4 flex space-x-2">
                    <Button variant="contained" color="primary" onClick={handlePrint}>Print</Button>
                </div>

                <div className="box overflow-hidden main-content-card" ref={tableRef}>
                    <div className="box-body p-5">
                        <table className="w-full border-collapse border border-gray-300">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="border border-gray-300 px-4 py-2">ID</th>
                                    <th className="border border-gray-300 px-4 py-2">Name</th>
                                    <th className="border border-gray-300 px-4 py-2">Base Salary</th>
                                    <th className="border border-gray-300 px-4 py-2">Total Sales</th>
                                    <th className="border border-gray-300 px-4 py-2">Total Discount</th>
                                    <th className="border border-gray-300 px-4 py-2">Total Revenue</th>
                                    <th className="border border-gray-300 px-4 py-2">Total Commission</th>
                                    <th className="border border-gray-300 px-4 py-2">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData.length > 0 ? (
                                    filteredData.map((row, index) => (
                                        <tr key={index} className="text-center">
                                            <td className="border border-gray-300 px-4 py-2">{row.id}</td>
                                            <td className="border border-gray-300 px-4 py-2">{row.name}</td>
                                            <td className="border border-gray-300 px-4 py-2">{row.base_salary}</td>
                                            <td className="border border-gray-300 px-4 py-2">{row.total_sales}</td>
                                            <td className="border border-gray-300 px-4 py-2">{row.total_discount}</td>
                                            <td className="border border-gray-300 px-4 py-2">{row.total_revenue}</td>
                                            <td className="border border-gray-300 px-4 py-2">{row.total_commission}</td>
                                            <td className="border border-gray-300 px-4 py-2">{row.date}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={8} className="text-center py-4">No data available for this date</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Report_List;
