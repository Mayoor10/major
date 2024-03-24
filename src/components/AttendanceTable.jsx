import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCalendar } from 'react-icons/fa'; // Import FaCalendar icon
import './AttendanceTable.css'; // Import CSS file for styling
import Calendar from './Calendar'; // Assuming './Calendar' is the path to your Calendar component file

const AttendanceTable = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const history = useNavigate(); // Initialize useHistory hook
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [loading, setLoading] = useState(true);

  // Function to handle navigation back to detection page
  const handleBackToDetection = () => {
    history('/home'); // Navigate to detection page
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/attendance');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        console.log(data);
        // Define dummy classes with status "Absent"
        const dummyClasses = {
          "amey": "Absent",
          "roshani": "Absent",
          "sam": "Absent",
          "max": "Absent"
        };

        // Preprocess data to ensure each document has all dummy classes with an "Absent" status
        const processedData = data.reduce((accumulator, entry, index) => {
          const classPresence = entry.class_presence || {}; // Handle case where class_presence is undefined

          // Merge dummy classes with existing class_presence
          const mergedClasses = { ...dummyClasses, ...classPresence };

          // Convert timestamp to a date object
          const timestampDate = new Date(entry.timestamp);
          const dateKey = timestampDate.toLocaleDateString('en-US');

          // Check if a detection for the same person on the same day already exists
          const existingEntryIndex = accumulator.findIndex(item => item.dateKey === dateKey);
          if (existingEntryIndex !== -1) {
            // Update the status of the existing entry only if the person was absent earlier and now present
            Object.entries(mergedClasses).forEach(([name, status]) => {
              if (accumulator[existingEntryIndex].class_presence[name] === "Absent" && status === "Present") {
                accumulator[existingEntryIndex].class_presence[name] = status;
              }
            });
          } else {
            // Add a new entry
            accumulator.push({
              ...entry,
              class_presence: mergedClasses,
              srno: accumulator.length, // Assigning sequential IDs
              dateKey: dateKey, // Store the date key for later reference
              date: timestampDate.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }), // Get the date in "9th February 2024" format
              dayOfWeek: timestampDate.toLocaleDateString('en-US', { weekday: 'long' }) // Get the day of the week
            });
          }

          return accumulator;
        }, []);
        const formattedSelectedDate = selectedDate.toLocaleDateString('en-US');
        const filteredData = processedData.filter(entry => {
          const entryDate = new Date(entry.timestamp).toLocaleDateString('en-US');
          console.log(entryDate);
          return entryDate === formattedSelectedDate;
        });
        console.log(selectedDate);

        console.log(filteredData);

        setAttendanceData(filteredData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [selectedDate]);

  return (
    <div className="container">
      <div className="content">
        <div className="attendance-table-container">
          <div className="grid-container">
            <div className="grid-item left-grid">
              <h2 className="title">Attendance Management Table</h2>
              <div className="table-container">
                <table className="attendance-table">
                  <thead>
                    <tr>
                      <th colSpan="4" className="heading">Attendance for {attendanceData.length > 0 && `${attendanceData[0].date}, ${attendanceData[0].dayOfWeek}`}</th>
                    </tr>
                    <tr>
                      <th>Sr. No</th>
                      <th>Name</th>
                      <th>Status</th>
                      <th>Timestamp</th>
                    </tr>
                  </thead>
                  <tbody>
                  {loading ? (
                      <tr>
                        <td colSpan="5">Loading...</td>
                      </tr>
                    ) : attendanceData.length === 0 ? (
                      <tr>
                        <td colSpan="5">No attendance data on {selectedDate.toLocaleDateString('en-US')}</td>
                      </tr>
                    ) : (
                    attendanceData.map((entry) => (
                      <React.Fragment key={`heading_${entry._id}`}>
                        <tr>
                          <td colSpan="4" className="sub-heading">Attendance for {`${entry.date}, ${entry.dayOfWeek}`}</td>
                        </tr>
                        {Object.entries(entry.class_presence).map(([name, status], index) => (
                          <tr key={`${entry._id}_${name}`}>
                            <td>{index + 1}</td>
                            <td>{name}</td>
                            <td>{status}</td>
                            <td>{entry.timestamp}</td>
                          </tr>
                        ))}
                        <tr key={`spacer_${entry._id}`}>
                          <td colSpan="4">&nbsp;</td>
                        </tr>
                      </React.Fragment>
                    ))
                    )}
                  </tbody>
                </table>
              </div>
              <div>
                <button className="back-btn" onClick={handleBackToDetection}>Back to Detection</button>
              </div>
            </div>
            <div className="grid-item right-grid">
              <Calendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceTable;
