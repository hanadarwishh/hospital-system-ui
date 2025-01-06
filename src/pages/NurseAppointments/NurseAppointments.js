import React, { useEffect, useState } from "react";
import "./NurseAppointments.css";
import Sidebar from "../../components/NurseSidebar/NurseSidebar";
import { FaCheck, FaTimes } from "react-icons/fa"; // Importing icons for accept and decline buttons

const NurseAppointments = () => {
  const [appointments, setAppointments] = useState(null);
  const [patientDetails, setPatientDetails] = useState({});
  const [nurse, setNurse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const nurseData = JSON.parse(localStorage.getItem("nurse"));
  const nurseId = nurseData?.id;

  useEffect(() => {
    const fetchAppointments = async () => {
      if (nurseId) {
        try {
          const nurseResponse = await fetch(
            `https://hospital-management-system-production-17a9.up.railway.app/api/nurse/${nurseId}`
          );
          if (nurseResponse.ok) {
            const nurseDetails = await nurseResponse.json();
            setNurse(nurseDetails);

            if (nurseDetails.assignedDr) {
              const response = await fetch(
                `https://hospital-management-system-production-17a9.up.railway.app/api/appointments/dr/${nurseDetails.assignedDr}`
              );
              if (response.ok) {
                const appointmentData = await response.json();
                setAppointments(appointmentData);

                const patientRequests = appointmentData.map((appointment) =>
                  fetch(
                    `https://hospital-management-system-production-17a9.up.railway.app/api/Patients/${appointment.patientId}`
                  ).then((res) => (res.ok ? res.json() : null))
                );

                const patients = await Promise.all(patientRequests);
                const patientDataMap = patients.reduce((acc, patient) => {
                  if (patient) acc[patient.id] = patient;
                  return acc;
                }, {});
                setPatientDetails(patientDataMap);
              } else {
                console.error("Failed to fetch appointments.");
                setAppointments([]);
              }
            }
          } else {
            console.error("Failed to fetch nurse details.");
          }
        } catch (error) {
          console.error("Error fetching data:", error);
          setAppointments([]);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchAppointments();
  }, [nurseId]);

  const handleAccept = async (appointmentId) => {
    try {
      const response = await fetch(
        `https://hospital-management-system-production-17a9.up.railway.app/api/appointments/status/${appointmentId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: "approved",
        }
      );
      if (response.ok) {
        setAppointments((prevAppointments) =>
          prevAppointments.map((appointment) =>
            appointment.id === appointmentId
              ? { ...appointment, status: "approved" }
              : appointment
          )
        );
        console.log("Appointment approved successfully.");
      } else {
        console.error("Failed to approve the appointment.");
      }
    } catch (error) {
      console.error("Error approving appointment:", error);
    }
  };

  const handleDecline = async (appointmentId) => {
    try {
      const response = await fetch(
        `https://hospital-management-system-production-17a9.up.railway.app/api/appointments/${appointmentId}`,
        { method: "DELETE" }
      );
      if (response.ok) {
        setAppointments((prevAppointments) =>
          prevAppointments.filter(
            (appointment) => appointment.id !== appointmentId
          )
        );
        console.log("Appointment declined successfully.");
      } else {
        console.error("Failed to decline the appointment.");
      }
    } catch (error) {
      console.error("Error declining appointment:", error);
    }
  };

  const openPatientModal = (patientId) => {
    setSelectedPatient(patientDetails[patientId]);
    setIsModalOpen(true);
  };

  const closePatientModal = () => {
    setSelectedPatient(null);
    setIsModalOpen(false);
  };

  return (
    <div className="nurse-appointments-container">
      <Sidebar />
      <div className="nurse-appointments-content">
        <h1>Nurse Appointments</h1>

        {loading && !appointments ? (
          <div className="nurse-appointments-loading">
            Loading appointments...
          </div>
        ) : (
          <>
            {appointments && appointments.length > 0 ? (
              <table className="nurse-appointments-table">
                <thead>
                  <tr>
                    <th>Patient Name</th>
                    <th>Reason</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((appointment) => {
                    const patient = patientDetails[appointment.patientId];
                    return (
                      <tr key={appointment.id}>
                        <td>
                          {patient ? (
                            <button
                              className="nurse-appointments-patient-button"
                              onClick={() => openPatientModal(patient.id)}
                            >
                              {patient.firstName} {patient.lastName}
                            </button>
                          ) : (
                            "Loading..."
                          )}
                        </td>
                        <td>{appointment.issue}</td>
                        <td>
                          {new Date(appointment.date).toLocaleDateString()}
                        </td>
                        <td>{appointment.status || "Pending"}</td>
                        <td>
                          {appointment.status === "" || !appointment.status ? (
                            <>
                              <button
                                className="nurse-appointments-accept-button"
                                onClick={() => handleAccept(appointment.id)}
                              >
                                <FaCheck className="accept-icon" />
                                Accept
                              </button>
                              <button
                                className="nurse-appointments-decline-button"
                                onClick={() => handleDecline(appointment.id)}
                              >
                                <FaTimes className="decline-icon" />
                                Decline
                              </button>
                            </>
                          ) : (
                            ""
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <p>No appointment requests available.</p>
            )}
          </>
        )}
      </div>

      {isModalOpen && selectedPatient && (
        <div className="nurse-appointments-modal">
          <div className="nurse-appointments-modal-content">
            <h2>Patient Profile</h2>
            <img
              src={
                selectedPatient.profilePicture ||
                "https://via.placeholder.com/150"
              }
              alt={`${selectedPatient.firstName} ${selectedPatient.lastName}`}
              className="patient-profile-picture"
            />
            <p>
              <strong>Name:</strong> {selectedPatient.firstName}{" "}
              {selectedPatient.lastName}
            </p>
            <p>
              <strong>Age:</strong> {selectedPatient.age}
            </p>
            <p>
              <strong>Gender:</strong> {selectedPatient.gender}
            </p>
            <p>
              <strong>Contact:</strong> {selectedPatient.phone}
            </p>
            <p>
              <strong>Address:</strong> {selectedPatient.email}
            </p>
            <button
              className="nurse-appointments-modal-close"
              onClick={closePatientModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NurseAppointments;
