import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './assets/css/style.css';
import Dashboard from './pages/dashboard';
import Commission_Registration from './pages/commission/register';
import Commission_List from './pages/commission/list';
import Salary_Registration from './pages/salary/SalaryRegister';
import Salary_List from './pages/salary/SalaryList';
import Employee_List from './pages/EmployeeInformation/EmployeeList';
import Employee_Registration from './pages/EmployeeInformation/EmployeeRegister';
import Report_List from './pages/reportinformation/employeeSalary';
import MonthlyReportList from './pages/reportinformation/monthly';
import TodayReportList from './pages/reportinformation/today';
import WeeklyReportList from './pages/reportinformation/weekly';
import Edit_Commission from './pages/commission/edit';





createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/commissions" element={<Commission_List />} />
        <Route path="/commissions/create" element={<Commission_Registration />} />
        <Route path="/viewsalary" element={<Salary_List />} />
        <Route path="/viewsalary/create" element={<Salary_Registration/>} /> 
        <Route path="/employees" element={<Employee_List/>} />
        <Route path="/employee/create" element={<Employee_Registration/>} />
        <Route path="/reports" element={<Report_List />} />
        <Route path="/monthlyreports" element={<MonthlyReportList/>} />
        <Route path="/todayreports" element={<TodayReportList/>} />
        <Route path="/weeklyreports" element={<WeeklyReportList/>} />
        <Route path="/edit" element={<Edit_Commission/>} />


    
      </Routes>
    </BrowserRouter>
  </StrictMode>
);