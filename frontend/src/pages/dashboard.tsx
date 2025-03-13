import Breadcrumb from "../components/breadcrumbs";
import Header from "../layouts/header";
import Sidemenu from "../layouts/sidemenu";
import SalesGraph from "../components/SalesGraph";
import RevenueGraph from "../components/RevenueGraph";
import DailySalesSummary from "../components/Sales/DailySalesSummary";
import WeeklySales from "../components/Sales/WeeklySales";
function Dashboard() {
    return (
        <>  
            <Header />
            <Sidemenu />
            <div className="main-content app-content">
                <div className="container-fluid">
            <Breadcrumb title="Dashboard"
                        links={[
                            { text: "Dashboard", link: "/" },
                        ]}
            />
            
                    
                                            <div className="ml-64 p-6 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                                    
                         {/* Sales Summary */}
                        <div className="col-span-1 md:col-span-2">
                            <SalesGraph />
                            
                        </div>
                        <DailySalesSummary />
                        <div className="col-span-1 md:col-span-2">
                            <RevenueGraph />
                        </div>
                     
                     
                                    {/* Employee Stats */}
                                    
                                    <WeeklySales />
                    </div>
        </div>
    </div>
        </>
    );
}

export default Dashboard;
