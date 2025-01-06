import React, { useState, useEffect } from "react";
// import "./NurseProfile.css";
import { FaUser, FaPhone, FaImage, FaSave, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/NurseSidebar/NurseSidebar";
const NurseProfile = () => {
  const [nurse, setNurse] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [profilePicture, setProfilePicture] = useState(null);
  const navigate = useNavigate();

  // Fetch the nurse data from localStorage after login
  useEffect(() => {
    const nurseData = JSON.parse(localStorage.getItem("nurse"));

    if (nurseData) {
      setNurse(nurseData);
      setFormData({
        firstName: nurseData.firstName || "",
        lastName: nurseData.lastName || "",
        email: nurseData.email || "",
        phone: nurseData.phone || "",
      });
    } else {
      console.error("No nurse data found in localStorage");
    }
  }, []);

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
      const updatedNurse = { ...formData, profilePicture };
      localStorage.setItem("nurse", JSON.stringify(updatedNurse));
      setNurse(updatedNurse);
      setIsEditing(false);
      console.log("Profile updated successfully");
    } catch (err) {
      console.error("Error saving changes:", err);
    }
  };

  const handleCancelChanges = () => {
    setIsEditing(false);
    setFormData({
      firstName: nurse.firstName,
      lastName: nurse.lastName,
      email: nurse.email,
      phone: nurse.phone,
    });
    setProfilePicture(nurse.profilePicture);
  };

  if (!nurse) return <div>Loading...</div>;

  const profileFields = [
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
    { label: "Email", icon: FaUser, field: "email", readOnly: !isEditing },
    { label: "Phone", icon: FaPhone, field: "phone", readOnly: !isEditing },
  ];

  return (
    <div className="main-container-nurse-profile">
      <Sidebar />
      <div className="profile-content">
        <div className="profile-card">
          <div className="profile-pic-section">
            <div className="profile-pic-wrapper">
              <img
                src={
                  profilePicture ||
                  nurse.profilePicture ||
                  "https://via.placeholder.com/150"
                }
                alt="Profile"
                className="profile-pic"
              />
              {isEditing && (
                <label className="upload-icon">
                  <input type="file" onChange={handleProfilePicChange} />
                  <FaImage />
                </label>
              )}
            </div>
            <h2>{`${formData.firstName} ${formData.lastName}`}</h2>
          </div>
          <div className="profile-info">
            {profileFields.map(({ label, icon: Icon, field, readOnly }) => (
              <div className="info-row" key={field}>
                <Icon className="info-icon" />
                <div className="info-input">
                  <label>{label}</label>
                  <input
                    name={field}
                    value={formData[field]}
                    onChange={handleInputChange}
                    readOnly={readOnly}
                    placeholder={field === "phone" ? "Enter your phone..." : ""}
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
                <button onClick={handleCancelChanges} className="cancel-button">
                  <FaTimes /> Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="edit-button"
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NurseProfile;
