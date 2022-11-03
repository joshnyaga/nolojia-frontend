import "./schedule.css";
import axios from "axios";
import swal from "sweetalert";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Schedule = () => {
  const [schedules, setSchedules] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchSchedule = async () => {
      const res = await axios.get(
        "https://nolojia.herokuapp.com/api/nolojia/v1/schedules",
        { withCredentials: true }
      );
      setSchedules(res.data);
    };
    fetchSchedule();
  }, []);
  return (
    <section className="schedules">
      <br />
      <h3 className="heading center">Schedule</h3>

      <table className="styled-table">
        <thead>
          <tr>
            <th>Day</th>
            <th>From</th>
            <th>To</th>
            <th>Event</th>
          </tr>
        </thead>
        <tbody>
          {schedules.map((schedule) => (
            <tr key={schedule._id}>
              <td>{schedule.day}</td>
              <td>{schedule.startTime}</td>
              <td>{schedule.endTime}</td>
              <td>{schedule.event}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default Schedule;
