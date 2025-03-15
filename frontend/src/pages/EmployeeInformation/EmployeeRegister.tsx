import Breadcrumb from "../../components/breadcrumbs";
import Header from "../../layouts/header";
import Sidemenu from "../../layouts/sidemenu";
import { useState, ChangeEvent, FormEvent } from "react";

interface FormData {
    id: string;
    firstName: string;
    lastName: string;
    phone: string;
    role: string;
    commission_rate: string;
    shift_schedule: string;
    emergency_contact: string;
}

const initialFormData: FormData = {
    id: "",
    firstName: "",
    lastName: "",
    phone: "",
    role: "",
    commission_rate: "",
    shift_schedule: "",
    emergency_contact: "",
};

function Employee_Registration() {
    const [formData, setFormData] = useState<FormData>(initialFormData);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const employees = JSON.parse(localStorage.getItem("employees") || "[]");

        const newEmployee = {
            ...formData,
            id: Date.now().toString(),
        };

        employees.push(newEmployee);
        localStorage.setItem("employees", JSON.stringify(employees));

        alert("Employee Registered Successfully!");
        setFormData(initialFormData);
    };

    return (
        <>
            <Header />
            <Sidemenu />
            <div className="main-content app-content">
                <div className="container-fluid">
                    <Breadcrumb title="Employee Registration" links={[{ text: "Employee", link: "/employees" }]} active="Register New Employee" />

                    <div className="grid grid-cols-12 gap-x-6">
                        <div className="xxl:col-span-12 col-span-12">
                            <div className="box overflow-hidden main-content-card">
                                <div className="box-body p-5">
                                    <form onSubmit={handleSubmit}>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {[
                                                ["First Name", "firstName"],
                                                ["Last Name", "lastName"],
                                                ["Phone", "phone"],
                                                ["Role", "role"],
                                                ["Commission Rate", "commission_rate"],
                                                ["Shift Schedule", "shift_schedule"],
                                                ["Emergency Contact", "emergency_contact"]
                                            ].map(([label, name]) => (
                                                <div key={name} className="relative">
                                                    <label className="block font-medium mb-1" htmlFor={name}>{label}</label>
                                                    <input type="text" id={name} name={name} value={formData[name as keyof FormData]} onChange={handleChange} className="ti-form-input rounded-sm" placeholder={`Enter ${label}`} />
                                                </div>
                                            ))}
                                        </div>

                                        <div className="mt-4 flex justify-end gap-4">
                                            <button type="reset" className="bg-gray-300 px-4 py-2 rounded" onClick={() => setFormData(initialFormData)}>Reset</button>
                                            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
                                                Submit Record
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

export default Employee_Registration;
