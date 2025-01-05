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
  console.log(drId);
  const today = new Date().toISOString().split("T")[0]; // Today's date in YYYY-MM-DD format

  // Fetch appointments from API
  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:8080/api/appointments/dr/${drId}`
      );
      if (response.ok) {
        const appointmentData = await response.json();
        setAppointments(appointmentData);

        // Fetch patient data for each appointment
        const patientRequests = appointmentData.map(async (appointment) => {
          console.log("patient" + appointment.patientId);
          const patientResponse = await fetch(
            `http://localhost:8080/api/Patients/${appointment.patientId}`
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
      const todays = appointments.filter(
        (appointment) => appointment.date === today
      );
      setTodaysAppointments(todays);

      // The rest of the appointments
      const rest = appointments.filter(
        (appointment) => appointment.date !== today
      );
      setRestAppointments(rest);
    }
  }, [appointments]);

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
                  {appointment.patient?.FirstName}{" "}
                  {appointment.patient?.LastName}
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
