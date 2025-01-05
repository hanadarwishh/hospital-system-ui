import React, { useState } from "react";
import "./Signup.css";
import doctor1 from "../../assets/images/doctor.png";
import doctor2 from "../../assets/images/doctor2.png";
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SignUp() {
  const [doctorData, setDoctorData] = useState({
    LastName: "",
    password: "",
    email: "",
    FirstName: "",
    specialization: "",
  });
  const [responseMessage, setResponseMessage] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDoctorData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://hospital-management-system-production-17a9.up.railway.app/api/doctors",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(doctorData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json(); // Parse error details from response
        const message = errorData.message;
        if (errorData.statusCode === 409) {
          toast.error(message);
          console.log("here2");
        }
        toast.error(error.message);

        throw new Error(errorData.message || "Failed to post doctor data");
      }

      const data = await response.json();
      setResponseMessage(`Doctor added successfully: ${data}`);
      console.log(responseMessage);
      localStorage.setItem("doctor", JSON.stringify(data)); // Storing in local storage
      // console.log(data);
      setDoctorData({
        LastName: "",
        password: "",
        email: "",
        FirstName: "",
        specialization: "",
      }); // Reset all fields
      setError("");
      navigate("/dashboard"); // Replace "/dashboard" with your desired route
    } catch (err) {
      console.log("this" + err.message);
      setError(err.message);
      console.log("here");

      // console.log(responseMessage);
      // console.log(error);
      console.error("Submission Error:", err.message);
      setResponseMessage("");
    }
  };

  return (
    <div className="sign-up-container">
      <ToastContainer />
      <div className="sign-up-blue-container">
        <img className="sign-up-image" src={doctor1} alt="Doctor 1" />
        <img className="sign-up-image2" src={doctor2} alt="Doctor 2" />
      </div>
      <div className="sign-up-form">
        <h1 className="sign-up-title">Sign up for an account</h1>
        <form onSubmit={handleSubmit}>
          <div className="signup-row">
            <input
              type="text"
              name="FirstName"
              placeholder="First Name"
              value={doctorData.FirstName}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="LastName"
              placeholder="Last Name"
              value={doctorData.LastName}
              onChange={handleChange}
              required
            />
          </div>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={doctorData.email}
            onChange={handleChange}
            required
            className="full-width-input"
          />
          <div className="signup-row">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={doctorData.password}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              // value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <div className="terms">
            <label>
              <input type="checkbox" required />
              <span className="terms-text">I accept all </span>
              <span className="terms-text-blue">terms and conditions</span>
            </label>
          </div>

          <button type="submit">Sign Up</button>
        </form>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <h1 className="sign-up-signin">Already have an account?</h1>
          <a href className="log-in">
            {" "}
            Log in
          </a>
        </div>
        {/* <p>
          Already have an account?{" "}
          <a href="/login" className="log-in" style={{ color: "blue" }}>
            Log in
          </a>
        </p> */}
      </div>
    </div>
  );
}

export default SignUp;
