import React, { useState, useEffect } from "react";
import "./MyProfile.css";
import Sidebar from "../../components/sidebar/sidebar";
import {
  FaUser,
  FaEnvelope,
  FaStethoscope,
  FaEdit,
  FaSave,
  FaTimes,
  FaSignOutAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const MyProfile = () => {
  const [doctor, setDoctor] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [profilePicture, setProfilePicture] = useState(null);
  const [nurseQuery, setNurseQuery] = useState("");
  const [nurses, setNurses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const doctorData = JSON.parse(localStorage.getItem("doctor"));

    if (doctorData) {
      setDoctor(doctorData);
      setFormData({
        firstName: doctorData.FirstName || "",
        lastName: doctorData.LastName || "",
        email: doctorData.email || "",
        specialization: doctorData.specialization || "",
        assignedNurse: doctorData.assignedNurse || "",
      });
    } else {
      console.error("No doctor data found in localStorage");
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "nurseQuery") {
      setNurseQuery(value);
      fetchNurses(value);
    }
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfilePicture(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const fetchNurses = async (query) => {
    if (!query) {
      setNurses([]);
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:8080/api/nurse?query=${query}`
      );
      if (response.ok) {
        const data = await response.json();
        setNurses(data);
      } else {
        console.error("Failed to fetch nurses");
      }
    } catch (err) {
      console.error("Error fetching nurses:", err);
    }
  };

  const handleNurseSelect = (nurse) => {
    setFormData({ ...formData, assignedNurse: nurse.id });
    setNurseQuery(`${nurse.firstName} ${nurse.lastName}`);
    setNurses([]);
  };

  const handleSaveChanges = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/doctors/${doctor.id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...formData, profilePicture }),
        }
      );

      if (response.ok) {
        const updatedDoctor = await response.json();
        setDoctor(updatedDoctor);
        localStorage.setItem("doctor", JSON.stringify(updatedDoctor));
        setIsEditing(false);
        console.log("yes");
      } else {
        console.error("Failed to save changes");
      }
    } catch (err) {
      console.error("Error saving changes:", err);
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem("doctor");
    navigate("/");
  };

  if (!doctor) return <div>Loading...</div>;

  // Logic for controlling editability of specialization
  const isSpecializationEditable =
    isEditing &&
    (!doctor.specialization || doctor.specialization.trim() === "");

  return (
    <div className="main-container-my-profile">
      <Sidebar />
      <div className="profile-content">
        <div className="profile-card">
          <div className="profile-pic-section">
            <div className="profile-pic-wrapper">
              <img
                src={
                  profilePicture ||
                  doctor.profilePicture ||
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
                readOnly: true,
              },
              {
                label: "Last Name",
                icon: FaUser,
                field: "lastName",
                readOnly: true,
              },
              {
                label: "Email",
                icon: FaEnvelope,
                field: "email",
                readOnly: !isEditing,
              },
              {
                label: "Specialization",
                icon: FaStethoscope,
                field: "specialization",
                readOnly: !isSpecializationEditable,
              },
              {
                label: "Assigned Nurse",
                icon: FaUser,
                field: "nurseQuery",
                readOnly: !isEditing,
              },
            ].map(({ label, icon: Icon, field, readOnly }) => (
              <div className="info-row" key={field}>
                <Icon className="info-icon" />
                <div className="info-input">
                  <label>{label}</label>
                  <input
                    name={field}
                    value={
                      field === "nurseQuery" ? nurseQuery : formData[field]
                    }
                    onChange={handleInputChange}
                    readOnly={readOnly}
                    placeholder={
                      field === "nurseQuery" ? "Search nurse..." : ""
                    }
                  />
                  {field === "nurseQuery" && nurses.length > 0 && isEditing && (
                    <ul className="nurse-dropdown">
                      {nurses.map((nurse) => (
                        <li
                          key={nurse.id}
                          className="nurse-item"
                          onClick={() => handleNurseSelect(nurse)}
                        >
                          <img
                            src={
                              nurse.profilePicture ||
                              "https://via.placeholder.com/50"
                            }
                            alt="Nurse"
                            className="nurse-pic"
                          />
                          <span>{`${nurse.firstName} ${nurse.lastName}`}</span>
                        </li>
                      ))}
                    </ul>
                  )}
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
                <button
                  onClick={() => setIsEditing(false)}
                  className="cancel-button"
                >
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

export default MyProfile;
