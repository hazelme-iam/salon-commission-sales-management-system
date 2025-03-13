import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './assets/css/style.css';
import Dashboard from './pages/dashboard';
import Customer_Registration from './pages/commission/register';
import Customer_List from './pages/commission/list';
import Sales_List from './pages/sales/SalesList';
import Employee_List from './pages/EmployeeInformation/EmployeeList';
import Employee_Registration from './pages/EmployeeInformation/EmployeeRegister';
import Report_List from './pages/reportinformation/employeeSalary';
import MonthlyReportList from './pages/reportinformation/monthly';
import TodayReportList from './pages/reportinformation/today';




createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/customers" element={<Customer_List />} />
        <Route path="/customer/create" element={<Customer_Registration />} />
        <Route path="/sales" element={<Sales_List/>} /> 
        <Route path="/employees" element={<Employee_List/>} />
        <Route path="/employee/create" element={<Employee_Registration/>} />
        <Route path="/reports" element={<Report_List />} />
        <Route path="/monthlyreports" element={<MonthlyReportList/>} />
        <Route path="/todayreports" element={<TodayReportList/>} />

    
      </Routes>
    </BrowserRouter>
  </StrictMode>
);