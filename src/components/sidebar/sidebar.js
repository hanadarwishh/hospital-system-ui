import React from "react";
import { NavLink } from "react-router-dom"; // Use NavLink for active links
import "./sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Menu</h2>
      <nav className="sidebar-nav">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `sidebar-link ${isActive ? "active" : ""}`
          }
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/schedule"
          className={({ isActive }) =>
            `sidebar-link ${isActive ? "active" : ""}`
          }
        >
          Schedule
        </NavLink>
        <NavLink
          to="/appointment"
          className={({ isActive }) =>
            `sidebar-link ${isActive ? "active" : ""}`
          }
        >
          Appointment
        </NavLink>
        <NavLink
          to="/myprofile"
          className={({ isActive }) =>
            `sidebar-link ${isActive ? "active" : ""}`
          }
        >
          My Profile
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
