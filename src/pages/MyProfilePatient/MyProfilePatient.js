import React, { useState, useEffect } from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhoneAlt,
  FaGenderless,
  FaBirthdayCake,
  FaEdit,
  FaSave,
  FaTimes,
  FaSignOutAlt,
} from "react-icons/fa";
import Sidebar from "../../components/PatientSidebar/PatientSidebar"; // Import the Sidebar
import { useNavigate, useLocation } from "react-router-dom";
import "./MyProfilePatient.css";

const MyPatientProfile = () => {
  const patient = JSON.parse(localStorage.getItem("patient"));
  const patientId = patient?.id;

  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [profilePicture, setProfilePicture] = useState(null);
  const [activeView, setActiveView] = useState("profile"); // Active view state for the sidebar

  // Fetch patient data based on patientId
  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/Patients/${patientId}`
        );
        if (response.ok) {
          const data = await response.json();
          console.log("Fetched Patient Data:", data); // Log the fetched data to check if fields are correct

          // Ensure that age and phone are mapped correctly to formData
          setFormData({
            firstName: data.firstName || "",
            lastName: data.lastName || "",
            email: data.email || "",
            phone: data.phone || "", // Ensure this is set correctly
            gender: data.gender || "",
            age: data.age || "", // Ensure this is populated correctly
          });
        } else {
          console.error("Failed to fetch patient data.");
        }
      } catch (error) {
        console.error("Error fetching patient data:", error);
      }
    };

    if (patientId) {
      fetchPatientData();
    }
  }, [patientId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfilePicture(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSaveChanges = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/Patients/${patientId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...formData, profilePicture }),
        }
      );

      if (response.ok) {
        const updatedPatient = await response.json();
        console.log("Updated Patient:", updatedPatient); // Log updated data

        localStorage.setItem("patient", JSON.stringify(updatedPatient)); // Update localStorage with new data

        // Update formData with updatedPatient data
        setFormData({
          firstName: updatedPatient.firstName,
          lastName: updatedPatient.lastName,
          email: updatedPatient.email,
          phone: updatedPatient.phone,
          gender: updatedPatient.gender,
          age: updatedPatient.age,
        });
        setIsEditing(false);
        console.log("Changes saved successfully.");
      } else {
        console.error("Failed to save changes.");
      }
    } catch (err) {
      console.error("Error saving changes:", err);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    // Reset formData to initial patient data from localStorage
    setFormData({
      firstName: patient.firstName,
      lastName: patient.lastName,
      email: patient.email,
      phone: patient.phone,
      gender: patient.gender,
      age: patient.age,
    });
  };

  const handleSignOut = () => {
    localStorage.removeItem("patient");
    navigate("/"); // Redirect to home or login
  };

  if (!patient) return <div>Loading...</div>;

  return (
    <div className="main-container-my-profile">
      {/* Sidebar with active view functionality */}
      <Sidebar activeView={activeView} onViewChange={setActiveView} />

      <div className="profile-content">
        <div className="profile-card">
          <div className="profile-pic-section">
            <div className="profile-pic-wrapper">
              <img
                src={
                  profilePicture ||
                  patient.profilePicture ||
                  "https://via.placeholder.com/150"
                }
                alt="Profile"
                className="profile-pic"
              />
              {isEditing && (
                <label className="upload-icon">
                  <input type="file" onChange={handleProfilePicChange} />
                  <FaEdit />
                </label>
              )}
            </div>
            <h2>{`${formData.firstName} ${formData.lastName}`}</h2>
          </div>
          <div className="profile-info">
            {[
              {
                label: "First Name",
                icon: FaUser,
                field: "firstName",
                readOnly: !isEditing,
              },
              {
                label: "Last Name",
                icon: FaUser,
                field: "lastName",
                readOnly: !isEditing,
              },
              {
                label: "Email",
                icon: FaEnvelope,
                field: "email",
                readOnly: !isEditing,
              },
              {
                label: "Phone",
                icon: FaPhoneAlt,
                field: "phone",
                readOnly: !isEditing,
              },
              {
                label: "Gender",
                icon: FaGenderless,
                field: "gender",
                readOnly: true, // Gender cannot be edited
              },
              {
                label: "Age",
                icon: FaBirthdayCake,
                field: "age",
                readOnly: !isEditing,
              },
            ].map(({ label, icon: Icon, field, readOnly }) => (
              <div className="info-row" key={field}>
                <Icon className="info-icon" />
                <div className="info-input">
                  <label>{label}</label>
                  <input
                    name={field}
                    value={formData[field] || ""} // Ensure empty string if field is undefined
                    onChange={handleInputChange}
                    readOnly={readOnly}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="action-buttons">
            {isEditing ? (
              <>
                <button onClick={handleSaveChanges} className="save-button">
                  <FaSave /> Save
                </button>
                <button onClick={handleCancelEdit} className="cancel-button">
                  <FaTimes /> Cancel
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setIsEditing(true)}
                  className="edit-button"
                >
                  <FaEdit /> Edit Profile
                </button>
                <button onClick={handleSignOut} className="signout-button">
                  <FaSignOutAlt /> Sign Out
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPatientProfile;
