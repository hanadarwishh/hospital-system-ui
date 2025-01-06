import React, { useState, useEffect } from "react";
import Sidebar from "../../components/PatientSidebar/PatientSidebar"; // Import the Sidebar component
import "./PatientPrescription.css";

const PrescriptionPage = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  // Replace with actual API endpoint to fetch prescriptions by patient ID
  const fetchPrescriptionsByPatientId = async (patientId) => {
    const response = await fetch(
      `https://hospital-management-system-production-17a9.up.railway.app/api/doctors/prescription/patient/${patientId}`
    );
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error("Failed to fetch prescriptions");
    }
  };

  // Replace with actual API endpoint to fetch doctor details by ID
  const fetchDoctorById = async (drId) => {
    const response = await fetch(
      `https://hospital-management-system-production-17a9.up.railway.app/api/doctors/${drId}`
    );
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error("Failed to fetch doctor details");
    }
  };

  useEffect(() => {
    const getPrescriptionData = async () => {
      try {
        // Get patient data from localStorage
        const patient = JSON.parse(localStorage.getItem("patient"));
        const patientId = patient?.id;

        if (!patientId) {
          console.error("Patient ID not found in localStorage.");
          return;
        }

        // Fetch prescriptions for the patient
        const fetchedPrescriptions = await fetchPrescriptionsByPatientId(
          patientId
        );
        setPrescriptions(fetchedPrescriptions);

        // Fetch doctor details for each prescription and store in state
        const doctorPromises = fetchedPrescriptions.map((prescription) =>
          fetchDoctorById(prescription.drId)
        );
        const fetchedDoctors = await Promise.all(doctorPromises);
        setDoctors(fetchedDoctors);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching prescriptions or doctor details:", error);
        setLoading(false);
      }
    };

    getPrescriptionData();
  }, []); // Run once on mount

  if (loading) {
    return <div>Loading prescription and doctor details...</div>;
  }

  return (
    <div className="page-container">
      {/* Sidebar Component */}
      <Sidebar />

      <div className="prescription-page">
        <h1 className="prescription-title">Prescriptions</h1>
        {prescriptions.map((prescription, index) => (
          <div key={prescription.id} className="prescription-card">
            <div className="prescription-header">
              <h2>{prescription.medication}</h2>
              <p>
                <strong>Doctor:</strong>{" "}
                {doctors[index]?.FirstName || "Loading..."}{" "}
                {doctors[index]?.LastName || "Loading..."}
              </p>
            </div>

            <div className="prescription-details">
              <div className="detail-item">
                <strong>Instructions:</strong>{" "}
                <p>{prescription.instructions}</p>
              </div>
              <div className="detail-item">
                <strong>Dosage:</strong> <p>{prescription.dosage}</p>
              </div>
              <div className="detail-item">
                <strong>Days Per Week:</strong>{" "}
                <p>{prescription.daysPerWeek}</p>
              </div>
              <div className="detail-item">
                <strong>Duration:</strong> <p>{prescription.duration}</p>
              </div>
            </div>

            <div className="doctor-info">
              <h3>Doctor's Information</h3>
              <div>
                <strong>Name:</strong>{" "}
                {doctors[index]?.FirstName || "Loading..."}
              </div>
              <div>
                <strong>Specialization:</strong>{" "}
                {doctors[index]?.specialization || "Loading..."}
              </div>
              <div>
                <strong>Email:</strong> {doctors[index]?.email || "Loading..."}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PrescriptionPage;
