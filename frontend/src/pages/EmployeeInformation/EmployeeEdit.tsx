import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Use useParams instead of useSearchParams
import Header from "../../layouts/header";
import Sidemenu from "../../layouts/sidemenu";
import Breadcrumb from "../../components/breadcrumbs";

interface Employee {
    id: string;
    firstName: string;
    lastName: string;
    phone: string;
    role: string;
    commission_rate: number;
    shift_schedule: string;
    emergency_contact: string;
}

function Employee_Edit() {
    const { id } = useParams<{ id: string }>(); // Extract id from the URL path
    const navigate = useNavigate();
    const [employee, setEmployee] = useState<Employee | null>(null);

    // Initial employee data
    const initialEmployeeData: Employee = {
        id: "",
        firstName: "",
        lastName: "",
        phone: "",
        role: "",
        commission_rate: 0,
        shift_schedule: "",
        emergency_contact: "",
    };

    const [employeeData, setEmployeeData] = useState<Employee>(initialEmployeeData);

    // Fetch employee data
    useEffect(() => {
        if (id) {
            // Fetch the employee to edit
            const storedEmployees = JSON.parse(localStorage.getItem("employees") || "[]");
            const employeeToEdit = storedEmployees.find((emp: Employee) => emp.id === id);
            if (employeeToEdit) {
                setEmployee(employeeToEdit);
                setEmployeeData(employeeToEdit);
            }
        }
    }, [id]);

    // Handle form input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setEmployeeData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Handle form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (id) {
            // Update the employee in localStorage
            const storedEmployees = JSON.parse(localStorage.getItem("employees") || "[]");
            const updatedEmployees = storedEmployees.map((emp: Employee) =>
                emp.id === id ? employeeData : emp
            );
            localStorage.setItem("employees", JSON.stringify(updatedEmployees));

            // Navigate back to the employees list
            navigate("/employees");
        }
    };

    if (!employee) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Header />
            <Sidemenu />
            <div className="main-content app-content">
                <div className="container-fluid">
                    <Breadcrumb
                        title="Edit Employee"
                        links={[{ text: "Employees", link: "/employees" }]}
                        active="Edit Employee"
                    />

                    <div className="grid grid-cols-12 gap-x-6">
                        <div className="xxl:col-span-12 col-span-12">
                            <div className="box overflow-hidden main-content-card">
                                <div className="box-body p-5">
                                    <form onSubmit={handleSubmit}>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {/* First Name */}
                                            <div>
                                                <label className="block font-medium mb-1" htmlFor="firstName">First Name</label>
                                                <input
                                                    type="text"
                                                    id="firstName"
                                                    name="firstName"
                                                    value={employeeData.firstName}
                                                    onChange={handleChange}
                                                    className="ti-form-input rounded-sm"
                                                    placeholder="Enter First Name"
                                                />
                                            </div>

                                            {/* Last Name */}
                                            <div>
                                                <label className="block font-medium mb-1" htmlFor="lastName">Last Name</label>
                                                <input
                                                    type="text"
                                                    id="lastName"
                                                    name="lastName"
                                                    value={employeeData.lastName}
                                                    onChange={handleChange}
                                                    className="ti-form-input rounded-sm"
                                                    placeholder="Enter Last Name"
                                                />
                                            </div>

                                            {/* Phone */}
                                            <div>
                                                <label className="block font-medium mb-1" htmlFor="phone">Phone</label>
                                                <input
                                                    type="text"
                                                    id="phone"
                                                    name="phone"
                                                    value={employeeData.phone}
                                                    onChange={handleChange}
                                                    className="ti-form-input rounded-sm"
                                                    placeholder="Enter Phone Number"
                                                />
                                            </div>

                                            {/* Role */}
                                            <div>
                                                <label className="block font-medium mb-1" htmlFor="role">Role</label>
                                                <input
                                                    type="text"
                                                    id="role"
                                                    name="role"
                                                    value={employeeData.role}
                                                    onChange={handleChange}
                                                    className="ti-form-input rounded-sm"
                                                    placeholder="Enter Role"
                                                />
                                            </div>

                                            {/* Commission Rate */}
                                            <div>
                                                <label className="block font-medium mb-1" htmlFor="commission_rate">Commission Rate (%)</label>
                                                <input
                                                    type="number"
                                                    id="commission_rate"
                                                    name="commission_rate"
                                                    value={employeeData.commission_rate}
                                                    onChange={handleChange}
                                                    className="ti-form-input rounded-sm"
                                                    placeholder="Enter Commission Rate"
                                                />
                                            </div>

                                            {/* Shift Schedule */}
                                            <div>
                                                <label className="block font-medium mb-1" htmlFor="shift_schedule">Shift Schedule</label>
                                                <input
                                                    type="text"
                                                    id="shift_schedule"
                                                    name="shift_schedule"
                                                    value={employeeData.shift_schedule}
                                                    onChange={handleChange}
                                                    className="ti-form-input rounded-sm"
                                                    placeholder="Enter Shift Schedule"
                                                />
                                            </div>

                                            {/* Emergency Contact */}
                                            <div>
                                                <label className="block font-medium mb-1" htmlFor="emergency_contact">Emergency Contact</label>
                                                <input
                                                    type="text"
                                                    id="emergency_contact"
                                                    name="emergency_contact"
                                                    value={employeeData.emergency_contact}
                                                    onChange={handleChange}
                                                    className="ti-form-input rounded-sm"
                                                    placeholder="Enter Emergency Contact"
                                                />
                                            </div>
                                        </div>

                                        {/* Buttons */}
                                        <div className="mt-4 flex justify-end gap-4">
                                            <button
                                                type="reset"
                                                className="bg-gray-300 px-4 py-2 rounded"
                                                onClick={() => setEmployeeData(initialEmployeeData)}
                                            >
                                                Reset
                                            </button>
                                            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
                                                Save Changes
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Employee_Edit;