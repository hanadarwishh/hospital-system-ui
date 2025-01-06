import React, { useEffect, useState } from "react";
import "./NurseSchedule.css";
import Sidebar from "../../components/NurseSidebar/NurseSidebar";

const NurseSchedule = () => {
  const [schedule, setSchedule] = useState(null); // Initialize schedule as null for better control over loading state
  const [nurse, setNurse] = useState(null);
  const [loading, setLoading] = useState(true);

  const nurseData = JSON.parse(localStorage.getItem("nurse"));
  const nurseId = nurseData?.id;

  useEffect(() => {
    const fetchNurseData = async () => {
      if (nurseId) {
        try {
          // Fetch nurse data to get assigned doctor
          const nurseResponse = await fetch(
            `https://hospital-management-system-production-17a9.up.railway.app/api/nurse/${nurseId}`
          );
          if (nurseResponse.ok) {
            const nurseDetails = await nurseResponse.json();
            setNurse(nurseDetails);

            if (nurseDetails.assignedDr) {
              // Fetch doctor's schedule using the assigned doctor ID
              const scheduleResponse = await fetch(
                `https://hospital-management-system-production-17a9.up.railway.app/api/doctors/schedule/dr/${nurseDetails.assignedDr}`
              );
              if (scheduleResponse.ok) {
                const scheduleData = await scheduleResponse.json();
                setSchedule(scheduleData); // Set schedule data to state
              } else {
                console.error("Failed to fetch schedule.");
                setSchedule([]); // Set empty array if fetch fails
              }
            }
          } else {
            console.error("Failed to fetch nurse details.");
          }
        } catch (error) {
          console.error("Error fetching data:", error);
          setSchedule([]); // Set empty array if error occurs
        } finally {
          setLoading(false); // Stop the loading spinner when fetching is done
        }
      }
    };

    fetchNurseData();
  }, [nurseId]);

  return (
    <div className="nurse-schedule-container">
      <Sidebar />
      <div className="nurse-schedule-content">
        <h1>Doctor's Schedule</h1>

        {/* Show loading for schedule only */}
        {loading && !schedule ? (
          <div>Loading schedule...</div>
        ) : (
          <>
            {schedule && schedule.length > 0 ? (
              <table className="nurse-schedule-table">
                <thead>
                  <tr>
                    <th>Clinic Name</th>
                    <th>Time Start</th>
                    <th>Time End</th>
                    <th>Days of the Week</th>
                  </tr>
                </thead>
                <tbody>
                  {schedule.map((item) => (
                    <tr key={item.id}>
                      <td>{item.clinicName}</td>
                      <td>{item.timeStart}</td>
                      <td>{item.timeEnd}</td>
                      <td>{item.daysOfWeek}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No schedule available for the assigned doctor.</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default NurseSchedule;
