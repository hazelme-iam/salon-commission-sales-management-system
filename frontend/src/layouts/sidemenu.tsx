import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaTachometerAlt, FaUserTie, FaDollarSign, FaFileAlt, FaSignOutAlt } from "react-icons/fa";
import salon from '../assets/salon.jpg';

const Sidemenu: React.FC = () => {
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleDropdownToggle = (category: string) => {
        setOpenDropdown(prev => (prev === category ? null : category));
    };

    const handleLogout = () => {
        localStorage.removeItem("authUser");
        navigate('/login');
    };

    return (
        <aside className="bg-white shadow-2xl w-64 h-screen p-4 fixed border-r border-gray-200">
            {/* Logo */}
            <div className="flex flex-col items-center mb-8">
                <img src={salon} alt="Salon Logo" className="rounded-full shadow-lg w-24 h-24 mb-3 border-2 border-gray-300" />
                <h2 className="text-xl font-bold text-gray-800">Salon Management</h2>
                <p className="text-sm text-gray-500">--------------------------</p>
            </div>

            {/* Navigation */}
            <nav className="space-y-2">
                {/* Dashboard */}
                <div className="group">
                    <Link to="/" className="flex items-center gap-3 p-3 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-all duration-200">
                        <FaTachometerAlt className="w-5 h-5" />
                        <span>Dashboard</span>
                    </Link>
                </div>

                {/* Employee Management */}
                <div className="group">
                    <div
                        className="flex items-center justify-between p-3 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-all duration-200 cursor-pointer"
                        onClick={() => handleDropdownToggle('employee')}
                    >
                        <span className="flex items-center gap-3">
                            <FaUserTie className="w-5 h-5" />
                            Employee Management
                        </span>
                        <span className="text-sm">{openDropdown === 'employee' ? '▲' : '▼'}</span>
                    </div>
                    {openDropdown === 'employee' && (
                        <motion.ul
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            className="pl-6 space-y-1 mt-1"
                        >
                            <li>
                                <Link to="/employees" className="block p-2 rounded-md text-black hover:bg-gray-100 transition-all duration-200">
                                    Manage Employees
                                </Link>
                            </li>
                        </motion.ul>
                    )}
                </div>

                {/* Commission & Sales */}
                <div className="group">
                    <div
                        className="flex items-center justify-between p-3 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-all duration-200 cursor-pointer"
                        onClick={() => handleDropdownToggle('commission')}
                    >
                        <span className="flex items-center gap-3">
                            <FaDollarSign className="w-5 h-5" />
                            Commission & Sales
                        </span>
                        <span className="text-sm">{openDropdown === 'commission' ? '▲' : '▼'}</span>
                    </div>
                    {openDropdown === 'commission' && (
                        <motion.ul
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            className="pl-6 space-y-1 mt-1"
                        >
                            <li>
                                <Link to="/commissions" className="block p-2 rounded-md text-black hover:bg-gray-100 transition-all duration-200">
                                    Add Commissions
                                </Link>
                            </li>
                            <li>
                                <Link to="/viewsalary" className="block p-2 rounded-md text-black hover:bg-gray-100 transition-all duration-200">
                                    View Salary
                                </Link>
                            </li>
                        </motion.ul>
                    )}
                </div>

                {/* Reports */}
                <div className="group">
                    <div
                        className="flex items-center justify-between p-3 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-all duration-200 cursor-pointer"
                        onClick={() => handleDropdownToggle('reports')}
                    >
                        <span className="flex items-center gap-3">
                            <FaFileAlt className="w-5 h-5" />
                            Reports & Export
                        </span>
                        <span className="text-sm">{openDropdown === 'reports' ? '▲' : '▼'}</span>
                    </div>
                    {openDropdown === 'reports' && (
                        <motion.ul
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            className="pl-6 space-y-1 mt-1"
                        >
                            <li>
                                <Link to="/reports" className="block p-2 rounded-md text-black hover:bg-gray-100 transition-all duration-200">
                                    Employee Commission & Sales
                                </Link>
                            </li>
                            <li>
                                <Link to="/monthlyreports" className="block p-2 rounded-md text-black hover:bg-gray-100 transition-all duration-200">
                                    Monthly Revenue & Sales
                                </Link>
                            </li>
                            <li>
                                <Link to="/weeklyreports" className="block p-2 rounded-md text-black hover:bg-gray-100 transition-all duration-200">
                                    Weekly Revenue & Sales
                                </Link>
                            </li>
                            <li>
                                <Link to="/todayreports" className="block p-2 rounded-md text-black hover:bg-gray-100 transition-all duration-200">
                                    Revenue & Sales
                                </Link>
                            </li>
                        </motion.ul>
                    )}
                </div>

                {/* Logout */}
                <div className="mt-8">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 p-3 w-full text-red-500 hover:text-red-600 hover:bg-gray-100 rounded-lg transition-all duration-200"
                    >
                        <FaSignOutAlt className="w-5 h-5" />
                        <span>Log Out</span>
                    </button>
                </div>
            </nav>
        </aside>
    );
};

export default Sidemenu;