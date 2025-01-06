import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // To handle navigation
import "./DoctorDashboard.css";
import Sidebar from "../../components/sidebar/sidebar";
import StarRating from "../../components/StarRating/StarRating";

const Dashboard = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook for navigation
  const doctor = JSON.parse(localStorage.getItem("doctor"));
  const [appointments, setAppointments] = useState([]);
  const [nurse, setNurse] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [patients, setPatients] = useState({}); // Store patient details by patientId

  const doctorId = doctor?.id;

  // Fetch appointments, doctor and nurse details
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch(
          `https://hospital-management-system-production-17a9.up.railway.app/api/appointments/dr/${doctorId}`
        );
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setAppointments(data);

          // Fetch patient details for each appointment
          data.forEach((appointment) => {
            if (appointment.patientId) {
              fetchPatientDetails(appointment.patientId);
            }
          });
        } else {
          console.error("Failed to fetch appointments.");
        }
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    const fetchPatientDetails = async (patientId) => {
      try {
        const patientResponse = await fetch(
          `https://hospital-management-system-production-17a9.up.railway.app/api/Patients/${patientId}`
        );
        if (patientResponse.ok) {
          const patientData = await patientResponse.json();
          setPatients((prevPatients) => ({
            ...prevPatients,
            [patientId]: patientData,
          }));
        } else {
          console.error("Failed to fetch patient details.");
        }
      } catch (error) {
        console.error("Error fetching patient details:", error);
      }
    };

    const fetchDoctorAndNurseDetails = async () => {
      try {
        // Fetch doctor details
        const doctorResponse = await fetch(
          `https://hospital-management-system-production-17a9.up.railway.app/api/doctors/${doctorId}`
        );
        if (doctorResponse.ok) {
          const doctorData = await doctorResponse.json();
          const assignedNurseId = doctorData.assignedNurse;

          if (assignedNurseId) {
            // Fetch nurse details using the assignedNurseId
            const nurseResponse = await fetch(
              `https://hospital-management-system-production-17a9.up.railway.app/api/nurse/${assignedNurseId}`
            );
            if (nurseResponse.ok) {
              const nurseData = await nurseResponse.json();
              setNurse(nurseData);
            } else {
              console.error("Failed to fetch nurse details.");
            }
          }
        } else {
          console.error("Failed to fetch doctor details.");
        }
      } catch (error) {
        console.error("Error fetching doctor or nurse details:", error);
      }
    };

    if (doctorId) {
      fetchAppointments();
      fetchDoctorAndNurseDetails();
    }
  }, [doctorId]);

  // Check if doctor exists and get the name
  const doctorName = doctor
    ? `${doctor.FirstName} ${doctor.LastName}`
    : "Doctor";

  const profilePicture = doctor
    ? doctor.profilePicture
    : "https://via.placeholder.com/150"; // fallback image

  // Toggle modal visibility
  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  // Handle See More click (Navigate to appointments page)
  const handleSeeMoreClick = () => {
    navigate("/appointment"); // Assuming you have an '/appointments' page to show more appointments
  };

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
          <h2 className="appointment-title">Upcoming Appointments</h2>
          <table className="appointment-table">
            <thead>
              <tr>
                <th>Patient Name</th>
                <th>Disease</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {appointments.slice(0, 5).map((appointment, index) => {
                const patient = patients[appointment.patientId];

                const patientName = patient
                  ? `${patient.firstName} ${patient.lastName}`
                  : "Unknown Patient";

                return (
                  <tr key={index}>
                    <td>{patientName}</td>
                    <td>{appointment.issue}</td>
                    <td>{appointment.date}</td>
                    <td>
                      {/* Display different status icons */}
                      {appointment.status === "approved" ? (
                        <span className="approved approval-icon">&#10003;</span> // Green Check
                      ) : appointment.status === undefined ||
                        appointment.status === null ? (
                        <span className="pending approval-icon">&#x21BB;</span> // Clock (Pending)
                      ) : (
                        <span className="rejected approval-icon">&#10007;</span> // Red Cross
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="see-more">
            <a href="#" onClick={handleSeeMoreClick}>
              See more
            </a>
          </div>
        </div>

        {/* Enhanced Assigned Nurse Section */}
        <div className="assigned-nurse-container">
          <h2 className="nurse-title">Assigned Nurse</h2>
          {nurse ? (
            <div className="nurse-card">
              <div className="nurse-header">
                <div className="nurse-picture">
                  <img
                    src={
                      nurse.profilePicture || "https://via.placeholder.com/150"
                    }
                    alt="Nurse"
                    className="nurse-pic"
                    onClick={toggleModal} // Open modal on click
                  />
                </div>
                <div className="nurse-info">
                  <p className="nurse-name" onClick={toggleModal}>
                    {nurse.firstName} {nurse.lastName}
                  </p>
                  <p className="nurse-specialty">{nurse.specialty}</p>
                </div>
              </div>
              <div className="nurse-details">
                <p>
                  <strong>Email:</strong> {nurse.email}
                </p>
                <p>
                  <strong>Phone:</strong> {nurse.phone}
                </p>
              </div>
            </div>
          ) : (
            <p>No nurse assigned yet.</p>
          )}
        </div>

        {/* Modal for Nurse Details */}
        {modalOpen && nurse && (
          <div className="modal-overlay" onClick={toggleModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="nurse-modal-header">
                <h2>
                  {nurse.firstName} {nurse.lastName}
                </h2>
                <button className="close-modal" onClick={toggleModal}>
                  &times;
                </button>
              </div>
              <div className="nurse-modal-body">
                <img
                  src={
                    nurse.profilePicture || "https://via.placeholder.com/150"
                  }
                  alt="Nurse"
                  className="nurse-pic-modal"
                />
                <p>
                  <strong>Email:</strong> {nurse.email}
                </p>
                <p>
                  <strong>Phone:</strong> {nurse.phone}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
