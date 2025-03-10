import React, { useEffect, useRef } from "react";
import { Grid, html } from "gridjs";
import "gridjs/dist/theme/mermaid.css";
import Breadcrumb from "../../components/breadcrumbs";
import Header from "../../layouts/header";
import Sidemenu from "../../layouts/sidemenu";

import Profile from "../../assets/avatar.png";
import { Link } from 'react-router-dom';

const Customer_List: React.FC = () => {
    const gridRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (gridRef.current) {
            new Grid({
                columns: [
                    { name: "#", width: "10px" },
                    {
                        name: "Customer Name",
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
                    { name: "Email", width: "200px" },
                    { name: "Company", width: "150px" },
                    { name: "Credit", width: "100px" },
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
                        ["John Doe", "johndoe@example.com", "Acme Corp", "$500"],
                        ["Jane Smith", "janesmith@example.com", "TechSoft", "$700"],
                        ["Mark Brown", "markbrown@example.com", "Innovate Inc", "$1000"],
                        ["Alice Johnson", "alicej@example.com", "NextGen Solutions", "$1200"],
                        ["Robert White", "robertw@example.com", "SoftServe", "$800"],
                        ["Emily Davis", "emilyd@example.com", "CloudTech", "$950"],
                        ["Michael Lee", "michaell@example.com", "FinCorp", "$1100"],
                        ["Sarah Kim", "sarahk@example.com", "WebWorks", "$600"],
                        ["William Harris", "williamh@example.com", "MediaHub", "$1300"],
                        ["Olivia Martinez", "oliviam@example.com", "Visionary LLC", "$400"],
                        ["David Wilson", "davidw@example.com", "EcoBuild", "$750"],
                        ["Sophia Thomas", "sophiat@example.com", "CyberSecure", "$1400"],
                        ["Daniel Moore", "danielm@example.com", "GreenTech", "$500"],
                        ["Mia Scott", "mias@example.com", "Smart Solutions", "$670"],
                        ["James Taylor", "jamest@example.com", "ByteCode", "$1500"],
                        ["Isabella Clark", "isabellac@example.com", "LogicWorks", "$900"],
                        ["Benjamin Lewis", "benjaminl@example.com", "QuantumSoft", "$560"],
                        ["Charlotte Young", "charlottey@example.com", "CodeCrafters", "$780"],
                        ["Henry Walker", "henryw@example.com", "SmartData", "$430"],
                        ["Ava Hall", "avah@example.com", "SecureNet", "$860"],
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
                        title="Manage Customers"
                        links={[
                            { text: "Dashboard", link: "/customers" },
                        ]}
                        active="Customers"
                        buttons={
                            <Link to="/customer/create" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center gap-2">
                                <i className="ri-add-line"></i> Add New Customer
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

export default Customer_List;