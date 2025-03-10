import React from 'react';
import '../Sales.css'; // Make sure to import the CSS file

function SalesSummary() {
  return (
    <div className="app">
      <div className="card">
        <div className="icon">
          <i className="fa fa-briefcase"></i>
        </div>
        <div className="info">
          <h2>Bookings</h2>
          <h1>281</h1>
          <p className="percentage green">+55% than last week</p>
        </div>
      </div>
      <div className="card">
        <div className="icon">
          <i className="fa fa-chart-bar"></i>
        </div>
        <div className="info">
          <h2>Today's Users</h2>
          <h1>2,300</h1>
          <p className="percentage green">+3% than last month</p>
        </div>
      </div>
    </div>
  );
}

export default SalesSummary;