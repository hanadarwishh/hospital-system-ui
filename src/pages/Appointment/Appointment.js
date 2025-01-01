import React from "react";
import { useNavigate } from "react-router-dom";
import "./appointment.css";
import Sidebar from "../../components/sidebar/sidebar";

const TodaysAppointments = () => {
  const navigate = useNavigate();

  const appointments = [
    {
      id: 1,
      patientName: "John Doe",
      time: "9:00 AM",
      issue: "Fever",
    },
    {
      id: 2,
      patientName: "Jane Smith",
      time: "10:30 AM",
      issue: "Headache",
    },
    {
      id: 3,
      patientName: "Michael Johnson",
      time: "1:00 PM",
      issue: "Back Pain",
    },
    {
      id: 4,
      patientName: "Emily Davis",
      time: "2:30 PM",
      issue: "Cold",
    },
  ];

  const handleAddClick = (appointment) => {
    navigate("/patient-profile", { state: { appointment } });
  };
  const handleAppointmentClick = (appointment) => {
    navigate("/patient-profile", { state: { appointment } });
  };

  return (
    <div className="appointments-container">
      <Sidebar />
      <div className="content">
        <h1>Today's Appointments</h1>
        <div className="appointments-list">
          {appointments.map((appointment) => (
            <div
              key={appointment.id}
              onClick={() => handleAppointmentClick(appointment)}
              className="appointment-card"
            >
              <h3>{appointment.patientName}</h3>
              <p>
                <strong>Time:</strong> {appointment.time}
              </p>
              <p>
                <strong>Issue:</strong> {appointment.issue}
              </p>
              <button
                className="add-button"
                onClick={() => handleAddClick(appointment)}
              >
                + Add Prescription
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TodaysAppointments;
