import React, { useEffect, useRef } from "react";
import { Grid, html } from "gridjs";
import "gridjs/dist/theme/mermaid.css";
import Breadcrumb from "../../components/breadcrumbs";
import Header from "../../layouts/header";
import Sidemenu from "../../layouts/sidemenu";
import Profile from "../../assets/avatar.png";
import { Link } from "react-router-dom";

const Report_List: React.FC = () => {
    const gridRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!gridRef.current) return;

        new Grid({
            columns: [
                { name: "#", width: "10px" },
                {
                    name: "Employee Name",
                    width: "200px",
                    formatter: (_, row) =>
                        html(`
                            <div class="flex items-center gap-3">
                                <img src="${Profile}" alt="Avatar" class="w-8 h-8 rounded-full" />
                                <span>${row.cells[1].data}</span>
                            </div>
                        `),
                },
                { name: "Customer Name", width: "200px" },
                { name: "Service", width: "200px" },
                { name: "Sales", width: "200px" },
                { name: "Commission", width: "200px" },
                { name: "Date", width: "200px" },
                {
                    name: "Actions",
                    width: "80px",
                    formatter: () =>
                        html(`
                            <div class="flex justify-center gap-2">
                                <button class="bg-yellow-500 text-white px-2 py-1 rounded text-xs flex items-center">
                                    <i class="ri-pencil-line mr-1"></i>
                                    <span class="px-1">Edit</span>
                                </button>
                                <button class="bg-red-500 text-white px-2 py-1 rounded text-xs flex items-center">
                                    <i class="ri-delete-bin-line mr-1"></i>
                                    <span class="px-1">Delete</span>
                                </button>
                            </div>
                        `),
                },
            ],
            pagination: { limit: 10 },
            search: true,
            sort: true,
            data: [
                ["John Doe", "Jane Smith", "Haircut", "$50", "$10", "March 14, 2025"],
                ["Alice Brown", "Tom White", "Coloring", "$70", "$15", "March 13, 2025"],
            ].map((row, index) => [(index + 1) + ".", ...row]),
        }).render(gridRef.current);
    }, []);

    return (
        <>
            <Header />
            <Sidemenu />
            <div className="main-content app-content">
                <div className="container-fluid">
                    <Breadcrumb
                        title="Report Generation"
                        links={[{ text: "Dashboard", link: "/" }]}
                        active="Report Generation"
                        buttons={
                            <Link to="/report/create" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center gap-2">
                                <i className="bi bi-printer-fill"></i> Print
                            </Link>
                        }
                    />
                    <div className="grid grid-cols-12 gap-x-6">
                        <div className="xxl:col-span-12 col-span-12">
                            <div className="box overflow-hidden main-content-card">
                                <div className="box-body p-5">
                                    <div ref={gridRef}></div> {/* Grid.js Table Here */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Report_List;
