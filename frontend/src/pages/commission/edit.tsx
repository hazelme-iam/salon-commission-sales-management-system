import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Header from "../../layouts/header";
import Sidemenu from "../../layouts/sidemenu";
import Breadcrumb from "../../components/breadcrumbs";

interface Commission {
    id: string;
    employeeId: string;
    employeeName: string;
    customerName: string;
    service: string;
    sales: string;
    discount: string;
    amount: string;
    date: string; // Ensure date is included
}

interface Employee {
    id: string;
    firstName: string;
    lastName: string;
    commission_rate: number;
}

function Edit() {
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id"); // Extract the id from the query parameter
    const navigate = useNavigate();
    const [commission, setCommission] = useState<Commission | null>(null);
    const [employees, setEmployees] = useState<Employee[]>([]); // List of employees
    const [error, setError] = useState<string | null>(null); // Error state for validation

    // Initial commission data
    const initialCommissionData: Commission = {
        id: "",
        employeeId: "",
        employeeName: "",
        customerName: "",
        service: "",
        sales: "",
        discount: "",
        amount: "",
        date: "", // Initialize date field
    };

    const [commissionData, setCommissionData] = useState<Commission>(initialCommissionData);

    // Fetch employees and commission data
    useEffect(() => {
        // Fetch employees from localStorage or API
        const storedEmployees = JSON.parse(localStorage.getItem("employees") || "[]");
        setEmployees(storedEmployees);

        // Fetch the commission to edit
        const storedCommissions = JSON.parse(localStorage.getItem("commissions") || "[]");
        const commissionToEdit = storedCommissions.find((comm: Commission) => comm.id === id);
        if (commissionToEdit) {
            setCommission(commissionToEdit);
            setCommissionData(commissionToEdit);
        }
    }, [id]);

    // Handle form input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setCommissionData((prev) => ({
            ...prev,
            [name]: value,
        }));

        // Recalculate commission amount if sales or discount changes
        if (name === "sales" || name === "discount") {
            const sales = parseFloat(name === "sales" ? value : commissionData.sales);
            const discount = parseFloat(name === "discount" ? value : commissionData.discount);
            const employee = employees.find((emp) => emp.id === commissionData.employeeId);
            if (employee) {
                const commissionAmount = (sales - discount) * (employee.commission_rate / 100);
                setCommissionData((prev) => ({
                    ...prev,
                    amount: commissionAmount.toFixed(2),
                }));
            }
        }
    };

    // Handle employee selection change
    const handleEmployeeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const employeeId = e.target.value;
        const selectedEmployee = employees.find((emp) => emp.id === employeeId);
        if (selectedEmployee) {
            setCommissionData((prev) => ({
                ...prev,
                employeeId,
                employeeName: `${selectedEmployee.firstName} ${selectedEmployee.lastName}`,
            }));

            // Recalculate commission amount
            const sales = parseFloat(commissionData.sales);
            const discount = parseFloat(commissionData.discount);
            const commissionAmount = (sales - discount) * (selectedEmployee.commission_rate / 100);
            setCommissionData((prev) => ({
                ...prev,
                amount: commissionAmount.toFixed(2),
            }));
        }
    };

    // Handle form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validate date field
        if (!commissionData.date) {
            setError("Date is required."); // Set error message
            return; // Skip submission if date is empty
        }

        // Clear any previous errors
        setError(null);

        // Update the commission in localStorage
        const storedCommissions = JSON.parse(localStorage.getItem("commissions") || "[]");
        const updatedCommissions = storedCommissions.map((comm: Commission) =>
            comm.id === id ? commissionData : comm
        );
        localStorage.setItem("commissions", JSON.stringify(updatedCommissions));

        // Navigate back to the commissions list
        navigate("/commissions");
    };

    if (!commission) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Header />
            <Sidemenu />
            <div className="main-content app-content">
                <div className="container-fluid">
                    <Breadcrumb
                        title="Edit Commission"
                        links={[{ text: "Commissions", link: "/commissions" }]}
                        active="Edit Commission"
                    />

                    <div className="grid grid-cols-12 gap-x-6">
                        <div className="xxl:col-span-12 col-span-12">
                            <div className="box overflow-hidden main-content-card">
                                <div className="box-body p-5">
                                    <form onSubmit={handleSubmit}>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {/* Employee Selection */}
                                            <div>
                                                <label className="block font-medium mb-1" htmlFor="employeeId">Employee</label>
                                                <select
                                                    id="employeeId"
                                                    name="employeeId"
                                                    value={commissionData.employeeId}
                                                    onChange={handleEmployeeChange}
                                                    className="ti-form-input rounded-sm"
                                                >
                                                    <option value="">Select Employee</option>
                                                    {employees.map((emp) => (
                                                        <option key={emp.id} value={emp.id}>
                                                            {emp.firstName} {emp.lastName} (Rate: {emp.commission_rate}%)
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>

                                            {/* Customer Name */}
                                            <div>
                                                <label className="block font-medium mb-1" htmlFor="customerName">Customer Name</label>
                                                <input
                                                    type="text"
                                                    id="customerName"
                                                    name="customerName"
                                                    value={commissionData.customerName}
                                                    onChange={handleChange}
                                                    className="ti-form-input rounded-sm"
                                                    placeholder="Enter Customer Name"
                                                />
                                            </div>

                                            {/* Service */}
                                            <div>
                                                <label className="block font-medium mb-1" htmlFor="service">Service</label>
                                                <input
                                                    type="text"
                                                    id="service"
                                                    name="service"
                                                    value={commissionData.service}
                                                    onChange={handleChange}
                                                    className="ti-form-input rounded-sm"
                                                    placeholder="Enter Service Provided"
                                                />
                                            </div>

                                            {/* Sales Amount */}
                                            <div>
                                                <label className="block font-medium mb-1" htmlFor="sales">Sales Amount</label>
                                                <input
                                                    type="number"
                                                    id="sales"
                                                    name="sales"
                                                    value={commissionData.sales}
                                                    onChange={handleChange}
                                                    className="ti-form-input rounded-sm"
                                                    placeholder="Enter Sales Amount"
                                                />
                                            </div>

                                            {/* Discount */}
                                            <div>
                                                <label className="block font-medium mb-1" htmlFor="discount">Discount</label>
                                                <input
                                                    type="number"
                                                    id="discount"
                                                    name="discount"
                                                    value={commissionData.discount}
                                                    onChange={handleChange}
                                                    className="ti-form-input rounded-sm"
                                                    placeholder="Enter Discount (if any)"
                                                />
                                            </div>

                                            {/* Commission Amount (Auto-calculated) */}
                                            <div>
                                                <label className="block font-medium mb-1" htmlFor="amount">Commission Amount</label>
                                                <input
                                                    type="text"
                                                    id="amount"
                                                    name="amount"
                                                    value={commissionData.amount}
                                                    readOnly
                                                    className="ti-form-input rounded-sm bg-gray-200 cursor-not-allowed"
                                                />
                                            </div>

                                            {/* Date */}
                                            <div>
                                                <label className="block font-medium mb-1" htmlFor="date">Date</label>
                                                <input
                                                    type="date"
                                                    id="date"
                                                    name="date"
                                                    value={commissionData.date}
                                                    onChange={handleChange}
                                                    className="ti-form-input rounded-sm"
                                                />
                                                {error && <p className="text-red-500 text-sm mt-1">{error}</p>} {/* Display error message */}
                                            </div>
                                        </div>

                                        {/* Buttons */}
                                        <div className="mt-4 flex justify-end gap-4">
                                            <button
                                                type="reset"
                                                className="bg-gray-300 px-4 py-2 rounded"
                                                onClick={() => setCommissionData(initialCommissionData)}
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

export default Edit;