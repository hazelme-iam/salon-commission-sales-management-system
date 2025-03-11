import Breadcrumb from "../components/breadcrumbs";
import Header from "../layouts/header";
import Sidemenu from "../layouts/sidemenu";
import SalesGraph from "../components/SalesGraph";
import CommissionOverview from "../components/CommissionOverview";
import EmployeeStats from "../components/EmployeeStats";
import DailySalesSummary from "../components/DailySalesSummary";
import WeeklySales from "../components/WeeklySales";
import MonthlySales from "../components/MonthlySales";
function Dashboard() {
    return (
        <>  
            <Header />
            <Sidemenu />
            <div className="main-content app-content">
                <div className="container-fluid">
            <Breadcrumb />
                    
                                            <div className="ml-64 p-6 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                                    
                         {/* Sales Summary */}
                        <div className="col-span-1 md:col-span-4">
                            <SalesGraph />
                        </div>
                     
                                    {/* Employee Stats */}
                                    <DailySalesSummary />
                                    <WeeklySales />
                                    <MonthlySales />
                    

                                    

                    </div>
        </div>
    </div>
        </>
    );
}

export default Dashboard;
