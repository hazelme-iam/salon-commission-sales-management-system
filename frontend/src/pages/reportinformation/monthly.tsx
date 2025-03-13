import React, { useEffect, useRef, useState, useMemo } from "react";
import { Grid, html } from "gridjs";
import { DatePicker } from "@mui/x-date-pickers";
import { Button, TextField } from "@mui/material";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
import dayjs from "dayjs";
import "gridjs/dist/theme/mermaid.css";
import Breadcrumb from "../../components/breadcrumbs";
import Header from "../../layouts/header";
import Sidemenu from "../../layouts/sidemenu";
import Profile from "../../assets/avatar.png";
import { Link } from "react-router-dom";

interface EmployeeData {
  id: number;
  name: string;
  company: string;
  contact: string;
  date: string;
}

const sampleData: EmployeeData[] = [
  { id: 1, name: "John Doe", company: "Salon A", contact: "123-456", date: "2024-03-01" },
  { id: 2, name: "Jane Smith", company: "Salon B", contact: "789-012", date: "2024-03-05" },
  { id: 3, name: "Alice Brown", company: "Salon C", contact: "345-678", date: "2024-03-10" },
];

const MonthlyReportList: React.FC = () => {
  const gridRef = useRef<HTMLDivElement>(null);
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);

  // ✅ Filtered Data using useMemo (improves performance)
  const filteredData = useMemo(() => {
    return sampleData.filter((item) => {
      if (!startDate || !endDate) return true;
      const itemDate = dayjs(item.date);
      return itemDate.isAfter(dayjs(startDate).subtract(1, "day")) &&
             itemDate.isBefore(dayjs(endDate).add(1, "day"));
    });
  }, [startDate, endDate]);

  // ✅ Function to initialize the Grid table
  const initializeTable = () => {
    if (gridRef.current) {
      new Grid({
        columns: [
          { name: "#", width: "50px" },
          {
            name: "Employee ID",
            width: "200px",
            formatter: (_, row) =>
              html(`
                <div class="flex items-center gap-3">
                  <img src="${Profile}" alt="Avatar" class="w-8 h-8 rounded-full" />
                  <span>${row.cells[1].data}</span>
                </div>
              `),
          },
          { name: "Employee Name", width: "150px" },
          { name: "Company", width: "150px" },
          { name: "Contact No.", width: "100px" },
          { name: "Date", width: "120px" },
        ],
        pagination: { limit: 5 },
        search: true,
        sort: true,
        data: filteredData.map((row, index) => [(index + 1) + ".", row.id, row.name, row.company, row.contact, row.date]),
      }).render(gridRef.current);
    }
  };

  // ✅ Run once on mount, and again when `filteredData` updates
  useEffect(() => {
    initializeTable();
  }, [filteredData]);

  // ✅ Export to PDF
  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Monthly Report", 14, 10);
    (doc as any).autoTable({
      head: [["ID", "Name", "Company", "Contact", "Date"]],
      body: filteredData.map((row) => [row.id, row.name, row.company, row.contact, row.date]),
    });
    doc.save("monthly_report.pdf");
  };

  // ✅ Export to Excel
  const exportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Report");
    XLSX.writeFile(workbook, "monthly_report.xlsx");
  };

  // ✅ Print Report
  const printReport = () => {
    window.print();
  };

  return (
    <>
      <Header />
      <Sidemenu />
      <div className="main-content app-content">
        <div className="container-fluid">
          <Breadcrumb
            title="Manage Report"
            links={[{ text: "Dashboard", link: "/" }]}
            active="Report"
            buttons={
              <Link to="/report/create" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center gap-2">
                <i className="bi bi-printer-fill"></i> Print
              </Link>
            }
          />

          {/* Date Pickers */}
          <div className="flex gap-4 mb-4">
            <DatePicker
              label="Start Date"
              value={startDate}
              onChange={(newValue) => setStartDate(newValue)}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
            <DatePicker
              label="End Date"
              value={endDate}
              onChange={(newValue) => setEndDate(newValue)}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </div>

          {/* Export Buttons */}
          <div className="flex gap-4 mb-4">
            <Button variant="contained" color="primary" onClick={exportPDF}>Export PDF</Button>
            <Button variant="contained" color="secondary" onClick={exportExcel}>Export Excel</Button>
            <Button variant="outlined" color="inherit" onClick={printReport}>Print</Button>
          </div>

          {/* Grid Table */}
          <div className="grid grid-cols-12 gap-x-6">
            <div className="xxl:col-span-12 col-span-12">
              <div className="box overflow-hidden main-content-card">
                <div className="box-body p-5">
                  <div ref={gridRef}></div> {/* Grid.js Table Here */}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default MonthlyReportList;
