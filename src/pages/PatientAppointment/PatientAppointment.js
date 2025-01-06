import React, { useState, useEffect } from "react";
import "./PatientAppointment.css";
import Sidebar from "../../components/PatientSidebar/PatientSidebar.js";
import {
  FaCalendarAlt,
  FaClock,
  FaStethoscope,
  FaMapMarkerAlt,
} from "react-icons/fa";

const PatientAppointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [scheduleDetails, setScheduleDetails] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch appointments for a patient
  const fetchAppointmentsByPatientId = async (patientId) => {
    const response = await fetch(
      `https://hospital-management-system-production-17a9.up.railway.app/api/appointments/patient/${patientId}`
    );
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error("Failed to fetch appointments");
    }
  };

  // Fetch schedule by scheduleId
  const fetchScheduleById = async (scheduleId) => {
    const response = await fetch(
      `https://hospital-management-system-production-17a9.up.railway.app/api/doctors/schedule/${scheduleId}`
    );
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error("Failed to fetch schedule details");
    }
  };

  // Fetch doctor by doctorId
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
    const getAppointmentData = async () => {
      try {
        // Retrieve patient ID from localStorage
        const patient = JSON.parse(localStorage.getItem("patient"));
        const patientId = patient?.id;

        if (!patientId) {
          console.error("Patient ID not found in localStorage.");
          return;
        }

        // Fetch appointments
        const fetchedAppointments = await fetchAppointmentsByPatientId(
          patientId
        );
        setAppointments(fetchedAppointments);

        // Fetch schedules and doctors for each appointment
        const schedulePromises = fetchedAppointments.map((appointment) =>
          fetchScheduleById(appointment.scheduleId)
        );
        const doctorPromises = fetchedAppointments.map((appointment) =>
          fetchDoctorById(appointment.drId)
        );

        const fetchedSchedules = await Promise.all(schedulePromises);
        const fetchedDoctors = await Promise.all(doctorPromises);

        setScheduleDetails(fetchedSchedules);
        setDoctors(fetchedDoctors);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching appointment details:", error);
        setLoading(false);
      }
    };

    getAppointmentData();
  }, []);

  // Separate pending and approved appointments
  const pendingAppointments = appointments.filter(
    (appointment) => !appointment.status || appointment.status === "pending"
  );
  const approvedAppointments = appointments.filter(
    (appointment) => appointment.status === "approved"
  );

  return (
    <div className="patient-appointment-container">
      <Sidebar />
      <div className="patient-appointment-page">
        {/* Page Title */}
        <h1 className="patient-appointment-title">Your Appointments</h1>

        {/* Loading Overlay */}
        {loading && (
          <div className="patient-appointment-loading-overlay">
            <div className="patient-appointment-loading">
              <p>Loading your appointments...</p>
            </div>
          </div>
        )}

        {/* Pending Appointments Section */}
        {!loading && pendingAppointments.length > 0 && (
          <div className="appointment-status-section">
            <h2>Pending Appointments</h2>
            <div className="patient-appointment-list">
              {pendingAppointments.map((appointment, index) => (
                <div
                  key={appointment.id}
                  className="patient-appointment-card pending"
                >
                  <h2>
                    <FaStethoscope /> {doctors[index]?.FirstName || "Doctor"}{" "}
                    {doctors[index]?.LastName || ""}
                  </h2>
                  <p>
                    <FaCalendarAlt /> <strong>Date:</strong>{" "}
                    {appointment.date || "N/A"}
                  </p>
                  <p>
                    <FaClock /> <strong>Time:</strong>{" "}
                    {scheduleDetails[index]?.timeStart || "N/A"}
                  </p>
                  <p>
                    <FaMapMarkerAlt /> <strong>Location:</strong>{" "}
                    {scheduleDetails[index]?.clinicName || "N/A"}
                  </p>
                  <p>Status: Pending</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Approved Appointments Section */}
        {!loading && approvedAppointments.length > 0 && (
          <div className="appointment-status-section">
            <h2>Approved Appointments</h2>
            <div className="patient-appointment-list">
              {approvedAppointments.map((appointment, index) => (
                <div
                  key={appointment.id}
                  className="patient-appointment-card approved"
                >
                  <h2>
                    <FaStethoscope /> {doctors[index]?.FirstName || "Doctor"}{" "}
                    {doctors[index]?.LastName || ""}
                  </h2>
                  <p>
                    <FaCalendarAlt /> <strong>Date:</strong>{" "}
                    {appointment.date || "N/A"}
                  </p>
                  <p>
                    <FaClock /> <strong>Time:</strong>{" "}
                    {scheduleDetails[index]?.timeStart || "N/A"}
                  </p>
                  <p>
                    <FaMapMarkerAlt /> <strong>Location:</strong>{" "}
                    {scheduleDetails[index]?.clinicName || "N/A"}
                  </p>
                  <p>Status: Approved</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* No Appointments Section */}
        {!loading && appointments.length === 0 && (
          <div className="patient-appointment-no-appointments">
            You have no scheduled appointments.
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientAppointment;
