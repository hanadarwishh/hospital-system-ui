import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Patient = () => {
  const { state } = useLocation();
  const { appointment } = state || {};
  const navigate = useNavigate();

  const [prescription, setPrescription] = useState(
    appointment?.prescription || null
  );

  const handleEditPrescription = () => {
    navigate("/add-prescription", { state: { appointment } });
  };

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "50px auto",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "10px",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <img
          src="https://via.placeholder.com/150"
          alt="Patient Profile"
          style={{ borderRadius: "50%", width: "150px", height: "150px" }}
        />
        <h1>{appointment?.patientName}</h1>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <h2>Prescription</h2>
        {prescription ? (
          <div
            style={{
              border: "1px solid #007bff",
              padding: "15px",
              borderRadius: "10px",
              backgroundColor: "#f9f9f9",
            }}
          >
            <p>
              <strong>Medication:</strong> {prescription.medication}
            </p>
            <p>
              <strong>Dosage:</strong> {prescription.dosage}
            </p>
            <p>
              <strong>Days Per Week:</strong> {prescription.daysPerWeek}
            </p>
            <p>
              <strong>Instructions:</strong> {prescription.instructions}
            </p>
          </div>
        ) : (
          <p>No prescription added yet.</p>
        )}
      </div>

      <button
        onClick={handleEditPrescription}
        style={{
          backgroundColor: "#007bff",
          color: "white",
          fontSize: "16px",
          padding: "10px 20px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        {prescription ? "Edit Prescription" : "Add Prescription"}
      </button>
    </div>
  );
};

export default Patient;
