import React, { useEffect, useRef } from "react";
import { Grid, html } from "gridjs";
import "gridjs/dist/theme/mermaid.css";
import Breadcrumb from "../../components/breadcrumbs";
import Header from "../../layouts/header";
import Sidemenu from "../../layouts/sidemenu";

import Profile from "../../assets/avatar.png";
import { Link } from 'react-router-dom';

const Employee_List: React.FC = () => {
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
                    { name: "Employee Name", width: "150px" },
                    { name: "Company", width: "150px" },
                    { name: "Contact No.", width: "100px" },
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
                    ...[
                        ["001", "Yoon Jeonghan", "Banila Co.", "09143143143"],
                        ["002", "Pranpriya Manobal", "Penshoppe", "09276394729"],
                        ["003", "Jasperjane Mariano", "Aurora Publishing Co.", "09101639523"],
                        ["004", "Jung Hoseok", "Louis Vuitton", "09374865913"],
                        ["005", "Solene Villafuerte", "Cebu Pacific Air", "09123456789"],
                        ["006", "Viceral", "ABS-CBN Network", "09875643981"],
                        ["007", "Riven Sandoeval", "BDO bank", "09649261058"],
                        ["008", "Ysabeau", "H&M", "09936021783"],
                        ["009", "Dreixtein", "Uniqlo", "09365185724"],
                        ["010", "Elijah Montefalco", "Starbucks", "096743871085"],
                        ["011", "Cairo Marasigan", "8cuts JolliBurger", "09457632895"],
                        ["012", "Josua Hong", " Polo Ralph Lauren", "09754978230"],
                        ["013", "Miguel Ramirez", "San Miguel", "09563871934"],
                        ["014", "Maximo Santos", "CEPALACO", "09750348726"],
                        ["015", "Dionisio", "PLDT Inc.", "095643875406"],
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
                        title="Manage Employee"
                        links={[
                            { text: "Dashboard", link: "/employee" },
                        ]}
                        active="Employee"
                        buttons={
                            <Link to="/employee/create" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center gap-2">
                                <i className="ri-add-line"></i> Add New Employee
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

export default Employee_List;