import React, { useState } from "react";
import "./Signup.css";
import doctor1 from "../../assets/images/doctor.png";
import doctor2 from "../../assets/images/doctor2.png";
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SignUp() {
  const [userData, setUserData] = useState({
    role: "doctor",
    FirstName: "",
    LastName: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    specialization: "", // Only for doctors
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRoleChange = (e) => {
    const { value } = e.target;
    setUserData((prev) => ({
      ...prev,
      role: value,
      specialization: value === "doctor" ? prev.specialization : "",
      FirstName: value === "doctor" ? prev.FirstName : "",
      LastName: value === "doctor" ? prev.LastName : "",
      firstName: value !== "doctor" ? prev.firstName : "",
      lastName: value !== "doctor" ? prev.lastName : "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let apiUrl = "";
      let payload = { ...userData };

      if (userData.role === "doctor") {
        apiUrl =
          "https://hospital-management-system-production-17a9.up.railway.app/api/doctors";
        delete payload.firstName;
        delete payload.lastName;
      } else {
        apiUrl =
          userData.role === "patient"
            ? "https://hospital-management-system-production-17a9.up.railway.app/api/Patients"
            : "https://hospital-management-system-production-17a9.up.railway.app/api/nurse";
        delete payload.FirstName;
        delete payload.LastName;
        delete payload.specialization;
      }

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message || "Failed to sign up");
        throw new Error(errorData.message || "Failed to sign up");
      }

      const data = await response.json();
      toast.success("Signup successful!");
      navigate("/dashboard");

      // Save user data to localStorage based on role
      localStorage.setItem(
        userData.role,
        JSON.stringify({ ...data, role: userData.role })
      );

      setUserData({
        role: "doctor",
        FirstName: "",
        LastName: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        specialization: "",
      });
      if (userData.role == "nurse") {
        navigate("/nurse-info");
      }
      if (userData.role == "patient") {
        navigate("/patient-dashboard");
      }
    } catch (err) {
      toast.error(err.message);
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
            {userData.role === "doctor" ? (
              <>
                <input
                  type="text"
                  name="FirstName"
                  placeholder="First Name"
                  value={userData.FirstName}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  name="LastName"
                  placeholder="Last Name"
                  value={userData.LastName}
                  onChange={handleChange}
                  required
                />
              </>
            ) : (
              <>
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={userData.firstName}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={userData.lastName}
                  onChange={handleChange}
                  required
                />
              </>
            )}
          </div>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={userData.email}
            onChange={handleChange}
            required
            className="full-width-input"
          />
          <div className="signup-row">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={userData.password}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              required
            />
          </div>

          <div className="signup-row">
            <select
              name="role"
              value={userData.role}
              onChange={handleRoleChange}
              required
              className="role-select"
            >
              <option value="doctor">Doctor</option>
              <option value="patient">Patient</option>
              <option value="nurse">Nurse</option>
            </select>
            {userData.role === "doctor" && (
              <input
                type="text"
                name="specialization"
                placeholder="Specialization"
                value={userData.specialization}
                onChange={handleChange}
                required
              />
            )}
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
          <a href="/login" className="log-in">
            Log in
          </a>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
