import React from "react";
import "./DoctorDashboard.css";
import Sidebar from "../../components/sidebar/sidebar";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="top-container">
        <h1 className="welcome-text">Welcome Dr. Robert</h1>
      </div>
    </div>
  );
};

export default Dashboard;
