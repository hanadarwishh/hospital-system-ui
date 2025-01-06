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
  const [selectedNurse, setSelectedNurse] = useState(null);
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
      const response = await fetch(`http://localhost:8080/api/nurse`);
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
      // Update doctor's profile data
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

        // Now, handle updating the assigned doctor for the selected nurse (or patient)
        if (formData.assignedNurse) {
          console.log(formData.assignedNurse);
          const responseAssignedDr = await fetch(
            `http://localhost:8080/api/nurse/assignedDr/${formData.assignedNurse}`,

            {
              method: "PATCH",
              headers: { "Content-Type": "application/json" },
              body: doctor.id,
            }
          );

          if (responseAssignedDr.ok) {
            console.log("Assigned doctor updated successfully");
            console.log(responseAssignedDr);
          } else {
            console.error("Failed to update assigned doctor");
          }
        }

        setIsEditing(false);
        console.log("Profile updated successfully");
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

  const handleMouseEnter = (nurse) => {
    setSelectedNurse(nurse);
  };

  const handleMouseLeave = () => {
    setSelectedNurse(null);
  };

  if (!doctor) return <div>Loading...</div>;

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
    { label: "Email", icon: FaEnvelope, field: "email", readOnly: !isEditing },
    {
      label: "Specialization",
      icon: FaStethoscope,
      field: "specialization",
      readOnly: !isEditing,
    },
    {
      label: "Assigned Nurse",
      icon: FaUser,
      field: "nurseQuery",
      readOnly: !isEditing,
    },
  ];

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
            {profileFields.map(({ label, icon: Icon, field, readOnly }) => (
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

          {selectedNurse && (
            <div className="nurse-info-popup">
              <div className="nurse-info">
                <img
                  src={
                    selectedNurse.profilePicture ||
                    "https://via.placeholder.com/50"
                  }
                  alt="Nurse"
                  className="nurse-profile-pic"
                />
                <div className="nurse-details">
                  <p>
                    <strong>Name:</strong>{" "}
                    {`${selectedNurse.firstName} ${selectedNurse.lastName}`}
                  </p>
                  <p>
                    <strong>Email:</strong> {selectedNurse.email}
                  </p>
                  <p>
                    <strong>Phone:</strong> {selectedNurse.phone}
                  </p>
                </div>
              </div>
            </div>
          )}

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
