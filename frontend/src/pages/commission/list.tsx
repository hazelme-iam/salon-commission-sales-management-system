import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa"; // Import icons from react-icons
import Breadcrumb from "../../components/breadcrumbs";
import Header from "../../layouts/header";
import Sidemenu from "../../layouts/sidemenu";

interface Commission {
    id: string;
    employeeId: string;
    employeeName: string;
    customerName: string;
    service: string;
    sales: string;
    discount: string;
    amount: string;
    date: string;
}

function Commission_List() {
    const [commissions, setCommissions] = useState<Commission[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const storedCommissions = JSON.parse(localStorage.getItem("commissions") || "[]");
        setCommissions(storedCommissions);
    }, []);

    // Function to handle deletion of a commission
    const handleDelete = (id: string) => {
        // Confirmation dialog
        if (window.confirm("Are you sure you want to delete this commission?")) {
            const updatedCommissions = commissions.filter(comm => comm.id !== id);
            setCommissions(updatedCommissions);
            localStorage.setItem("commissions", JSON.stringify(updatedCommissions));
        }
    };

    // Function to handle updating a commission
    const handleUpdate = (id: string) => {
        navigate(`/edit?id=${id}`); // Use query parameter instead of URL parameter
    };

    return (
        <>
            <Header />
            <Sidemenu />
            <div className="main-content app-content">
                <div className="container-fluid">
                    <Breadcrumb 
                        title="Manage Commissions" 
                        links={[{ text: "Dashboard", link: "/" }]} 
                        active="Commissions"
                        buttons={
                            <Link
                                to="/commissions/create"
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center gap-2"
                            >   
                                <i className="ri-add-line"></i> Add Commission
                            </Link>
                        }
                    />

                    <div className="grid grid-cols-12 gap-x-6">
                        <div className="xxl:col-span-12 col-span-12">
                            <div className="box overflow-hidden main-content-card">
                                <div className="box-body p-5">
                                    <table className="table-auto w-full border-collapse border">
                                        <thead>
                                            <tr className="bg-gray-200">
                                                <th className="border p-2">ID</th>
                                                <th className="border p-2">Employee</th>
                                                <th className="border p-2">Customer Name</th>
                                                <th className="border p-2">Service</th>
                                                <th className="border p-2">Sales</th>
                                                <th className="border p-2">Discount</th>
                                                <th className="border p-2">Commission Amount</th>
                                                <th className="border p-2">Date</th>
                                                <th className="border p-2">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {commissions.length > 0 ? (
                                                commissions.map(comm => (
                                                    <tr key={comm.id}>
                                                        <td className="border p-2">{comm.id}</td>
                                                        <td className="border p-2">{comm.employeeName}</td>
                                                        <td className="border p-2">{comm.customerName}</td>
                                                        <td className="border p-2">{comm.service}</td>
                                                        <td className="border p-2">{comm.sales}</td>
                                                        <td className="border p-2">{comm.discount}</td>
                                                        <td className="border p-2">{comm.amount}</td>
                                                        <td className="border p-2">{comm.date}</td>
                                                        <td className="border p-2">
                                                            <div className="flex gap-2">
                                                                <button
                                                                    onClick={() => handleUpdate(comm.id)}
                                                                    className="text-blue-500 hover:text-blue-700"
                                                                    title="Edit"
                                                                >
                                                                    <FaEdit size={18} />
                                                                </button>
                                                                <button
                                                                    onClick={() => handleDelete(comm.id)}
                                                                    className="text-red-500 hover:text-red-700"
                                                                    title="Delete"
                                                                >
                                                                    <FaTrash size={18} />
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan={9} className="border p-4 text-center">No commission records found.</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Commission_List;