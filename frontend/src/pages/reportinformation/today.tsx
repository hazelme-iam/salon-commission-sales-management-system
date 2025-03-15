import React, { useRef } from "react";
import { Button } from "@mui/material";
import Breadcrumb from "../../components/breadcrumbs";
import Header from "../../layouts/header";
import Sidemenu from "../../layouts/sidemenu";

const sampleData = [
    { id: 1, date: "2024-03-01", total_sales: "764432", commission: "45354", total_revenue: "10000", transactions: "40" },
    
];

const TodayReportList: React.FC = () => {
    const tableRef = useRef<HTMLDivElement>(null);
  
    // **Print Report**
    const printReport = () => {
        const printWindow = window.open("", "_blank");
        if (printWindow) {
            printWindow.document.write(`
                <html>
                    <head>
                        <title>Monthly Report</title>
                        <style>
                            body { font-family: Arial, sans-serif; padding: 20px; }
                            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                            th { background-color: #f4f4f4; }
                        </style>
                    </head>
                    <body>
                        <h2>Monthly Report</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Company</th>
                                    <th>Contact</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${sampleData.map(row => `
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
            ["ID", "Name", "Company", "Contact", "Date"],
            ...sampleData.map(row => [row.id, row.total_sales, row.commission, row.total_revenue, row.transactions, row.date])
        ].map(e => e.join(",")).join("\n");

        const blob = new Blob([csvContent], { type: "text/csv" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "monthly_report.csv";
        link.click();
    };

    // **Export TXT**
    const exportTXT = () => {
        const content = sampleData.map(row =>
            `ID: ${row.id}, Name: ${row.total_sales}, Company: ${row.commission}, Contact: ${row.total_revenue}, Number of Transactions: ${row.transactions}, Date: ${row.date}\n`
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
            <div className="main-content app-content">
                <Breadcrumb
                        title="Today Report"
                        links={[
                            { text: "Dashboard", link: "/" },
                        ]}
                         active="Today Report" 
                    />

                    {/* Export Buttons */}
                    <div className="flex gap-4 mb-4">
                        <Button variant="contained" color="primary" onClick={printReport}>Print Report</Button>
                        <Button variant="contained" color="secondary" onClick={exportCSV}>Export CSV</Button>
                        <Button variant="outlined" color="default" onClick={exportTXT}>Export TXT</Button>
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
                                            <th className="border border-gray-300 px-4 py-2">TotalCommission</th>
                                            <th className="border border-gray-300 px-4 py-2">Total Revenue</th>
                                            <th className="border border-gray-300 px-4 py-2">Number of Transactions</th>
                                            <th className="border border-gray-300 px-4 py-2">Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {sampleData.map((row, index) => (
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

export default TodayReportList;
