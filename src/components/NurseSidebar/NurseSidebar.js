import React from "react";
import { NavLink } from "react-router-dom"; // Use NavLink for active links
import { useNavigate } from "react-router-dom";

import "./NurseSidebar.css";

const NurseSidebar = () => {
  const navigate = useNavigate(); // Move this inside the component

  const handleLogout = async () => {
    localStorage.clear(); // Execute the method
    navigate("/home"); // Navigate to the home page after logout
  };

  return (
    <div className="nurse-sidebar">
      <h2 className="nurse-sidebar-title">Menu</h2>
      <nav className="nurse-sidebar-nav">
        <NavLink
          to="/nurse-dashboard"
          className={({ isActive }) =>
            `sidebar-link ${isActive ? "active" : ""}`
          }
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/nurse-appointment"
          className={({ isActive }) =>
            `sidebar-link ${isActive ? "active" : ""}`
          }
        >
          Appointments
        </NavLink>

        <NavLink
          to="/nurse-schedule"
          className={({ isActive }) =>
            `sidebar-link ${isActive ? "active" : ""}`
          }
        >
          Schedule
        </NavLink>
        <NavLink
          to="/nurse-profile"
          className={({ isActive }) =>
            `sidebar-link ${isActive ? "active" : ""}`
          }
        >
          My Profile
        </NavLink>
      </nav>
      <ul>
        <li onClick={handleLogout} className="logout-button">
          Logout
        </li>
      </ul>
    </div>
  );
};

export default NurseSidebar;
