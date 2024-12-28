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
          className="sidebar-link"
          activeClassName="active-link"
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/schedule"
          className="sidebar-link"
          activeClassName="active-link"
        >
          Schedule
        </NavLink>
        <NavLink
          to="/appointment"
          className="sidebar-link"
          activeClassName="active-link"
        >
          Appointment
        </NavLink>
        {/* <NavLink
          to="/dashboard"
          className="sidebar-link"
          activeClassName="active-link"
        >
          Dashboard
        </NavLink> */}
      </nav>
    </div>
  );
};

export default Sidebar;
