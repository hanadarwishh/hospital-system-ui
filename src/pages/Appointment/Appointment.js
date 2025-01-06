import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/sidebar/sidebar";
import "./appointment.css";

const TodaysAppointments = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [todaysAppointments, setTodaysAppointments] = useState([]);
  const [restAppointments, setRestAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const doctor = JSON.parse(localStorage.getItem("doctor"));
  const drId = doctor.id;

  // Get today's date in YYYY-MM-DD format (local timezone)
  const today = new Date().toLocaleDateString("en-CA"); // This gives "YYYY-MM-DD"

  // Fetch appointments from API
  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://hospital-management-system-production-17a9.up.railway.app/api/appointments/dr/${drId}`
      );
      if (response.ok) {
        const appointmentData = await response.json();
        setAppointments(appointmentData);

        // Fetch patient data for each appointment
        const patientRequests = appointmentData.map(async (appointment) => {
          const patientResponse = await fetch(
            `https://hospital-management-system-production-17a9.up.railway.app/api/Patients/${appointment.patientId}`
          );
          if (patientResponse.ok) {
            const patientData = await patientResponse.json();
            return { ...appointment, patient: patientData };
          } else {
            return { ...appointment, patient: null };
          }
        });

        const enrichedAppointments = await Promise.all(patientRequests);
        setAppointments(enrichedAppointments);
      } else {
        console.error("Error fetching appointments.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  // Filter today's appointments
  useEffect(() => {
    if (appointments.length > 0) {
      const todays = appointments.filter((appointment) => {
        // Convert the appointment date to a JavaScript Date object and get the local date
        const appointmentDate = new Date(appointment.date).toLocaleDateString(
          "en-CA"
        ); // "en-CA" ensures YYYY-MM-DD format
        return appointmentDate === today && appointment.status === "approved";
      });
      setTodaysAppointments(todays);

      // The rest of the appointments
      const rest = appointments.filter(
        (appointment) =>
          new Date(appointment.date).toLocaleDateString("en-CA") !== today &&
          appointment.status === "approved"
      );
      setRestAppointments(rest);
    }
  }, [appointments, today]);

  const handleAppointmentClick = (appointment) => {
    navigate("/patient-profile", { state: { appointment } });
  };

  const handleAddClick = (appointment) => {
    navigate("/patient-profile", { state: { appointment } });
  };

  return (
    <div className="appointments-container">
      <Sidebar />
      <div className="content">
        <h1>Today's Appointments</h1>

        {loading && <p>Loading appointments...</p>}

        {/* Display today's appointments */}
        <div className="appointments-list">
          {todaysAppointments.length > 0 ? (
            todaysAppointments.map((appointment) => (
              <div
                key={appointment.id}
                onClick={() => handleAppointmentClick(appointment)}
                className="appointment-card"
              >
                <h3>
                  {appointment.patient?.firstName}{" "}
                  {appointment.patient?.lastName}
                </h3>
                <p>
                  <strong>Date:</strong> {appointment.date}
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
            ))
          ) : (
            <p>No appointments today.</p>
          )}
        </div>

        <h2>Upcoming Appointments</h2>
        {/* Display the rest of the appointments */}
        <div className="appointments-list">
          {restAppointments.length > 0 ? (
            restAppointments.map((appointment) => (
              <div
                key={appointment.id}
                onClick={() => handleAppointmentClick(appointment)}
                className="appointment-card"
              >
                <h3>
                  {appointment.patient?.firstName}{" "}
                  {appointment.patient?.lastName}
                </h3>
                <p>
                  <strong>Date:</strong> {appointment.date}
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
            ))
          ) : (
            <p>No upcoming appointments.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TodaysAppointments;
