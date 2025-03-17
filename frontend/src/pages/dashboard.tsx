import Breadcrumb from "../components/breadcrumbs";
import Header from "../layouts/header";
import Sidemenu from "../layouts/sidemenu";
import SalesGraph from "../components/SalesGraph";
import RevenueGraph from "../components/RevenueGraph";
import DailySalesSummary from "../components/Sales/DailySalesSummary";
import WeeklySales from "../components/Sales/WeeklySales";
import EmployeeStats from "../components/EmployeeStats";
import MonthlySales from "../components/Sales/MonthlySales";
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

{/* Sales Summary Section */}
<MonthlySales />
<DailySalesSummary />
<WeeklySales />

{/* Full-width Sales Graphs */}
<div className="col-span-1 md:col-span-2 lg:col-span-3">
  <SalesGraph />
</div>

<div className="col-span-1 md:col-span-2 lg:col-span-3">
  <RevenueGraph />
</div>

{/* Employee Stats */}
<div className="col-span-5 md:col-span-5 lg:col-span-5"></div>
<EmployeeStats />

</div>


                    
        </div>
    </div>
        </>
    );
}

export default Dashboard;
