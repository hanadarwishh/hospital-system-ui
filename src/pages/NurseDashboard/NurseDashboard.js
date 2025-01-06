import React, { useEffect, useState } from "react";
import "./NurseDashboard.css";
import Sidebar from "../../components/NurseSidebar/NurseSidebar";

const NurseDashboard = () => {
  const [doctorData, setDoctorData] = useState(null);
  const [nurse, setNurse] = useState(null); // To store the nurse data
  const [loading, setLoading] = useState(true);

  const nursee = JSON.parse(localStorage.getItem("nurse")); // Assume you store the nurse ID in localStorage
  const nurseId = nursee.id;
  console.log(nursee.id);

  // Fetch nurse data and doctor data
  useEffect(() => {
    const fetchNurseData = async () => {
      if (nurseId) {
        try {
          const nurseResponse = await fetch(
            `https://hospital-management-system-production-17a9.up.railway.app/api/nurse/${nurseId}`
          );
          if (nurseResponse.ok) {
            const nurseData = await nurseResponse.json();
            setNurse(nurseData); // Store the fetched nurse data in the state
            setLoading(false); // Stop loading once nurse data is fetched
            if (nurseData.assignedDr) {
              fetchDoctorData(nurseData.assignedDr); // Fetch doctor data if assignedDr exists
            }
          } else {
            console.error("Error fetching nurse data.");
            setLoading(false); // Stop loading even if there is an error
          }
        } catch (error) {
          console.error("Failed to fetch nurse data:", error);
          setLoading(false); // Stop loading on error
        }
      }
    };

    const fetchDoctorData = async (assignedDrId) => {
      try {
        const response = await fetch(
          `https://hospital-management-system-production-17a9.up.railway.app/api/doctors/${assignedDrId}`
        );
        if (response.ok) {
          const doctorData = await response.json();
          setDoctorData(doctorData); // Set doctor data in state
        } else {
          console.error("Error fetching doctor data.");
        }
      } catch (error) {
        console.error("Failed to fetch doctor data:", error);
      }
    };

    fetchNurseData();
  }, [nurseId]); // Re-run the effect when nurseId changes

  // Check if nurse exists and get the name
  const nurseName = nurse ? `${nurse.firstName} ${nurse.lastName}` : "Nurse";

  const profilePicture = nurse
    ? nurse.profilePicture
    : "https://via.placeholder.com/150"; // fallback image

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        {/* Top section with nurse info */}
        <div className="top-container">
          <div className="nurse-info">
            <img
              src={profilePicture}
              alt="Nurse Profile"
              className="profile-pic"
            />
            <h1 className="welcome-text">
              Welcome, <span style={{ color: "blue" }}>Nurse</span>{" "}
              <span style={{ color: "blue" }}>{nurseName}</span>
            </h1>
          </div>
        </div>

        {/* Notification Section */}
        <div className="notification-container">
          <div className="glass-card-notification">
            <h1 className="notification-text">Notifications</h1>
            {/* Check if assignedDr exists and show notification accordingly */}
            {doctorData && nurse.assignedDr ? (
              <div className="notification-item">
                <img
                  src={
                    doctorData.profilePicture ||
                    "https://via.placeholder.com/50"
                  } // Smaller image
                  alt="Doctor Profile"
                  className="doctor-profile-pic-sm" // Updated class for smaller size
                />
                <div className="notification-details">
                  <h2>
                    Dr. {doctorData.FirstName} {doctorData.LastName}
                  </h2>
                  <p>
                    Your assigned doctor is now available. Please proceed with
                    the tasks accordingly.
                  </p>
                </div>
              </div>
            ) : (
              <div className="no-assigned-doctor">
                <p>No assigned doctor. Please check your assignments.</p>
              </div>
            )}
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
              {/* Render loading skeleton for appointment rows */}
              {loading ? (
                <tr>
                  <td>Loading...</td>
                  <td>Loading...</td>
                  <td>Loading...</td>
                  <td>Loading...</td>
                </tr>
              ) : (
                <tr>
                  <td>John Doe</td>
                  <td>Fever</td>
                  <td>01/25</td>
                  <td>Pending</td>
                </tr>
              )}
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

export default NurseDashboard;
