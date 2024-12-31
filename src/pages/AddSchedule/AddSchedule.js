import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./AddSchedule.css"; // Make sure the styles match AddSchedule.css

const AddSchedule = ({ selectedDate, closeModal, setSchedule }) => {
  const [daysOfWeek, setDaysOfWeek] = useState("");
  const [timeStart, setStartTime] = useState("");
  const [timeEnd, setEndTime] = useState("");
  const [clinicName, setClinicName] = useState("");
  const [fee, setFee] = useState("");

  const doctor = JSON.parse(localStorage.getItem("doctor"));
  const drId = doctor?.id;
  const drSpecialization = doctor?.specialization;

  const showErrorNotification = (message) => {
    toast.error(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const showSuccessNotification = (message) => {
    toast.success(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const handleSave = async () => {
    if (!drSpecialization || drSpecialization.trim() === "") {
      showErrorNotification(
        "Error: Please add specialization in your profile."
      );
      return;
    }

    const newSchedule = {
      date: selectedDate.toISOString().split("T")[0],
      daysOfWeek,
      timeStart,
      timeEnd,
      clinicName,
      fee: parseFloat(fee),
      drId,
    };

    try {
      const response = await fetch(
        "http://localhost:8080/api/doctors/schedule",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newSchedule),
        }
      );

      if (response.ok) {
        const savedSchedule = await response.json(); // Get the saved schedule from the response
        setSchedule((prev) => [...prev, savedSchedule]); // Update schedule state with the saved schedule
        showSuccessNotification("Schedule saved successfully!");
        closeModal(); // Close the modal
      } else {
        const errorData = await response.json();
        showErrorNotification(`Failed to save schedule: ${errorData.message}`);
      }
    } catch (error) {
      showErrorNotification("Error saving schedule. Please try again.");
      console.error("Error saving schedule:", error);
    }
  };

  return (
    <div className="add-schedule">
      <ToastContainer />
      <h2>Add Schedule</h2>
      <form onSubmit={(e) => e.preventDefault()} className="add-schedule-form">
        <div className="form-group">
          <label htmlFor="daysOfWeek">Day:</label>
          <select
            id="daysOfWeek"
            value={daysOfWeek} // Bind the selected value to the state
            onChange={(e) => setDaysOfWeek(e.target.value)} // Update the state with the selected value
          >
            <option value="">Select a day</option> {/* Placeholder option */}
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
            <option value="Saturday">Saturday</option>
            <option value="Sunday">Sunday</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="timeStart">Start Time:</label>
          <input
            id="timeStart"
            type="time"
            value={timeStart}
            onChange={(e) => setStartTime(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="timeEnd">End Time:</label>
          <input
            id="timeEnd"
            type="time"
            value={timeEnd}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="clinicName">Clinic Name:</label>
          <input
            id="clinicName"
            type="text"
            value={clinicName}
            onChange={(e) => setClinicName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="fee">Appointment Fee:</label>
          <input
            id="fee"
            type="number"
            value={fee}
            onChange={(e) => setFee(e.target.value)}
          />
        </div>
        <div className="button-group">
          <button
            type="button"
            onClick={handleSave}
            className="save-button-add"
          >
            Save
          </button>
          <button
            type="button"
            onClick={closeModal}
            className="cancel-button-add"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddSchedule;
