import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import Breadcrumb from "../../components/breadcrumbs";
import Header from "../../layouts/header";
import Sidemenu from "../../layouts/sidemenu";
import { useNavigate } from "react-router-dom";
interface CommissionData {
    id: string;
    employeeId: string;
    employeeName: string;
    customerName: string;
    service: string;
    discount: string;
    sales: string;
    amount: string;
    date: string;
}

const initialCommissionData: CommissionData = {
    id: "",
    employeeId: "",
    employeeName: "",
    customerName: "",
    service: "",
    discount: "0",
    sales: "0",
    amount: "0",
    date: "",
};

interface Employee {
    id: string;
    firstName: string;
    lastName: string;
    commission_rate: string; // Fetch this from employee registration
}

function Commission_Registration() {
    const [commissionData, setCommissionData] = useState<CommissionData>(initialCommissionData);
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [commissionRate, setCommissionRate] = useState<number>(0); // Store selected employee's commission rate

    const navigate = useNavigate();

    useEffect(() => {
        const storedEmployees: Employee[] = JSON.parse(localStorage.getItem("employees") || "[]");
        setEmployees(storedEmployees);
    }, []);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setCommissionData({ ...commissionData, [name]: value });

        // Update commission calculation when sales input changes
        if (name === "sales") {
            const salesAmount = parseFloat(value) || 0;
            const discountAmount = parseFloat(commissionData.discount) || 0;
            const netSales = salesAmount - discountAmount;
            setCommissionData(prev => ({
                ...prev,
                amount: ((commissionRate / 100) * netSales).toFixed(2), // Calculate commission
            }));
        }

        // Handle discount updates
        if (name === "discount") {
            const discountAmount = parseFloat(value) || 0;
            const salesAmount = parseFloat(commissionData.sales) || 0;
            const netSales = salesAmount - discountAmount;
            setCommissionData(prev => ({
                ...prev,
                amount: ((commissionRate / 100) * netSales).toFixed(2),
            }));
        }
    };

    const handleEmployeeChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const selectedEmployeeId = e.target.value;
        setCommissionData({ ...commissionData, employeeId: selectedEmployeeId });

        const selectedEmployee = employees.find(emp => emp.id === selectedEmployeeId);
        if (selectedEmployee) {
            setCommissionRate(parseFloat(selectedEmployee.commission_rate)); // Set the commission rate
        }
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const commissions = JSON.parse(localStorage.getItem("commissions") || "[]");

        const selectedEmployee = employees.find(emp => emp.id === commissionData.employeeId);
        if (!selectedEmployee) return alert("Invalid Employee Selected");

        const newCommission = {
            ...commissionData,
            id: Date.now().toString(),
            employeeName: `${selectedEmployee.firstName} ${selectedEmployee.lastName}`,
            amount: ((commissionRate / 100) * (parseFloat(commissionData.sales) - parseFloat(commissionData.discount || "0"))).toFixed(2), // Ensure accurate calculation
        };

        commissions.push(newCommission);
        localStorage.setItem("commissions", JSON.stringify(commissions));

        alert("Commission Added Successfully!");
        setCommissionData(initialCommissionData);
        setCommissionRate(0);
        
        navigate("/commissions");
    };

    return (
        <>
            <Header />
            <Sidemenu />
            <div className="main-content app-content">
                <div className="container-fluid">
                    <Breadcrumb title="Commission Registration" links={[{ text: "Commission", link: "/commissions" }]} active="Register New Commission" />

                    <div className="grid grid-cols-12 gap-x-6">
                        <div className="xxl:col-span-12 col-span-12">
                            <div className="box overflow-hidden main-content-card">
                                <div className="box-body p-5">
                                    <form onSubmit={handleSubmit}>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {/* Employee Selection */}
                                            <div>
                                                <label className="block font-medium mb-1" htmlFor="employeeId">Employee</label>
                                                <select id="employeeId" name="employeeId" value={commissionData.employeeId} onChange={handleEmployeeChange} className="ti-form-input rounded-sm">
                                                    <option value="">Select Employee</option>
                                                    {employees.map(emp => (
                                                        <option key={emp.id} value={emp.id}>
                                                            {emp.firstName} {emp.lastName} (Rate: {emp.commission_rate}%)
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>

                                            {/* Customer Name */}
                                            <div>
                                                <label className="block font-medium mb-1" htmlFor="customerName">Customer Name</label>
                                                <input type="text" id="customerName" name="customerName" value={commissionData.customerName} onChange={handleChange} className="ti-form-input rounded-sm" placeholder="Enter Customer Name" />
                                            </div>

                                            {/* Service */}
                                            <div>
                                                <label className="block font-medium mb-1" htmlFor="service">Service</label>
                                                <input type="text" id="service" name="service" value={commissionData.service} onChange={handleChange} className="ti-form-input rounded-sm" placeholder="Enter Service Provided" />
                                            </div>

                                            {/* Sales Amount */}
                                            <div>
                                                <label className="block font-medium mb-1" htmlFor="sales">Sales Amount</label>
                                                <input type="number" id="sales" name="sales" value={commissionData.sales} onChange={handleChange} className="ti-form-input rounded-sm" placeholder="Enter Sales Amount" />
                                            </div>

                                            {/* Discount */}
                                            <div>
                                                <label className="block font-medium mb-1" htmlFor="discount">Discount</label>
                                                <input type="number" id="discount" name="discount" value={commissionData.discount} onChange={handleChange} className="ti-form-input rounded-sm" placeholder="Enter Discount (if any)" />
                                            </div>

                                            {/* Commission Amount (Auto-calculated) */}
                                            <div>
                                                <label className="block font-medium mb-1" htmlFor="amount">Commission Amount</label>
                                                <input type="text" id="amount" name="amount" value={commissionData.amount} readOnly className="ti-form-input rounded-sm bg-gray-200 cursor-not-allowed" />
                                            </div>

                                            {/* Date */}
                                            <div>
                                                <label className="block font-medium mb-1" htmlFor="date">Date</label>
                                                <input type="date" id="date" name="date" value={commissionData.date} onChange={handleChange} className="ti-form-input rounded-sm" />
                                            </div>
                                        </div>

                                        {/* Buttons */}
                                        <div className="mt-4 flex justify-end gap-4">
                                            <button type="reset" className="bg-gray-300 px-4 py-2 rounded" onClick={() => setCommissionData(initialCommissionData)}>Reset</button>
                                            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Submit Record</button>
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