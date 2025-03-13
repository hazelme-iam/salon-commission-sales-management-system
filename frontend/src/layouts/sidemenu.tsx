import salon from '../assets/salon.jpg';
import { Link } from 'react-router-dom';


function Sidemenu() {

return (
<>
<aside className="app-sidebar" id="sidebar">

        <div className="main-sidebar-header">
            <a href="/" className="holder-logo"></a>
        </div>
        <div className="main-sidebar" id="sidebar-scroll">
            <nav className="main-menu-container nav nav-pills flex-col sub-open">
                <div className="slide-left" id="slide-left">
                </div>
                <ul className="main-menu">
                    <li>
                        <a href="">
                            <center>
                                <img src={salon} alt="Salon Logo" className="transparent-shadow" style={{maxHeight: '150px'}} />

                            </center>
                        </a>
                    </li>
                    <li>
                        <hr className="mt-3" />
                    </li>
                    <li className="slide">
                        <Link to="/" className="side-menu__item">
                            <i className="w-6 h-4 side-menu__icon bi bi-speedometer"></i>
                            <span className="side-menu__label">
                                Dashboard
                            </span>
                        </Link>
                    </li>
                    <li className="slide">
                        <Link to='/employees' className="side-menu__item">

                            <i className="w-6 h-4 side-menu__icon bi bi-people-fill"></i>
                            <span className="side-menu__label">
                                Manage Employee
                            </span>
                        </Link>
                        <Link to='/customers' className="side-menu__item">
                            <i className="w-6 h-4 side-menu__icon bi-info-lg"></i>
                            <span className="side-menu__label">
  Commission
                                and Sales
                            
                            </span>
                        </Link>
                    </li>
                    <li className="slide">
                        <Link to='/sales' className="side-menu__item">

                            <i className="w-6 h-4 side-menu__icon bi bi-currency-dollar"></i>
                            <span className="side-menu__label">
                                Commission Tracking
                            </span>
                        </Link>
                    </li>
                    <li className="slide">
                    </li>
                    <li className="slide">
                        <Link to='/reports' className="side-menu__item">

                            <i className="w-6 h-4 side-menu__icon bi bi-envelope-paper-fill"></i>
                            <span className="side-menu__label">
                                Report Generation
                            </span>
                        </Link>
                    </li>
                    
                </ul>
            </nav>
        </div>
    </aside>
</>
)
}

export default Sidemenu;
