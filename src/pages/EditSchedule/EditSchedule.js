import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./EditSchedule.css"; // Assuming the CSS is in a separate file

const EditSchedule = ({ editSchedule, closeModal, setSchedule }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    daysOfWeek: "",
    timeStart: "",
    timeEnd: "",
    clinicName: "",
  });

  useEffect(() => {
    if (editSchedule) {
      setFormData({
        daysOfWeek: editSchedule.daysOfWeek,
        timeStart: editSchedule.timeStart,
        timeEnd: editSchedule.timeEnd,
        clinicName: editSchedule.clinicName,
      });
    }
  }, [editSchedule]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `https://hospital-management-system-production-17a9.up.railway.app/api/doctors/schedule/${editSchedule.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        const updatedSchedule = await response.json();
        setSchedule((prevSchedule) =>
          prevSchedule.map((entry) =>
            entry.id === updatedSchedule.id ? updatedSchedule : entry
          )
        );
        closeModal();
        navigate("/schedule");
      } else {
        console.error("Failed to update schedule");
      }
    } catch (error) {
      console.error("Error updating schedule:", error);
    }
  };

  return (
    <div className="edit-schedule">
      <h2>Edit Schedule</h2>
      <form onSubmit={handleSubmit} className="edit-schedule-form">
        <div className="form-group">
          <label htmlFor="daysOfWeek">Day:</label>
          <input
            id="daysOfWeek"
            type="text"
            name="daysOfWeek"
            value={formData.daysOfWeek}
            onChange={handleInputChange}
            placeholder="Enter days of the week"
          />
        </div>
        <div className="form-group">
          <label htmlFor="timeStart">Time Start:</label>
          <input
            id="timeStart"
            type="time"
            name="timeStart"
            value={formData.timeStart}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="timeEnd">Time End:</label>
          <input
            id="timeEnd"
            type="time"
            name="timeEnd"
            value={formData.timeEnd}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="clinicName">Clinic Name:</label>
          <input
            id="clinicName"
            type="text"
            name="clinicName"
            value={formData.clinicName}
            onChange={handleInputChange}
            placeholder="Enter clinic name"
          />
        </div>
        <div className="button-group">
          <button type="submit" className="save-button">
            Save Changes
          </button>
          <button type="button" onClick={closeModal} className="cancel-button">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditSchedule;
