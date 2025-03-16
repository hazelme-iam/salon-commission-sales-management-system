// Ensure login resets only when the dev server restarts
if (!sessionStorage.getItem("sessionStarted")) {
  localStorage.removeItem("isAuthenticated"); // Clear login state only on a fresh server start
  sessionStorage.setItem("sessionStarted", "true"); // Mark session as started
}


import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";


import "./assets/css/style.css";
import Dashboard from "./pages/dashboard";
import Commission_Registration from "./pages/commission/register";
import Commission_List from "./pages/commission/list";
import Salary_Registration from "./pages/salary/SalaryRegister";
import Salary_List from "./pages/salary/SalaryList";
import Employee_List from "./pages/EmployeeInformation/EmployeeList";
import Employee_Registration from "./pages/EmployeeInformation/EmployeeRegister";
import Report_List from "./pages/reportinformation/employeeSalary";
import MonthlyReportList from "./pages/reportinformation/monthly";
import TodayReportList from "./pages/reportinformation/today";
import WeeklyReportList from "./pages/reportinformation/weekly";
import Edit_Commission from "./pages/commission/edit";
import Login from "./log-in/login";
import ProtectedRoute from "./ProtectedRoute"; 



createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/commissions" element={<Commission_List />} />
          <Route path="/commissions/create" element={<Commission_Registration />} />
          <Route path="/viewsalary" element={<Salary_List />} />
          <Route path="/viewsalary/create" element={<Salary_Registration />} />
          <Route path="/employees" element={<Employee_List />} />
          <Route path="/employee/create" element={<Employee_Registration />} />
          <Route path="/reports" element={<Report_List />} />
          <Route path="/monthlyreports" element={<MonthlyReportList />} />
          <Route path="/todayreports" element={<TodayReportList />} />
          <Route path="/weeklyreports" element={<WeeklyReportList />} />
          <Route path="/edit" element={<Edit_Commission />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
