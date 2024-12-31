import React, { useState, useEffect } from "react";
import ReactCalendar from "react-calendar";
import { FaPlus, FaEdit, FaTrash, FaMapMarkerAlt } from "react-icons/fa"; // Added location icon
import Sidebar from "../../components/sidebar/sidebar"; // Adjust path as needed
import AddSchedule from "../AddSchedule/AddSchedule"; // Create this component
import EditSchedule from "../EditSchedule/EditSchedule"; // Separate EditSchedule Component
import "./Schedule.css";

const DoctorSchedule = () => {
  const [schedule, setSchedule] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // Control modal visibility
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [editSchedule, setEditSchedule] = useState(null); // For editing existing schedules

  const doctor = JSON.parse(localStorage.getItem("doctor"));
  const drId = doctor?.id;

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/doctors/schedule/dr/${drId}`
        );
        if (response.ok) {
          const fetchedSchedule = await response.json();
          setSchedule(fetchedSchedule);
        } else {
          console.error("Failed to fetch schedule");
        }
      } catch (error) {
        console.error("Error fetching schedule:", error);
      }
    };
    fetchSchedule();
  });

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  // Helper function to check if a given day is part of the doctor's schedule
  const isScheduled = (date) => {
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const dayOfWeek = daysOfWeek[date.getDay()]; // Get the name of the day, e.g., "Monday"

    return schedule.some((entry) => entry.daysOfWeek === dayOfWeek);
  };

  const handleDeleteSchedule = async (scheduleId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/doctors/schedule/${scheduleId}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        setSchedule(schedule.filter((entry) => entry.id !== scheduleId)); // Update schedule list
      } else {
        console.error("Failed to delete schedule");
      }
    } catch (error) {
      console.error("Error deleting schedule:", error);
    }
  };

  const handleEditSchedule = async (scheduleItem) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/doctors/schedule/${scheduleItem.id}`
      );
      if (response.ok) {
        const scheduleData = await response.json();
        setEditSchedule(scheduleData); // Set the fetched schedule
        setIsModalOpen(true); // Open the modal
      } else {
        console.error("Failed to fetch schedule by ID");
      }
    } catch (error) {
      console.error("Error fetching schedule by ID:", error);
    }
  };

  return (
    <div className="main-container">
      <Sidebar />
      <div className="content-container">
        <h2>Doctor's Schedule</h2>

        {/* Calendar */}
        <ReactCalendar
          onChange={handleDateChange}
          value={selectedDate}
          tileClassName={({ date }) => (isScheduled(date) ? "scheduled" : "")}
        />

        {/* Add Schedule Button */}
        <button className="add-button" onClick={() => setIsModalOpen(true)}>
          <FaPlus /> Add Schedule
        </button>

        {/* Open the AddSchedule or EditSchedule modal */}
        {isModalOpen && (
          <div className="overlay">
            <div className="modal-content">
              {editSchedule ? (
                <EditSchedule
                  selectedDate={selectedDate}
                  closeModal={() => setIsModalOpen(false)}
                  setSchedule={setSchedule}
                  editSchedule={editSchedule}
                  setEditSchedule={setEditSchedule}
                />
              ) : (
                <AddSchedule
                  selectedDate={selectedDate}
                  closeModal={() => setIsModalOpen(false)}
                  setSchedule={setSchedule}
                />
              )}
            </div>
          </div>
        )}

        {/* Schedule List */}
        <div className="schedule-list">
          <h3>Schedule Details</h3>
          {schedule.length === 0 ? (
            <p>No schedules available.</p>
          ) : (
            <div className="schedule-cards">
              {schedule.map((entry) => (
                <div className="schedule-card" key={entry.id}>
                  <div className="card-content">
                    <div className="clinic-details">
                      <h4>{entry.clinicName}</h4>
                      <div className="location">
                        <FaMapMarkerAlt /> <span>{entry.location}</span>
                      </div>
                    </div>
                    <div className="schedule-times">
                      <p>
                        <strong>Start Time:</strong> {entry.timeStart}
                      </p>
                      <p>
                        <strong>End Time:</strong> {entry.timeEnd}
                      </p>
                    </div>
                    <p>{entry.additionalDetails || "No additional details"}</p>
                  </div>
                  <div className="card-actions">
                    <button
                      className="edit-button"
                      onClick={() => handleEditSchedule(entry)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="delete-button"
                      onClick={() => handleDeleteSchedule(entry.id)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorSchedule;
