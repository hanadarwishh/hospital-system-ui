import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaPhoneAlt,
  FaGenderless,
  FaBirthdayCake,
  FaTrashAlt, // Import the trash bin icon
} from "react-icons/fa";
import "./PatientProfile.css";

const PatientProfile = () => {
  const { state } = useLocation();
  const { appointment } = state || {};
  const navigate = useNavigate();

  const [prescriptions, setPrescriptions] = useState([]);
  const [patient, setPatient] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [editingPrescription, setEditingPrescription] = useState(null);
  const [editedMedication, setEditedMedication] = useState("");
  const [editedDosage, setEditedDosage] = useState("");
  const [editedDaysPerWeek, setEditedDaysPerWeek] = useState("");
  const [editedInstructions, setEditedInstructions] = useState("");

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
          `https://hospital-management-system-production-17a9.up.railway.app/api/Patients/${appointment?.patientId}`
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

  const handleEditPrescription = (prescription) => {
    setEditingPrescription(prescription);
    setEditedMedication(prescription.medication);
    setEditedDosage(prescription.dosage);
    setEditedDaysPerWeek(prescription.daysPerWeek);
    setEditedInstructions(prescription.instructions);
  };

  const handleSavePrescription = async () => {
    try {
      const response = await fetch(
        `https://hospital-management-system-production-17a9.up.railway.app/api/doctors/prescription/${editingPrescription.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            medication: editedMedication,
            dosage: editedDosage,
            daysPerWeek: editedDaysPerWeek,
            instructions: editedInstructions,
          }),
        }
      );
      if (response.ok) {
        const updatedPrescriptions = prescriptions.map((prescription) =>
          prescription.id === editingPrescription.id
            ? {
                ...prescription,
                medication: editedMedication,
                dosage: editedDosage,
                daysPerWeek: editedDaysPerWeek,
                instructions: editedInstructions,
              }
            : prescription
        );
        setPrescriptions(updatedPrescriptions);
        setEditingPrescription(null);
      } else {
        console.error("Failed to update prescription.");
      }
    } catch (error) {
      console.error("Error saving prescription:", error);
    }
  };

  const handleCancelEdit = () => {
    setEditingPrescription(null);
    setEditedMedication("");
    setEditedDosage("");
    setEditedDaysPerWeek("");
    setEditedInstructions("");
  };

  // Function to delete a prescription with confirmation
  const handleDeletePrescription = async (prescriptionId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this prescription?"
    );
    if (confirmDelete) {
      try {
        const response = await fetch(
          `https://hospital-management-system-production-17a9.up.railway.app/api/doctors/prescription/${prescriptionId}`,
          {
            method: "DELETE",
          }
        );
        if (response.ok) {
          const updatedPrescriptions = prescriptions.filter(
            (prescription) => prescription.id !== prescriptionId
          );
          setPrescriptions(updatedPrescriptions);
        } else {
          console.error("Failed to delete prescription.");
        }
      } catch (error) {
        console.error("Error deleting prescription:", error);
      }
    }
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
              {editingPrescription?.id === prescription.id ? (
                <div>
                  <div className="editable-field">
                    <strong>Medication:</strong>
                    <input
                      type="text"
                      value={editedMedication}
                      onChange={(e) => setEditedMedication(e.target.value)}
                      placeholder="Medication"
                    />
                  </div>
                  <div className="editable-field">
                    <strong>Dosage:</strong>
                    <input
                      type="text"
                      value={editedDosage}
                      onChange={(e) => setEditedDosage(e.target.value)}
                      placeholder="Dosage"
                    />
                  </div>
                  <div className="editable-field">
                    <strong>Days Per Week:</strong>
                    <input
                      type="text"
                      value={editedDaysPerWeek}
                      onChange={(e) => setEditedDaysPerWeek(e.target.value)}
                      placeholder="Days per Week"
                    />
                  </div>
                  <div className="editable-field">
                    <strong>Instructions:</strong>
                    <textarea
                      value={editedInstructions}
                      onChange={(e) => setEditedInstructions(e.target.value)}
                      placeholder="Instructions"
                      rows={4}
                    />
                  </div>
                  <div className="button-group">
                    <button onClick={handleSavePrescription}>Save</button>
                    <button onClick={handleCancelEdit}>Cancel</button>
                  </div>
                </div>
              ) : (
                <div>
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
                    <div>
                      <button
                        className="btn-edit"
                        onClick={() => handleEditPrescription(prescription)}
                      >
                        Edit Prescription
                      </button>
                      <button
                        className="btn-delete"
                        onClick={() =>
                          handleDeletePrescription(prescription.id)
                        }
                      >
                        <FaTrashAlt /> Delete Prescription
                      </button>
                    </div>
                  )}
                </div>
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
