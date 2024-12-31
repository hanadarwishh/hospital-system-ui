import React from "react";
import "./DoctorDashboard.css";
import Sidebar from "../../components/sidebar/sidebar";
import StarRating from "../../components/StarRating/StarRating";

const Dashboard = () => {
  const doctor = JSON.parse(localStorage.getItem("doctor"));

  // Check if doctor exists and get the name
  const doctorName = doctor
    ? `${doctor.FirstName} ${doctor.LastName}`
    : "Doctor";

  const profilePicture = doctor
    ? doctor.profilePicture
    : "https://via.placeholder.com/150"; // fallback image

  // Sample appointment requests
  const appointmentRequests = [
    {
      name: "Shyam Khanna",
      disease: "Heart Disease",
      date: "01/27",
      approved: true,
    },
    {
      name: "Jean Lee Lin",
      disease: "Heart Disease",
      date: "01/27",
      approved: false,
    },
    {
      name: "Clara Brook",
      disease: "Heart Disease",
      date: "01/27",
      approved: true,
    },
  ];

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        {/* Top section with doctor info */}
        <div className="top-container">
          <div className="doctor-info">
            <img
              src={profilePicture}
              alt="Doctor Profile"
              className="profile-pic"
            />
            <h1 className="welcome-text">
              Welcome, <span style={{ color: "blue" }}>Dr.</span>{" "}
              <span style={{ color: "blue" }}>{doctorName}</span>
            </h1>
          </div>
        </div>

        {/* Rating Section */}
        <div className="rating-container">
          <div className="glass-card-rating">
            <h1 className="rating-text">Rating</h1>
            <StarRating rating={doctor?.rating || 4.5} className="stars" />
          </div>
        </div>

        {/* Appointment Requests Section */}
        <div className="appointment-requests-container">
          <h2 className="appointment-title">Appointment Requests</h2>
          <table className="appointment-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Disease</th>
                <th>Date</th>
                <th>Approval</th>
              </tr>
            </thead>
            <tbody>
              {appointmentRequests.map((appointment, index) => (
                <tr key={index}>
                  <td>{appointment.name}</td>
                  <td>{appointment.disease}</td>
                  <td>{appointment.date}</td>
                  <td>
                    {appointment.approved ? (
                      <span className="approved approval-icon">&#10003;</span>
                    ) : (
                      <span className="rejected approval-icon">&#10007;</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="see-more">
            <a href="#">See more</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
