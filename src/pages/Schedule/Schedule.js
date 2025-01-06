import React, { useState, useEffect } from "react";
import ReactCalendar from "react-calendar";
import { FaPlus, FaEdit, FaTrash, FaMapMarkerAlt } from "react-icons/fa";
import Sidebar from "../../components/sidebar/sidebar"; // Adjust path as needed
import AddSchedule from "../AddSchedule/AddSchedule"; // Create this component
import EditSchedule from "../EditSchedule/EditSchedule"; // Separate EditSchedule Component
import styles from "./Schedule.module.css"; // Import styles for the component

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
          `https://hospital-management-system-production-17a9.up.railway.app/api/doctors/schedule/dr/${drId}`
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
  }, [drId]); // Make sure the fetch only runs when `drId` changes

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
        `https://hospital-management-system-production-17a9.up.railway.app/api/doctors/schedule/${scheduleId}`,
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
    setEditSchedule(scheduleItem); // Set the selected schedule for editing
    setIsModalOpen(true); // Open the modal
  };

  return (
    <div className={styles["main-container"]}>
      <Sidebar />
      <div className={styles["content-container"]}>
        <h2>Doctor's Schedule</h2>

        {/* Calendar */}
        <ReactCalendar
          onChange={handleDateChange}
          value={selectedDate}
          tileClassName={({ date }) =>
            isScheduled(date) ? styles.scheduled : ""
          }
        />

        {/* Add Schedule Button */}
        <button
          className={styles["add-button"]}
          onClick={() => setIsModalOpen(true)}
        >
          <FaPlus /> Add Schedule
        </button>

        {/* Modal for AddSchedule or EditSchedule */}
        {isModalOpen && (
          <div className={styles.overlay}>
            <div className={styles["modal-content"]}>
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
        <div className={styles["schedule-list"]}>
          <h3>Schedule Details</h3>
          {schedule.length === 0 ? (
            <p>No schedules available.</p>
          ) : (
            <div className={styles["schedule-cards"]}>
              {schedule.map((entry) => (
                <div className={styles["schedule-card"]} key={entry.id}>
                  <div className={styles["card-content"]}>
                    <div className={styles["clinic-details"]}>
                      <h4>{entry.clinicName}</h4>
                      <div className={styles["location"]}>
                        <FaMapMarkerAlt /> <span>{entry.location}</span>
                      </div>
                    </div>
                    <div className={styles["schedule-times"]}>
                      <p>
                        <strong>Start Time:</strong> {entry.timeStart}
                      </p>
                      <p>
                        <strong>End Time:</strong> {entry.timeEnd}
                      </p>
                    </div>
                    <p>{entry.additionalDetails || "No additional details"}</p>
                  </div>
                  <div className={styles["card-actions"]}>
                    <button
                      className={styles["edit-button"]}
                      onClick={() => handleEditSchedule(entry)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className={styles["delete-button"]}
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
