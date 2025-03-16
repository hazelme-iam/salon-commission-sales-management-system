import React, { useEffect, useState, useMemo } from "react";
import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";
import { Link, useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import Breadcrumb from "../../components/breadcrumbs";
import Header from "../../layouts/header";
import Sidemenu from "../../layouts/sidemenu";

// Define types
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

const Employee_List: React.FC = () => {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const navigate = useNavigate();

    // Fetch employees from localStorage
    useEffect(() => {
        const storedEmployees = JSON.parse(localStorage.getItem("employees") || "[]");
        setEmployees(storedEmployees);
    }, []);

    // ✅ Fixed: Use a functional update to delete
    const deleteEmployee = (id: string) => {
        if (window.confirm("Are you sure you want to delete this employee?")) {
            setEmployees(prevEmployees => {
                const updatedEmployees = prevEmployees.filter(emp => emp.id !== id);
                localStorage.setItem("employees", JSON.stringify(updatedEmployees)); // Sync with localStorage
                return updatedEmployees;
            });
        }
    };

    const updateEmployee = (id: string) => {
        navigate(`/editemployee/${id}`);
    };

    // Define columns
    const columns = useMemo(
        () => [
            { header: "ID", accessorKey: "id" },
            { header: "First Name", accessorKey: "firstName" },
            { header: "Last Name", accessorKey: "lastName" },
            { header: "Phone", accessorKey: "phone" },
            { header: "Role", accessorKey: "role" },
            { header: "Commission Rate", accessorKey: "commission_rate" },
            { header: "Shift Schedule", accessorKey: "shift_schedule" },
            { header: "Emergency Contact", accessorKey: "emergency_contact" },
            {
                header: "Actions",
                cell: ({ row }: any) => (
                    <div className="flex gap-2">
                        <button
                            onClick={() => updateEmployee(row.original.id)}
                            className="text-blue-500 hover:text-blue-700"
                            title="Edit"
                        >
                            <FaEdit size={18} />
                        </button>
                        <button
                            onClick={() => deleteEmployee(row.original.id)}
                            className="text-red-500 hover:text-red-700"
                            title="Delete"
                        >
                            <FaTrash size={18} />
                        </button>
                    </div>
                ),
            },
        ],
        []
    );

    const table = useReactTable({
        data: employees,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <>
            <Header />
            <Sidemenu />
            <div className="main-content app-content">
                <div className="container-fluid">
                    <Breadcrumb
                        title="Manage Employees"
                        links={[{ text: "Dashboard", link: "/" }]}
                        active="Employees"
                        buttons={
                            <Link
                                to="/employee/create"
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center gap-2"
                            >
                                <i className="ri-add-line"></i> Add New Employee
                            </Link>
                        }
                    />

                    <div className="grid grid-cols-12 gap-x-6">
                        <div className="xxl:col-span-12 col-span-12">
                            <div className="box overflow-hidden main-content-card">
                                <div className="box-body p-5">
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full bg-white">
                                            <thead>
                                                {table.getHeaderGroups().map(headerGroup => (
                                                    <tr key={headerGroup.id}>
                                                        {headerGroup.headers.map(header => (
                                                            <th
                                                                key={header.id}
                                                                className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                                                            >
                                                                {flexRender(
                                                                    header.column.columnDef.header,
                                                                    header.getContext()
                                                                )}
                                                            </th>
                                                        ))}
                                                    </tr>
                                                ))}
                                            </thead>
                                            <tbody>
                                                {table.getRowModel().rows.map(row => (
                                                    <tr key={row.id}>
                                                        {row.getVisibleCells().map(cell => (
                                                            <td
                                                                key={cell.id}
                                                                className="px-6 py-4 border-b border-gray-200"
                                                            >
                                                                {flexRender(
                                                                    cell.column.columnDef.cell,
                                                                    cell.getContext()
                                                                )}
                                                            </td>
                                                        ))}
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Employee_List;
