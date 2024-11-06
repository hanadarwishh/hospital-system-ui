import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../NavBar/navbar.css";
import { Button } from "react-bootstrap";

function handleSignUp() {
  alert("Sign Up clicked!");
}

export default function Navbar() {
  const [activeLink, setActiveLink] = useState("home");

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  return (
    <nav className="navbar">
      <div id="RightNav">
        <h1
          style={{
            display: "inline",
            marginRight: "2px",
            fontSize: "17.8px",
            lineHeight: "70px",
            color: "#4200FF",
          }}
        >
          Hospital
        </h1>

        <h1
          style={{
            display: "inline",
            marginRight: "90px",
            fontSize: "17.8px",
          }}
        >
          logo
        </h1>

        <Link
          to="/home"
          className={activeLink === "home" ? "active" : ""}
          onClick={() => handleLinkClick("home")}
        >
          Home
        </Link>
        <Link
          to="/patient"
          className={activeLink === "patient" ? "active" : ""}
          onClick={() => handleLinkClick("patient")}
        >
          Patient
        </Link>
        <Link
          to="/doctor"
          className={activeLink === "doctor" ? "active" : ""}
          onClick={() => handleLinkClick("doctor")}
        >
          Doctor
        </Link>
        <Link
          to="/"
          className={activeLink === "" ? "active" : ""}
          onClick={() => handleLinkClick("")}
        >
          Contact Us
        </Link>
        <Button
          onClick={handleSignUp}
          style={{
            marginLeft: "300px",
            padding: "3px 26px",
            fontSize: "12px",
            color: "#FFFFFF",
            backgroundColor: "#4200FF",
          }}
        >
          Sign In
        </Button>

        <Button
          onClick={handleSignUp}
          style={{
            marginLeft: "50px",
            padding: "3px 26px",
            fontSize: "12px",
            color: "#4200FF",
            backgroundColor: "FFFFFF",
          }}
          className="outline-button"
        >
          Sign Up
        </Button>
      </div>
    </nav>
  );
}
