import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignIn.css"; // Import a separate CSS file for styling the sign-in page
import doctor1 from "../../assets/images/doctor.png";

function SignIn() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/doctors/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }

      const data = await response.json();
      localStorage.setItem("doctor", JSON.stringify(data)); // Store the logged-in doctor data in local storage
      navigate("/dashboard"); // Redirect to dashboard after successful login
    } catch (err) {
      setError(err.message); // Display the error message
    }
  };

  return (
    <div className="sign-in-container">
      <div className="sign-in-blue-container">
        <img className="sign-in-image" src={doctor1} alt={"Doctor 1"} />
      </div>
      <div className="sign-in-form">
        <h1 className="sign-in-title">Log In</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={loginData.email}
            onChange={handleChange}
            required
            className="full-width-input"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={loginData.password}
            onChange={handleChange}
            required
            className="full-width-input"
          />
          {error && <div className="error-message">{error}</div>}
          <button type="submit">Log In</button>
        </form>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <h1 className="sign-in-signup">Don't have an account?</h1>
          <a href="/signup" className="sign-up">
            Sign Up
          </a>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
