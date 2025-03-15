import Breadcrumb from "../../components/breadcrumbs";
import Header from "../../layouts/header";
import Sidemenu from "../../layouts/sidemenu";
import { useState, ChangeEvent, FormEvent } from "react";
import ProfileImage from "../../assets/avatar.png";

interface FormData {
    
    employeeID: string;
    employeeName: string;
    customerName: string;
    service: string;
    sales: string;
    commission: string;
    date: string;
}

const initialFormData: FormData = {
    employeeID: "",
    employeeName: "",
    customerName: "",
    service: "",
    sales: "",
    commission: "",
    date: "",
};

function Commission_Registration() {
    const [formData, setFormData] = useState<FormData>(initialFormData);
    const [errors, setErrors] = useState<Partial<FormData>>({});

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" });
    };

    const validateForm = () => {
        const newErrors: Partial<FormData> = {};
        if (!formData.employeeName) newErrors.employeeName = "Employee Name is required";
        if (!formData.customerName) newErrors.customerName = "Customer Name is required";
        if (!formData.service) newErrors.service = "Service is required";
        if (!formData.sales) newErrors.sales = "Sales is required";
        if (!formData.commission) newErrors.commission = "Commission is required";
        if (!formData.date) newErrors.date = "Date is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validateForm()) {
            console.log("Form submitted", formData);
        } else {
            console.log("Form has errors");
        }
    };

    return (
        <>
            <Header />
            <Sidemenu />
            <div className="main-content app-content">
                <div className="container-fluid">
                    <Breadcrumb
                        title="Add Commission"
                        links={[
                            { text: "commission", link: "/commissions" },
                        ]}
                        active="Register New Customer"
                    />

                    <div className="grid grid-cols-12 gap-x-6">
                        <div className="xxl:col-span-12 col-span-12">
                            <div className="box overflow-hidden main-content-card">
                                <div className="box-body p-5">
                                    <form onSubmit={handleSubmit}>
                                        <hr className="mt-3 mb-6" />

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {[
                                                 ["Employee ID", "employeeID", "bi bi-card-list"],
                                                ["Employee Name", "employeeName", "bi bi-person"],
                                                ["Customer Name", "customerName", "bi bi-person"],
                                                ["Service", "service", "bi bi-building"],
                                                ["Sales", "sales", "bi bi-coin", "email"],
                                                ["Commission", "commission", "bi bi-cash"],
                                                ["Date", "date", "bi bi-calendar", "date"],
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
                                                    {errors[name as keyof FormData] && <p className="text-red-500 text-sm">{errors[name as keyof FormData]}</p>}
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

export default Commission_Registration;