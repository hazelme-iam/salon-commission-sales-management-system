import React, { useEffect, useState, useMemo } from "react";
import { useReactTable, getCoreRowModel, flexRender, getPaginationRowModel } from "@tanstack/react-table";
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
    const [filter, setFilter] = useState<string>("all"); // State for filter
    const navigate = useNavigate();

    // Fetch commissions data from localStorage
    useEffect(() => {
        const storedCommissions = JSON.parse(localStorage.getItem("commissions") || "[]");
        setCommissions(storedCommissions);
    }, []);

    // Handle delete
    const handleDelete = (id: string) => {
        if (window.confirm("Are you sure you want to delete this commission?")) {
            setCommissions((prevCommissions) => {
                const updatedCommissions = prevCommissions.filter((comm) => comm.id !== id);
                localStorage.setItem("commissions", JSON.stringify(updatedCommissions)); // Sync with localStorage
                return updatedCommissions;
            });
        }
    };

    // Handle update
    const handleUpdate = (id: string) => {
        navigate(`/edit?id=${id}`);
    };

    // Filter commissions based on the selected time period
    const filteredCommissions = useMemo(() => {
        const currentDate = new Date();
        switch (filter) {
            case "this-day":
                return commissions.filter((comm) => {
                    const commissionDate = new Date(comm.date);
                    return (
                        commissionDate.getDate() === currentDate.getDate() &&
                        commissionDate.getMonth() === currentDate.getMonth() &&
                        commissionDate.getFullYear() === currentDate.getFullYear()
                    );
                });
            case "this-week":
                const startOfWeek = new Date(currentDate);
                startOfWeek.setDate(currentDate.getDate() - currentDate.getDay()); // Start of the week (Sunday)
                const endOfWeek = new Date(currentDate);
                endOfWeek.setDate(currentDate.getDate() + (6 - currentDate.getDay())); // End of the week (Saturday)
                return commissions.filter((comm) => {
                    const commissionDate = new Date(comm.date);
                    return commissionDate >= startOfWeek && commissionDate <= endOfWeek;
                });
            case "this-month":
                return commissions.filter((comm) => {
                    const commissionDate = new Date(comm.date);
                    return (
                        commissionDate.getMonth() === currentDate.getMonth() &&
                        commissionDate.getFullYear() === currentDate.getFullYear()
                    );
                });
            default:
                return commissions; // Return all commissions
        }
    }, [commissions, filter]);

    // Table columns
    const columns = useMemo(
        () => [
            { header: "ID", accessorKey: "id" },
            { header: "Employee", accessorKey: "employeeName" },
            { header: "Customer Name", accessorKey: "customerName" },
            { header: "Service", accessorKey: "service" },
            { header: "Sales", accessorKey: "sales" },
            { header: "Discount", accessorKey: "discount" },
            { header: "Commission Amount", accessorKey: "amount" },
            { header: "Date", accessorKey: "date" },
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

    // React Table instance
    const table = useReactTable({
        data: filteredCommissions,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(), // Enable pagination
        initialState: {
            pagination: {
                pageSize: 15, // Set the number of rows per page
            },
        },
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
                                    {/* Compact Filter Dropdown */}
                                    <div className="flex items-center gap-2 mb-4">
                                        <label htmlFor="filter" className="font-medium">Filter:</label>
                                        <select
                                            id="filter"
                                            value={filter}
                                            onChange={(e) => setFilter(e.target.value)}
                                            className="border rounded-sm py-2 px-3 text-sm min-w-[150px] w-full max-w-[200px] truncate"
                                        >
                                            <option value="all">All</option>
                                            <option value="this-day">Today</option>
                                            <option value="this-week">This Week</option>
                                            <option value="this-month">This Month</option>
                                        </select>
                                    </div>

                                    {/* Table */}
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full bg-white">
                                            <thead>
                                                {table.getHeaderGroups().map((headerGroup) => (
                                                    <tr key={headerGroup.id}>
                                                        {headerGroup.headers.map((header) => (
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
                                                {table.getRowModel().rows.map((row) => (
                                                    <tr key={row.id}>
                                                        {row.getVisibleCells().map((cell) => (
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

                                    {/* Pagination Controls */}
                                    <div className="flex items-center justify-between mt-4">
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => table.previousPage()}
                                                disabled={!table.getCanPreviousPage()}
                                                className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                                            >
                                                Previous
                                            </button>
                                            <button
                                                onClick={() => table.nextPage()}
                                                disabled={!table.getCanNextPage()}
                                                className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                                            >
                                                Next
                                            </button>
                                        </div>
                                        <span className="text-sm">
                                            Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                                        </span>
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