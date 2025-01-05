import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./AddPrescription.css";
import {
  FaPills,
  FaClipboard,
  FaCalendarAlt,
  FaInfoCircle,
  FaHourglass,
} from "react-icons/fa";

const AddPrescription = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { appointment } = state || {};
  const doctor = JSON.parse(localStorage.getItem("doctor"));
  const drId = doctor.id;

  const [prescriptionData, setPrescriptionData] = useState({
    medication: "",
    dosage: "",
    daysPerWeek: "",
    instructions: "",
    duration: "",
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
      patientId: appointment.patientId,
      drId: drId,
      ...prescriptionData,
    };

    try {
      const response = await fetch(
        "https://hospital-management-system-production-17a9.up.railway.app/api/doctors/prescription",
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
            <FaClipboard className="icon-prescription" />
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
            <FaHourglass className="icon-prescription" />
            Duration:
          </label>
          <input
            type="text"
            name="duration"
            value={prescriptionData.duration}
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
