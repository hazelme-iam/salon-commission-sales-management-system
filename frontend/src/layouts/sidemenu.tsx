import salon from '../assets/salon.jpg';
import { Link } from 'react-router-dom';

function Sidemenu() {
    return (
        <>
            <aside className="app-sidebar bg-pink-100 text-purple-700 h-screen shadow-md w-64 fixed">
                <div className="main-sidebar-header bg-pink-100 py-4 text-center">
                    <a href="/" className="holder-logo"></a>
                </div>
                
                {/* Scrollable Sidebar */}
                <div className="main-sidebar px-4 py-2 overflow-y-auto h-full scrollbar-hide" id="sidebar-scroll">
                    <nav className="main-menu-container nav nav-pills flex-col sub-open">
                        <ul className="main-menu">
                            <li>
                                <a href="">
                                    <center>
                                        <img src={salon} alt="Salon Logo" className="rounded-full shadow-md" style={{ maxHeight: '120px' }} />
                                    </center>
                                </a>
                            </li>
                            <li><hr className="mt-3 border-purple-400" /></li>

                            <li className="slide__category text-lg font-bold text-purple-800">Overview</li>
                            <li className="slide">
                                <Link to="/" className="side-menu__item flex items-center gap-2 py-2 px-3 rounded-lg hover:bg-pink-300 transition">
                                    <i className="w-6 h-4 side-menu__icon bi bi-speedometer"></i>
                                    <span className="side-menu__label">Dashboard</span>
                                </Link>
                            </li>

                            <li className="slide__category text-lg font-bold text-purple-800">Employee Management</li>
                            <li className="slide">
                                <Link to='/employees' className="side-menu__item flex items-center gap-2 py-2 px-3 rounded-lg hover:bg-pink-300 transition">
                                    <i className="w-6 h-4 side-menu__icon bi bi-people-fill"></i>
                                    <span className="side-menu__label">Manage Employees</span>
                                </Link>
                            </li>

                            <li className="slide__category text-lg font-bold text-purple-800">Commission & Sales</li>
                            <li className="slide">
                                <Link to='/commissions' className="side-menu__item flex items-center gap-2 py-2 px-3 rounded-lg hover:bg-pink-300 transition">
                                    <i className="w-6 h-4 side-menu__icon bi bi-info-lg"></i>
                                    <span className="side-menu__label">Add Commissions</span>
                                </Link>
                            </li>
                            <li className="slide">
                                <Link to='/viewsalary' className="side-menu__item flex items-center gap-2 py-2 px-3 rounded-lg hover:bg-pink-300 transition">
                                    <i className="w-6 h-4 side-menu__icon bi bi-currency-dollar"></i>
                                    <span className="side-menu__label">View Salary</span>
                                </Link>
                            </li>

                            <li className="slide__category text-lg font-bold text-purple-800">Reports & Export</li>
                            <li className="slide">
                                <Link to='/reports' className="side-menu__item flex items-center gap-2 py-2 px-3 rounded-lg hover:bg-pink-300 transition">
                                    <i className="w-6 h-4 side-menu__icon bi bi-envelope-paper-fill"></i>
                                    <span className="side-menu_label">Employee Commission & Sales</span>
                                </Link>
                            </li>
                            <li className="slide">
                                <Link to='/monthlyreports' className="side-menu__item flex items-center gap-2 py-2 px-3 rounded-lg hover:bg-pink-300 transition">
                                    <i className="w-6 h-4 side-menu__icon bi bi-envelope-paper-fill"></i>
                                    <span className="side-menu_label">Month Revenue & Sales</span>
                                </Link>
                            </li>
                            <li className="slide">
                                <Link to='/weeklyreports' className="side-menu__item flex items-center gap-2 py-2 px-3 rounded-lg hover:bg-pink-300 transition">
                                    <i className="w-6 h-4 side-menu__icon bi bi-envelope-paper-fill"></i>
                                    <span className="side-menu_label">Week Revenue & Sales</span>
                                </Link>
                            </li>
                            <li className="slide">
                                <Link to='/todayreports' className="side-menu__item flex items-center gap-2 py-2 px-3 rounded-lg hover:bg-pink-300 transition">
                                    <i className="w-6 h-4 side-menu__icon bi bi-envelope-paper-fill"></i>
                                    <span className="side-menu_label">Today's Revenue & Sales</span>
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </aside>
        </>
    );
}

export default Sidemenu;
