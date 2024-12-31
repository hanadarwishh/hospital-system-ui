import React, { useState } from "react";
import "./appointment.css";
import Sidebar from "../../components/sidebar/sidebar";
const TodaysAppointments = () => {
  const [showAddPrescriptionModal, setShowAddPrescriptionModal] =
    useState(false);

  const handleAddClick = () => {
    setShowAddPrescriptionModal(true);
  };

  const handleCloseModal = () => {
    setShowAddPrescriptionModal(false);
  };

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
  ];

  return (
    <div className="appointments-container">
      <Sidebar />
      <div className="content">
        <div className="header">
          <h1>Today's Appointments</h1>
          <button className="add-button" onClick={handleAddClick}>
            + Add Prescription
          </button>
        </div>
        <div className="appointments-list">
          {appointments.map((appointment) => (
            <div key={appointment.id} className="appointment-card">
              <h3>{appointment.patientName}</h3>
              <p>
                <strong>Time:</strong> {appointment.time}
              </p>
              <p>
                <strong>Issue:</strong> {appointment.issue}
              </p>
            </div>
          ))}
        </div>
      </div>
      {showAddPrescriptionModal && (
        <div
          className="modal-overlay"
          onClick={(e) =>
            e.target.className === "modal-overlay" && handleCloseModal()
          }
        >
          <div className="modal">
            <button className="close-button" onClick={handleCloseModal}>
              X
            </button>
            <h2>Add Prescription</h2>
            <form>
              <label>
                Medication:
                <input type="text" name="medication" required />
              </label>
              <label>
                Dosage:
                <input type="text" name="dosage" required />
              </label>
              <label>
                Instructions:
                <textarea name="instructions" required></textarea>
              </label>
              <button type="submit" className="submit-button">
                Save
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodaysAppointments;
