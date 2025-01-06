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
import PatientDashboard from "./pages/PatientDashboard/PatientDashboard.js";
import MyProfilePatient from "./pages/MyProfilePatient/MyProfilePatient.js";
import PatientPrescription from "./pages/PatientPrescription/PatientPrescription.js";
import PatientAppointment from "./pages/PatientAppointment/PatientAppointment.js";
import NurseInfo from "./pages/NurseInformation/NurseInfo.js";
import NurseDashboard from "./pages/NurseDashboard/NurseDashboard.js";
import NurseProfile from "./pages/NurseProfile/NurseProfile.js";
import NurseAppointments from "./pages/NurseAppointments/NurseAppointments.js";
import NurseSchedule from "./pages/NurseSchedule/NurseSchedule.js";

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
    "/patient-dashboard",
    "/my-patient-profile",
    "/patient-prescription",
    "/patient-appointment",
    "/nurse-info",
    "/nurse-dashboard",
    "/nurse-profile",
    "/nurse-appointment",
    "/nurse-schedule",
  ];

  const hideFooterRoutes = [
    "/dashboard",
    "/appointment",
    "/schedule",
    "/myprofile",
    "/add-prescription",
    "/patient-profile",
    "/patient-dashboard",
    "/my-patient-profile",
    "/patient-prescription",
    "/patient-appointment",
    "/nurse-info",
    "/nurse-dashboard",
    "/nurse-profile",
    "/nurse-appointment",
    "/nurse-schedule",
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
        <Route path="/patient-dashboard" element={<PatientDashboard />} />
        <Route path="/my-patient-profile" element={<MyProfilePatient />} />
        <Route path="/patient-prescription" element={<PatientPrescription />} />
        <Route path="/patient-appointment" element={<PatientAppointment />} />
        <Route path="/nurse-info" element={<NurseInfo />} />
        <Route path="/nurse-dashboard" element={<NurseDashboard />} />
        <Route path="/nurse-profile" element={<NurseProfile />} />
        <Route path="/nurse-appointment" element={<NurseAppointments />} />
        <Route path="/nurse-schedule" element={<NurseSchedule />} />
      </Routes>
      {!hideFooterRoutes.includes(location.pathname) && <Footer />}
    </div>
  );
}

export default App;
