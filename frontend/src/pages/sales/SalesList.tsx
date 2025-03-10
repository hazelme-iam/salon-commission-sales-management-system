import React, { useEffect, useRef } from "react";
import { Grid, html } from "gridjs";
import "gridjs/dist/theme/mermaid.css";
import Breadcrumb from "../../components/breadcrumbs";
import Header from "../../layouts/header";
import Sidemenu from "../../layouts/sidemenu";

import Profile from "../../assets/avatar.png";
import { Link } from 'react-router-dom';

const Student_List: React.FC = () => {
    const gridRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (gridRef.current) {
            new Grid({
                columns: [
                    { name: "#", width: "10px" },
                    {
                        name: "Student ID",
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
                    { name: "Student Name", width: "150px" },
                    { name: "Student Course", width: "150px" },
                    { name: "Contact No.", width: "100px" },
                    {
                        name: "Actions",
                        width: "70px",
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
                        ["20231748", "Pia Sarzuelo ", "Information Technology", "09816990040"],
                        ["20231289", "Twella sabella", "Information Technology", "09123456789"],
                        ["20231784", "Hazel Nandong", "Information Technology", "09058854913"],
                        ["20230312", "Angelie Silvano", "Information Technology", "09123674309"],
                        ["20230103", "Cherry Valenton", "BSED AP", "09675386701"],
                        ["20230127", "Jeanelyn Mistas", "Midwifery", "090516427030"],
                        ["20230121", "Andrew Sumalinog", "BSBA", "09127845879"],
                        ["20230362", "Daphnie Padrigalan", "Information Technology", "09348695248"],
                        ["20230987", "Jezreel Bahian", "Engineering", "09143574532"],
                        ["20231346", "Edmar Yare", "Bped", "09785769342"],
                        ["20234573", "Cris Ocate", "Midwifey", "09236587945"],
                        ["20230457", "James Omamos", "BSBA", "09567834561"],
                        ["2023213", "Cheryll Sevilla", "Criminology", "09658934565"],
                        ["20233461", "Kim Magayon", "Information Technology", "09653759259"],
                        ["20234521", "Roanne Olape", "BSBA", "09165784391"],
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
                        title="Manage Students"
                        links={[
                            { text: "Dashboard", link: "/students" },
                        ]}
                        active="Students"
                        buttons={
                            <Link to="/student/create" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center gap-2">
                                <i className="ri-add-line"></i> Add New Student
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

export default Student_List;