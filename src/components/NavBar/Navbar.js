import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../NavBar/navbar.css";
import SignUp from "../../pages/Signup/Signup";
import SignIn from "../../pages/SignIn/SignIn"; // Assuming you have the SignIn component
import { Button } from "react-bootstrap";

function Navbar() {
  const [showSignUp, setShowSignUp] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);

  const handleSignInClick = () => {
    setShowSignIn(true); // Show the Sign In modal
  };

  const handleSignUpClick = () => {
    setShowSignUp(true); // Show the Sign Up modal
  };

  const handleCloseSignUp = () => {
    setShowSignUp(false); // Close Sign Up modal
  };

  const handleCloseSignIn = () => {
    setShowSignIn(false); // Close Sign In modal
  };

  const [activeLink, setActiveLink] = useState("home");

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  const handleOverlayClick = (e) => {
    if (e.target.className === "sign-up-overlay") {
      handleCloseSignUp(); // Close Sign Up modal if overlay is clicked
      handleCloseSignIn(); // Close Sign In modal if overlay is clicked
    }
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
          onClick={handleSignInClick}
          style={{
            marginLeft: "300px",
            padding: "3px 26px",
            fontSize: "12px",
            color: "#FFFFFF",
            backgroundColor: "#4200FF",
            zIndex: 100,
          }}
        >
          Sign In
        </Button>

        <Button
          onClick={handleSignUpClick}
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

      {showSignUp && (
        <div className="sign-up-overlay" onClick={handleOverlayClick}>
          <div className="sign-up-modal">
            <button onClick={handleCloseSignUp} className="close-button">
              {/* X */}
            </button>
            <SignUp />
          </div>
        </div>
      )}

      {showSignIn && (
        <div className="sign-up-overlay" onClick={handleOverlayClick}>
          <div className="sign-up-modal">
            <button onClick={handleCloseSignIn} className="close-button">
              {/* X */}
            </button>
            <SignIn />
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
