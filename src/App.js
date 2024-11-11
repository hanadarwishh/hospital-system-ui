// import logo from "./logo.svg";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Import the necessary components
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/NavBar/Navbar";
import Home from "./pages/Home/Home";
import Patient from "./pages/Patient/Patient";
import Doctor from "./pages/Doctor/Doctor";
import Footer from "./components/Footer/Footer.js";

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/patient" element={<Patient />} />
          <Route path="/doctor" element={<Doctor />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
