import React, { useState, useEffect } from "react";
import Sidebar from "../../components/PatientSidebar/PatientSidebar"; // Reuse the Sidebar component
import "./PatientAppointment.css";

const PatientAppointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch appointments for the patient by ID
  const fetchAppointmentsByPatientId = async (patientId) => {
    const response = await fetch(
      `http://localhost:8080/api/appointments/patient/${patientId}`
    );
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error("Failed to fetch appointments");
    }
  };

  useEffect(() => {
    const getAppointments = async () => {
      try {
        // Get patient data from local storage
        const patient = JSON.parse(localStorage.getItem("patient"));
        const patientId = patient?.id;

        if (!patientId) {
          console.error("Patient ID not found in local storage.");
          return;
        }

        // Fetch appointments for the patient
        const fetchedAppointments = await fetchAppointmentsByPatientId(
          patientId
        );
        setAppointments(fetchedAppointments);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching appointments:", error);
        setLoading(false);
      }
    };

    getAppointments();
  }, []);

  if (loading) {
    return <div>Loading appointments...</div>;
  }

  return (
    <div className="page-container">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="appointment-page">
        <h1 className="appointment-title">Your Scheduled Appointments</h1>

        {appointments.length > 0 ? (
          <div className="appointment-list">
            {appointments.map((appointment) => (
              <div key={appointment.id} className="appointment-card">
                <h2>{appointment.doctorName}</h2>
                <p>
                  <strong>Date:</strong> {appointment.date}
                </p>
                <p>
                  <strong>Time:</strong> {appointment.time}
                </p>
                <p>
                  <strong>Specialization:</strong> {appointment.specialization}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  {appointment.status === "CONFIRMED"
                    ? "✅ Confirmed"
                    : "⏳ Pending"}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-appointments">No appointments scheduled.</p>
        )}
      </div>
    </div>
  );
};

export default PatientAppointment;
