import React, { useEffect, useRef } from "react"; 
import { Grid, html } from "gridjs";
import "gridjs/dist/theme/mermaid.css";
import Breadcrumb from "../../components/breadcrumbs";
import Header from "../../layouts/header";
import Sidemenu from "../../layouts/sidemenu";


import Profile from "../../assets/avatar.png";
import { Link } from 'react-router-dom';

const Salary_List: React.FC = () => {
    const gridRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (gridRef.current) {
            new Grid({
                columns: [
                    { name: "#", width: "10px" },
                    {
                        name: "Employee ID",
                        width: "200px",
                        formatter: (_, row) =>
                            html(`
                                <div class="flex items-center gap-3">
                                    <img src="${Profile}"
                                        alt="Avatar" class="w-8 h-8 rounded-full" />
                                    <span>${row.cells[1].data}</span>
                                </div>
                            `),
                    },
                    { name: "Employee Name", width: "180px" },
                    { name: "Base Salary", width: "150px" },
                    { name: "Total Sales", width: "150px" },
                    { name: "Total Commission", width: "150px" },
                    { name: "Total Salary", width: "150px" },

                    {
                        name: "Actions",
                        width: "150px",
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
                    ...[
                        ["001", "Hazel Nandong", "₱5,000", "20%", "₱6,000", "March 01, 2025"],
                        ["002", "Roannne Olape", "₱4,800", "18%", "₱5,664", "March 01, 2025"],
                        ["003", "Twella Sabella", "₱5,200", "22%", "₱6,344", "March 01, 2025"],
                        ["004", "Angelie Silvano", "₱4,500", "19%", "₱5,355", "March 01, 2025"],
                        ["005", "Pia Sarzuelo", "₱5,500", "25%", "₱6,875", "March 01, 2025"]
                        
                    ].map((row, index) => [(index + 1) + ".", ...row]),
                ],
            }).render(gridRef.current);
        }
    }, []);

    return (
        <>
            <Header />
            <Sidemenu />
            <div className="main-content app-content">
                <div className="container-fluid">
                    <Breadcrumb
                        title="View Salary"
                        links={[
                            { text: "Dashboard", link: "/" },
                        ]}
                        active="View Salary"
                        buttons={
                            <Link to="/viewsalary/create" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center gap-2">
                                <i className="ri-add-line"></i> Set New Salary
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

export default Salary_List;