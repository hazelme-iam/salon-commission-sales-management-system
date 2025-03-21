// Ensure login resets only when the dev server restarts
if (!sessionStorage.getItem("sessionStarted")) {
  localStorage.removeItem("isAuthenticated"); // Clear login state only on a fresh server start
  sessionStorage.setItem("sessionStarted", "true"); // Mark session as started
}

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; // Import TanStack Query

import "./assets/css/style.css";
import Dashboard from "./pages/dashboard";
import Commission_Registration from "./pages/commission/register";
import Commission_List from "./pages/commission/list";
import Salary_Registration from "./pages/salary/SalaryRegister";
import Salary_List from "./pages/salary/SalaryList";
import Employee_List from "./pages/EmployeeInformation/EmployeeList";
import Employee_Registration from "./pages/EmployeeInformation/EmployeeRegister";
import Report_List from "./pages/reportinformation/employeeSalary";
import SalesReportList from "./pages/reportinformation/today";
import Edit_Commission from "./pages/commission/edit";
import Login from "./log-in/login";
import ProtectedRoute from "./ProtectedRoute";
import Employee_Edit from "./pages/EmployeeInformation/EmployeeEdit";

// Create a TanStack Query client
const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* Wrap the app with QueryClientProvider */}
    <QueryClientProvider client={queryClient}>
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
            <Route path="/todayreports" element={<SalesReportList />} />
            <Route path="/edit" element={<Edit_Commission />} />
            <Route path="/editemployee/:id" element={<Employee_Edit />} /> {/* Updated route */}
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
);