import React, { useState } from "react";
import "./Signup.css";
import doctor1 from "../../assets/images/doctor.png";
import doctor2 from "../../assets/images/doctor2.png";

function SignUp() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
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
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            className="full-width-input"
          />
          <div className="signup-row">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
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
            <input type="checkbox" required />
            <label>I accept all terms and conditions</label>
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
          <h1 className="log-in"> Log in</h1>
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
