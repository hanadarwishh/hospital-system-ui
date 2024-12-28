import React, { useState } from "react";
import "./Signup.css";
import doctor1 from "../../assets/images/doctor.png";
import doctor2 from "../../assets/images/doctor2.png";
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook

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

  // Handle form submission

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate(); // Initialize navigate function

  const handleChange = (e) => {
    // const { name, value } = e.target;

    const { name, value } = e.target;
    setDoctorData((prev) => ({ ...prev, [name]: value }));
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    try {
      const response = await fetch("http://localhost:8080/v1/doctors", {
        // Replace with your API URL
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(doctorData),
      });

      if (!response.ok) {
        throw new Error("Failed to post doctor data");
      }

      const data = await response.json();
      setResponseMessage(`Doctor added successfully: ${data}`);
      setDoctorData({ FirstName: "", LastName: "" }); // Reset form fields
      setError("");
      navigate();
    } catch (err) {
      setError(err.message);
      console.log(err.message);
      setResponseMessage("");
    }

    e.preventDefault();
    console.log("Form submitted", formData);
  };

  return (
    <div className="sign-up-container">
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
              name="firstName"
              placeholder="First Name"
              value={doctorData.firstName}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={doctorData.lastName}
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
              value={formData.confirmPassword}
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
