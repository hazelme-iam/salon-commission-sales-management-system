import Breadcrumb from "../components/breadcrumbs";
import Header from "../layouts/header";
import Sidemenu from "../layouts/sidemenu";
import SalesGraph from "../components/SalesGraph";
import MonthlySales from "../components/Sales/MonthlySales";
import DailySalesSummary from "../components/Sales/DailySalesSummary";
import WeeklySales from "../components/Sales/WeeklySales";


function Dashboard() {
    return (
        <>
            {/* Header */}
            <Header />

            {/* Side Menu */}
            <Sidemenu />

            {/* Main Content */}
            <div className="main-content app-content ml-64 p-6 bg-gray-100 min-h-screen">
                <div className="container-fluid">
                    {/* Breadcrumb */}
                    <Breadcrumb
                        title="Dashboard"
                        links={[
                            { text: "Dashboard", link: "/" },
                        ]}
                    />

                    {/* Grid Layout for Dashboard Components */}
                    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                        {/* Sales Graph */}
                        <div className="col-span-1 md:col-span-1 lg:col-span-1">
                            <DailySalesSummary />
                        </div>
                        <div className="col-span-1 md:col-span-1 lg:col-span-1">
                            <WeeklySales />
                        </div>
                        <div className="col-span-1 md:col-span-1 lg:col-span-1">
                            <MonthlySales />
                        </div>
                        <div className="col-span-1 md:col-span-2 lg:col-span-3">
                            <SalesGraph />
                        </div>

                        

                    
                      
                     
                    </div>
                </div>
            </div>
        </>
    );
}

export default Dashboard;