import Breadcrumb from "../../components/breadcrumbs";
import Header from "../../layouts/header";
import Sidemenu from "../../layouts/sidemenu";
import { useState, ChangeEvent, FormEvent } from "react";

interface FormData {
    employeeName: string;
    role: string;
    schedule: string;
    rate: string;
    totalSales: string;
    commissionEarned: string;
    totalSalary: string;

}

const initialFormData: FormData = {
    employeeName: "",
    role: "",
    schedule: "",
    rate: "",
    totalSales: "",
    commissionEarned: "",
    totalSalary: "",
};

function Report_Register() {
    const [formData, setFormData] = useState<FormData>(initialFormData);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:8000/reports/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert("Report Registered Successfully!");
                setFormData(initialFormData);
            } else {
                alert("Failed to register report.");
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
                        title="Report Generation"
                        links={[{ text: "Reports", link: "/report information" }]}
                        active="Report Generation"
                    />
                    <div className="grid grid-cols-12 gap-x-6">
                        <div className="xxl:col-span-12 col-span-12">
                            <div className="box overflow-hidden main-content-card">
                                <div className="box-body p-5">
                                    <form onSubmit={handleSubmit}>
                                        <h3>Add Report</h3>
                                        <hr className="mt-3 mb-6" />
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {[ 
                                                ["Employee Name", "employeeName", "bi bi-person"],
                                                ["Role", "role", "bi bi-briefcase"],
                                                ["Schedule", "schedule", "bi bi-calendar"],
                                                ["Rate", "rate", "bi bi-cash"],
                                                ["Total Sales", "totalSales", "bi bi-bar-chart"],
                                                ["Commission Earned", "commissionEarned", "bi bi-coin"],
                                                ["Total Salary", "totalSalary", "bi bi-wallet"]
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
                                            <div className="relative col-span-2">
                                                <label className="block font-medium mb-1" htmlFor="description">Description</label>
                                                <textarea id="description" name="description"
                                                    onChange={handleChange}
                                                    className="ti-form-input rounded-sm ps-4 focus:z-10"
                                                    placeholder="Enter report details"></textarea>
                                            </div>
                                        </div>
                                        <div className="mt-4 flex justify-end gap-4">
                                            <button type="reset" className="bg-gray-300 px-4 py-2 rounded" onClick={() => setFormData(initialFormData)}>Reset</button>
                                            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
                                                <i className="bi bi-save"></i>
                                                <span className="px-3">Submit Report</span>
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

export default Report_Register;
