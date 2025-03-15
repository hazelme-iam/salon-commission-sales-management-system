import { useEffect, useState } from "react";
import Breadcrumb from "../../components/breadcrumbs";
import Header from "../../layouts/header";
import Sidemenu from "../../layouts/sidemenu";
import { Link } from "react-router-dom";

interface Employee {
    id: string;
    firstName: string;
    lastName: string;
    phone: string;
    role: string;
    commission_rate: string;
    shift_schedule: string;
    emergency_contact: string;
}

const Employee_List = () => {
    const [employees, setEmployees] = useState<Employee[]>([]);

    useEffect(() => {
        const storedEmployees = JSON.parse(localStorage.getItem("employees") || "[]");
        setEmployees(storedEmployees);
    }, []);

    return (
        <>
            <Header />
            <Sidemenu />
            <div className="main-content app-content">
                <div className="container-fluid">
                    <Breadcrumb title="Manage Employee" links={[{ text: "Dashboard", link: "/" }]} active="Employees" 
                        buttons={<Link to="/employee/create" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">Add New Employee</Link>} 
                    />

                    <table className="table-auto w-full border-collapse border">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="border p-2">ID</th>
                                <th className="border p-2">First Name</th>
                                <th className="border p-2">Last Name</th>
                                <th className="border p-2">Phone</th>
                                <th className="border p-2">Role</th>
                                <th className="border p-2">Commission Rate</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees.map(emp => (
                                <tr key={emp.id}>
                                    <td className="border p-2">{emp.id}</td>
                                    <td className="border p-2">{emp.firstName}</td>
                                    <td className="border p-2">{emp.lastName}</td>
                                    <td className="border p-2">{emp.phone}</td>
                                    <td className="border p-2">{emp.role}</td>
                                    <td className="border p-2">{emp.commission_rate}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default Employee_List;
