import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import Sidebar from "../../components/PatientSidebar/PatientSidebar"; // Import the Sidebar component
import "./PatientDashboard.css";
import "react-calendar/dist/Calendar.css";

const PatientDashboard = () => {
  const [schedules, setSchedules] = useState([]);
  const [filteredSchedules, setFilteredSchedules] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userName, setUserName] = useState("");
  const [activeView, setActiveView] = useState("dashboard");
  const [selectedSpecialization, setSelectedSpecialization] = useState("");
  const [feesRange, setFeesRange] = useState([0, 500]);
  const [selectedDate, setSelectedDate] = useState(null); // Store selected date
  const navigate = useNavigate();
  const patient = JSON.parse(localStorage.getItem("patient"));
  const patientId = patient.id;

  const commonSpecializations = [
    "Cardiologist",
    "Dermatologist",
    "General Practitioner",
    "Neurologist",
    "Orthopedic Surgeon",
    "Pediatrician",
    "Psychiatrist",
    "Radiologist",
    "Urologist",
  ];

  useEffect(() => {
    fetchSchedules();
  }, []);

  const fetchSchedules = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://hospital-management-system-production-17a9.up.railway.app/api/doctors/schedule"
      );
      if (response.ok) {
        const schedulesData = await response.json();

        const enrichedSchedules = await Promise.all(
          schedulesData.map(async (schedule) => {
            const doctorResponse = await fetch(
              `https://hospital-management-system-production-17a9.up.railway.app/api/doctors/${schedule.drId}`
            );
            if (doctorResponse.ok) {
              const doctorDetails = await doctorResponse.json();
              return { ...schedule, doctor: doctorDetails };
            } else {
              return { ...schedule, doctor: null };
            }
          })
        );

        setSchedules(enrichedSchedules);
      } else {
        const errorText = await response.text();
        setError(`Error: ${errorText}`);
      }
    } catch (error) {
      console.error("Error fetching schedules:", error);
      setError("Failed to fetch schedules. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleFilters = () => {
    const selectedDayOfWeek = selectedDate
      ? new Date(selectedDate).toLocaleString("en-US", { weekday: "long" })
      : null;

    const filtered = schedules.filter((schedule) => {
      const matchesSpecialization =
        !selectedSpecialization ||
        (schedule.doctor?.specialization || "") === selectedSpecialization;
      const matchesFees =
        schedule.fee >= feesRange[0] && schedule.fee <= feesRange[1];
      const matchesDate =
        !selectedDate ||
        (selectedDayOfWeek && schedule.daysOfWeek.includes(selectedDayOfWeek));
      return matchesSpecialization && matchesFees && matchesDate;
    });
    setFilteredSchedules(filtered);
  };

  const handleBookAppointment = async (scheduleId, drId) => {
    if (!selectedDate) {
      alert("Please select a date for the appointment.");
      return;
    }

    const issue = prompt("Please describe your issue before booking:");
    if (!issue) {
      alert("Issue is required to book an appointment.");
      return;
    }

    const updatedAppointmentData = {
      issue, // Include the issue entered by the patient
      patientId,
      drId,
      scheduleId,
      date: selectedDate, // Send the selected date with the appointment
    };

    try {
      const response = await fetch(
        `https://hospital-management-system-production-17a9.up.railway.app/api/appointments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedAppointmentData),
        }
      );

      if (response.ok) {
        alert("Appointment booked successfully!");
        fetchSchedules(); // Refresh schedules
      } else {
        const errorText = await response.text();
        alert(`Error: ${errorText}`);
      }
    } catch (error) {
      console.error("Error booking appointment:", error);
      alert("Failed to book appointment. Please try again later.");
    }
  };

  return (
    <div className="patient-dashboard">
      {/* Integrate Sidebar */}
      <Sidebar activeView={activeView} onViewChange={setActiveView} />

      <div className="patient-dashboard-main-content">
        {activeView === "dashboard" && (
          <div className="patient-dashboard-dashboard-content">
            <h1>Welcome, {userName}</h1>

            <div className="patient-dashboard-filter-section">
              <h3>Filter Schedules</h3>
              <label>Specialization:</label>
              <select
                value={selectedSpecialization}
                onChange={(e) => setSelectedSpecialization(e.target.value)}
              >
                <option value="">All Specializations</option>
                {commonSpecializations.map((specialization) => (
                  <option key={specialization} value={specialization}>
                    {specialization}
                  </option>
                ))}
              </select>

              <label>
                Fees Range: ${feesRange[0]} - ${feesRange[1]}
              </label>
              <input
                type="range"
                min="0"
                max="1000"
                step="50"
                value={feesRange[0]}
                onChange={(e) =>
                  setFeesRange([Number(e.target.value), feesRange[1]])
                }
              />
              <input
                type="range"
                min="0"
                max="1000"
                step="50"
                value={feesRange[1]}
                onChange={(e) =>
                  setFeesRange([feesRange[0], Number(e.target.value)])
                }
              />

              <label>Select Date:</label>
              <Calendar
                value={selectedDate}
                onChange={setSelectedDate}
                className="patient-dashboard-calendar"
              />

              <button
                className="patient-dashboard-button"
                onClick={handleFilters}
              >
                Apply Filters
              </button>
            </div>

            <div className="patient-dashboard-schedule-list">
              <h3>Available Schedules</h3>
              {loading && (
                <p className="patient-dashboard-loading">Loading...</p>
              )}
              {filteredSchedules.length === 0 && !loading && (
                <p className="patient-dashboard-no-results">
                  No schedules available. Apply filters to find results.
                </p>
              )}
              <div className="patient-dashboard-schedule-cards">
                {filteredSchedules.map((schedule) => (
                  <div
                    key={schedule.id}
                    className="patient-dashboard-schedule-card"
                  >
                    <div className="patient-dashboard-card-header">
                      <img
                        src={schedule.doctor?.profilePicture || "/default.jpg"}
                        alt="Doctor"
                        className="patient-dashboard-doctor-image"
                      />
                      <div className="patient-dashboard-doctor-details">
                        <h4>
                          {schedule.doctor
                            ? `${schedule.doctor.FirstName} ${schedule.doctor.LastName}`
                            : "Unknown Doctor"}
                        </h4>
                        <p>{schedule.doctor?.specialization || "N/A"}</p>
                      </div>
                    </div>
                    <div className="patient-dashboard-card-body">
                      <p>
                        <strong>Fees:</strong> ${schedule.fee}
                      </p>
                      <p>
                        <strong>Date:</strong> {schedule.daysOfWeek}
                      </p>
                      <p>
                        <strong>Start Time:</strong> {schedule.timeStart}
                      </p>
                      <p>
                        <strong>End Time:</strong> {schedule.timeEnd}
                      </p>
                    </div>
                    <button
                      onClick={() =>
                        handleBookAppointment(schedule.id, schedule.drId)
                      }
                      className="patient-dashboard-book-button"
                    >
                      Book Appointment
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientDashboard;
