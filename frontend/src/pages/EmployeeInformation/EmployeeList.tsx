import React, { useEffect, useRef, useState } from "react";
import { Grid, html } from "gridjs";
import "gridjs/dist/theme/mermaid.css";
import Breadcrumb from "../../components/breadcrumbs";
import Header from "../../layouts/header";
import Sidemenu from "../../layouts/sidemenu";
import Profile from "../../assets/avatar.png";
import { Link } from "react-router-dom";

const Employee_List: React.FC = () => {
    const gridRef = useRef<HTMLDivElement>(null);
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await fetch("http://localhost:8000/employees/");
                const data = await response.json();
                setEmployees(data);
            } catch (error) {
                console.error("Error fetching employees:", error);
            }
        };

        fetchEmployees();
    }, []);

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
                                    <img src="${Profile}" alt="Avatar" class="w-8 h-8 rounded-full" />
                                    <span>${row.cells[1].data}</span>
                                </div>
                            `),
                    },
                    { name: "First Name", width: "150px" },
                    { name: "Last Name", width: "150px" },
                    { name: "Contact No.", width: "150px" },
                    { name: "Role", width: "150px" },
                    { name: "Commission Rate", width: "220px" },
                    { name: "Shift Schedule", width: "200px" },
                    { name: "Emergency Contact", width: "200px" },
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
                            ["001","Ann", "Edubas", "09345781324", "Nail Technician", "10%", "Monday","09743156248"],
                            ["002","Bianca", "Quiñones", "097631452780", "Hair Treatment Expert", "10%", "Monday","09524301274"],
                            ["003","Twella", "Sabella", "09457216501", "Nail Technician", "10%", "Tuesday","09421304528"],
                            ["004","Angelie", "Silvano", "09363154224", "Hair Treatment Expert", "10%", "Tuesday","09732467588"],
                            ["005","Roanne", "Olape", "09201347524", "Glutathione Specialist", "10%", "Wednesday","09724150748"],
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
                        links={[{ text: "Dashboard", link: "/" }]}
                        active="Employee"
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
