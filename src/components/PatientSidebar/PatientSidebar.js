import React from "react";
import { useNavigate } from "react-router-dom";
import "./PatientSidebar.css"; // Add styles if needed

const Sidebar = ({ activeView, onViewChange }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.clear(); // Clear session storage
    navigate("/home"); // Redirect to home or login
  };

  const handleMyProfile = async () => {
    navigate("/my-patient-profile");
  };
  const handleDashboard = async () => {
    navigate("/patient-dashboard");
  };
  const handlePrescription = async () => {
    navigate("/patient-prescription");
  };
  const handlePatientAppointment = async () => {
    navigate("/patient-appointment");
  };

  return (
    <div className="sidebar">
      <h2>Medical Care</h2>
      <ul>
        <li
          className={activeView === "dashboard" ? "active" : ""}
          onClick={handleDashboard}
        >
          Dashboard
        </li>
        <li
          className={activeView === "appointments" ? "active" : ""}
          onClick={handlePatientAppointment}
        >
          Appointments
        </li>
        <li
          className={activeView === "profile" ? "active" : ""}
          onClick={handleMyProfile}
        >
          Profile
        </li>
        <li
          className={activeView === "prescriptions" ? "active" : ""}
          onClick={handlePrescription}
        >
          Prescription
        </li>
        <li onClick={handleLogout}>Logout</li>
      </ul>
    </div>
  );
};

export default Sidebar;
