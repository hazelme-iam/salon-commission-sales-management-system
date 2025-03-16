import React, { useEffect, useState, useMemo } from "react";
import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";
import { Link, useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
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

const Commission_List: React.FC = () => {
    const [commissions, setCommissions] = useState<Commission[]>([]);
    const navigate = useNavigate();

    // Fetch commissions data from localStorage
    const fetchCommissions = () => {
        const storedCommissions = JSON.parse(localStorage.getItem("commissions") || "[]");
        setCommissions(storedCommissions);
    };

    // Function to handle deletion of a commission
    const handleDelete = (id: string) => {
        if (window.confirm("Are you sure you want to delete this commission?")) {
            const updatedCommissions = commissions.filter(comm => comm.id !== id);
            setCommissions(updatedCommissions);
            localStorage.setItem("commissions", JSON.stringify(updatedCommissions));
        }
    };

    // Function to handle updating a commission
    const handleUpdate = (id: string) => {
        navigate(`/edit?id=${id}`);
    };

    // Initialize data on component mount
    useEffect(() => {
        fetchCommissions();
    }, []);

    // Define columns for the table
    const columns = useMemo(
        () => [
            {
                header: "ID",
                accessorKey: "id",
            },
            {
                header: "Employee",
                accessorKey: "employeeName",
            },
            {
                header: "Customer Name",
                accessorKey: "customerName",
            },
            {
                header: "Service",
                accessorKey: "service",
            },
            {
                header: "Sales",
                accessorKey: "sales",
            },
            {
                header: "Discount",
                accessorKey: "discount",
            },
            {
                header: "Commission Amount",
                accessorKey: "amount",
            },
            {
                header: "Date",
                accessorKey: "date",
            },
            {
                header: "Actions",
                cell: ({ row }: any) => (
                    <div className="flex gap-2">
                        <button
                            onClick={() => handleUpdate(row.original.id)}
                            className="text-blue-500 hover:text-blue-700"
                            title="Edit"
                        >
                            <FaEdit size={18} />
                        </button>
                        <button
                            onClick={() => handleDelete(row.original.id)}
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

    // Create a table instance
    const table = useReactTable({
        data: commissions,
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
                                    {/* TanStack Table */}
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

export default Commission_List;