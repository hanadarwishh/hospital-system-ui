import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./AddPrescription.css";
import {
  FaPills,
  FaClipboard,
  FaCalendarAlt,
  FaInfoCircle,
} from "react-icons/fa";

const AddPrescription = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { appointment } = state || {};

  const [prescriptionData, setPrescriptionData] = useState({
    medication: "",
    dosage: "",
    daysPerWeek: "",
    instructions: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPrescriptionData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!appointment) {
      alert("No appointment details found!");
      return;
    }

    const requestData = {
      patientName: appointment.patientName,
      ...prescriptionData,
    };

    try {
      const response = await fetch(
        "http://localhost:8080/api/doctors/prescription",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to save prescription. Please try again.");
      }

      alert("Prescription added successfully!");
      navigate("/appointment");
    } catch (err) {
      console.error("Error adding prescription:", err.message);
      alert(err.message);
    }
  };

  return (
    <div className="prescription-container">
      <h1>
        Add Prescription for{" "}
        <span className="patient-name">{appointment?.patientName}</span>
      </h1>
      <form onSubmit={handleFormSubmit}>
        <div className="form-group-prescription">
          <label>
            <FaPills className="icon-prescription" />
            Medication:
          </label>
          <input
            type="text"
            name="medication"
            value={prescriptionData.medication}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group-prescription">
          <label>
            <FaClipboard className="icon" />
            Dosage:
          </label>
          <input
            type="text"
            name="dosage"
            value={prescriptionData.dosage}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group-prescription">
          <label>
            <FaCalendarAlt className="icon-prescription" />
            Days Per Week:
          </label>
          <input
            type="number"
            name="daysPerWeek"
            value={prescriptionData.daysPerWeek}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group-prescription">
          <label>
            <FaInfoCircle className="icon-prescription" />
            Instructions:
          </label>
          <textarea
            name="instructions"
            value={prescriptionData.instructions}
            onChange={handleInputChange}
            required
          ></textarea>
        </div>

        <button className="prescription-button" type="submit">
          Save Prescription{" "}
        </button>
      </form>
    </div>
  );
};

export default AddPrescription;
