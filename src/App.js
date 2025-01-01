import React from "react";
import { Routes, Route, useLocation } from "react-router-dom"; // Import necessary components
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/NavBar/Navbar";
import Home from "./pages/Home/Home";
import Patient from "./pages/Patient/Patient";
import Doctor from "./pages/Doctor/Doctor";
import Dashboard from "./pages/DoctorDashboard/DoctorDashboard";
import Footer from "./components/Footer/Footer.js";
import Schedule from "./pages/Schedule/Schedule.js";
import Appointment from "./pages/Appointment/Appointment.js";
import MyProfile from "./pages/MyProfile/MyProfile.js";
import AddSchedule from "./pages/AddSchedule/AddSchedule.js";
import AddPrescription from "./pages/AddPrescription/AddPrescription.js";
import PatientProfile from "./pages/PatientProfile/PatientProfile.js";
function App() {
  const location = useLocation(); // Get the current location

  // Define routes where the navbar should be hidden
  const hideNavbarRoutes = [
    "/dashboard",
    "/appointment",
    "/schedule",
    "/myprofile",
    "/add-prescription",
    "/patient-profile",
  ];

  const hideFooterRoutes = [
    "/dashboard",
    "/appointment",
    "/schedule",
    "/myprofile",
    "/add-prescription",
    "/patient-profile",
  ];

  return (
    <div>
      {/* Conditionally render Navbar */}
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/patient" element={<Patient />} />
        <Route path="/doctor" element={<Doctor />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/myprofile" element={<MyProfile />} />
        <Route path="/addSchedule" element={<AddSchedule />} />
        <Route path="/add-prescription" element={<AddPrescription />} />
        <Route path="/patient-profile" element={<PatientProfile />} />
      </Routes>
      {!hideFooterRoutes.includes(location.pathname) && <Footer />}
    </div>
  );
}

export default App;
