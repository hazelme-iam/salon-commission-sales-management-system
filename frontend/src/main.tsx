import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './assets/css/style.css';
import Dashboard from './pages/dashboard';
import Customer_Registration from './pages/commission/register';
import Customer_List from './pages/commission/list';
import Student_List from './pages/sales/StudentList';
import Student_Registration from './pages/sales/StudentRegister';
import Employee_List from './pages/EmployeeInformation/EmployeeList';
import Employee_Registration from './pages/EmployeeInformation/EmployeeRegister';
import Report_List from './pages/reportinformation/report';



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/customers" element={<Customer_List />} />
        <Route path="/customer/create" element={<Customer_Registration />} />
        <Route path="/students_information" element={<Student_List/>} />
        <Route path="/student/create" element={<Student_Registration/>} />
        <Route path="/employee_information" element={<Employee_List/>} />
        <Route path="/employee/create" element={<Employee_Registration/>} />
        <Route path="/report_information" element={<Report_List/>} />
    
      </Routes>
    </BrowserRouter>
  </StrictMode>
);