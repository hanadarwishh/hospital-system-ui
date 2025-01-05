import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaPhoneAlt,
  FaGenderless,
  FaBirthdayCake,
} from "react-icons/fa";
import "./PatientProfile.css";

const PatientProfile = () => {
  const { state } = useLocation();
  const { appointment } = state || {};
  const navigate = useNavigate();

  const [prescriptions, setPrescriptions] = useState([]);
  const [patient, setPatient] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const doctor = JSON.parse(localStorage.getItem("doctor"));
  const drId = doctor.id;

  // Fetch patient data and prescriptions
  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/doctors/prescription/patient/${appointment?.patientId}`
        );
        if (response.ok) {
          const data = await response.json();
          setPrescriptions(data);
        } else {
          console.error("Failed to fetch prescriptions.");
        }
      } catch (error) {
        console.error("Error fetching prescriptions:", error);
      }
    };

    const fetchPatientData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/Patients/${appointment?.patientId}`
        );
        if (response.ok) {
          const patientData = await response.json();
          setPatient(patientData);
        } else {
          console.error("Failed to fetch patient data.");
        }
      } catch (error) {
        console.error("Error fetching patient data:", error);
      }
    };

    if (appointment?.patientId) {
      fetchPrescriptions();
      fetchPatientData();
    }
    setIsLoading(false);
  }, [appointment?.patientId]);

  // Function to render non-null values with corresponding icons
  const renderPatientInfo = (label, value, Icon) => {
    if (value) {
      return (
        <div className="patient-info-item">
          <Icon className="patient-info-icon" />
          <strong>{label}:</strong> {value}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="patient-container">
      <div className="patient-info">
        <img
          src={patient?.profilePicture || "https://via.placeholder.com/150"}
          alt="Patient Profile"
          className="patient-image"
        />
        <h1>
          {patient?.firstName} {patient?.lastName}
        </h1>
      </div>

      <div className="patient-details">
        {renderPatientInfo("Email", patient?.email, FaEnvelope)}
        {renderPatientInfo("Phone", patient?.phone, FaPhoneAlt)}
        {renderPatientInfo("Gender", patient?.gender, FaGenderless)}
        {renderPatientInfo("Age", patient?.age, FaBirthdayCake)}
      </div>

      <div className="prescriptions-section">
        <h2>Prescriptions</h2>
        {isLoading ? (
          <p>Loading prescriptions...</p>
        ) : prescriptions.length > 0 ? (
          prescriptions.map((prescription, index) => (
            <div key={index} className="prescription-card">
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
              {drId === prescription.drId && (
                <button className="btn-edit">Edit Prescription</button>
              )}
            </div>
          ))
        ) : (
          <p>No prescriptions found for this patient.</p>
        )}
      </div>

      <button
        onClick={() =>
          navigate("/add-prescription", { state: { appointment } })
        }
        className="btn-add"
      >
        Add Prescription
      </button>
    </div>
  );
};

export default PatientProfile;
