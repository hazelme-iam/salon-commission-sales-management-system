import Breadcrumb from "../../components/breadcrumbs";
import Header from "../../layouts/header";
import Sidemenu from "../../layouts/sidemenu";
import { useState, ChangeEvent, FormEvent } from "react";


interface FormData {
    firstName: string;
    lastName: string;
    phone: string;
    role: string;
    commission_rate: string;
    shift_schedule: string;
    emergency_contact: string;
    photo?: File | null;
}

const initialFormData: FormData = {
    firstName: "",
    lastName: "",
    phone: "",
    role: "",
    commission_rate: "",
    shift_schedule: "",
    emergency_contact: "",
    photo: null,
};

function Employee_Registration() {
    const [formData, setFormData] = useState<FormData>(initialFormData);
   

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

   

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            if (value) {
                formDataToSend.append(key, value as string);
            }
        });

        try {
            const response = await fetch("http://localhost:8000/employees/", {
                method: "POST",
                body: formDataToSend,
            });

            if (response.ok) {
                alert("Employee Registered Successfully!");
                setFormData(initialFormData); // Reset Form
            } else {
                alert("Failed to register employee.");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            alert("An error occurred.");
        }
    };

    return (
        <>
            <Header />
            <Sidemenu />
            <div className="main-content app-content">
                <div className="container-fluid">
                    <Breadcrumb
                        title="Employee Registration"
                        links={[{ text: "Employee", link: "/employees" }]}
                        active="Register New Employee"
                    />

                    <div className="grid grid-cols-12 gap-x-6">
                        <div className="xxl:col-span-12 col-span-12">
                            <div className="box overflow-hidden main-content-card">
                                <div className="box-body p-5">
                                    <form onSubmit={handleSubmit}>
                                       
                                        <hr className="mt-3 mb-6" />

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {[
                                                ["First Name", "firstName", "bi bi-person"],
                                                ["Last Name", "lastName", "bi bi-person"],
                                                ["Phone", "phone", "bi bi-telephone", "tel"],
                                                ["Role", "role", "bi bi-person-badge"],
                                                ["Commission Rate", "commission_rate", "bi bi-cash"],
                                                ["Shift Schedule", "shift_schedule", "bi bi-calendar-week"],
                                                ["Emergency Contact", "emergency_contact", "bi bi-person-lines-fill"]
                                            ].map(([label, name, icon, type = "text"]) => (
                                                <div key={name} className="relative">
                                                    <label className="block font-medium mb-1" htmlFor={name}>{label}</label>
                                                    <div className="relative">
                                                        <input type={type} id={name} name={name}
                                                            onChange={handleChange}
                                                            className="ti-form-input rounded-sm ps-11 focus:z-10"
                                                            placeholder={`Enter ${label}`} />
                                                        <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-4">
                                                            <i className={icon}></i>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="mt-4 flex justify-end gap-4">
                                            <button type="reset" className="bg-gray-300 px-4 py-2 rounded" onClick={() => setFormData(initialFormData)}>Reset</button>
                                            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
                                                <i className="bi bi-save"></i>
                                                <span className="px-3">Submit Record</span>
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
