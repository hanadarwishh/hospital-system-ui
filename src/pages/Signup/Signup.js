// SignUp.js
import React, { useState } from "react";
import "./Signup.css";
import doctor1 from "../../assets/images/doctor.png";
import Image from "../../components/Image.js";

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
    // Add your form submission logic here
    console.log("Form submitted", formData);
  };

  return (
    <div className="sign-up-container">
      <div className="sign-up-blue-container">
        <Image className="sign-up-image" src={doctor1}></Image>
      </div>
    </div>

    // <div className="sign-up-container">
    //     <div className="sign-up-blue-container">
    //     <div className="sign-up-image">
    //     <img src={doctor1} alt="Doctors" style={{ width: "100%" }} />
    //   </div>
    //     </div>

    //   <div className="sign-up-form">
    //     <h2>Sign up for an account</h2>

    //     <form onSubmit={handleSubmit}>
    //       <div className="signup-row">
    //         <input
    //           type="text"
    //           name="firstName"
    //           placeholder="First Name"
    //           value={formData.firstName}
    //           onChange={handleChange}
    //           required
    //         />
    //         <input
    //           type="text"
    //           name="lastName"
    //           placeholder="Last Name"
    //           value={formData.lastName}
    //           onChange={handleChange}
    //           required
    //         />
    //       </div>

    //       <input
    //         type="email"
    //         name="email"
    //         placeholder="Email Address"
    //         value={formData.email}
    //         onChange={handleChange}
    //         required
    //       />
    //       <div className="signup-row">
    //         <input
    //           type="password"
    //           name="password"
    //           placeholder="Password"
    //           value={formData.password}
    //           onChange={handleChange}
    //           required
    //         />
    //         <input
    //           type="password"
    //           name="confirmPassword"
    //           placeholder="Confirm Password"
    //           value={formData.confirmPassword}
    //           onChange={handleChange}
    //           required
    //         />
    //       </div>

    //       <div className="terms">
    //         <input type="checkbox" required />
    //         <label>I accept all terms and conditions</label>
    //       </div>
    //       <button type="submit">Sign Up</button>
    //     </form>
    //     <p>
    //       Already have an account? <a href="/login">Log in</a>
    //     </p>
    //   </div>
  );
}

export default SignUp;
