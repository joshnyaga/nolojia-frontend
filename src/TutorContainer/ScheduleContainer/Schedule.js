import axios from "axios";
import "./schedule.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AddSchedule from "./AddSchedule";
import EditSchedule from "./EditSchedule";
import swal from "sweetalert";
const Schedule = () => {
  const [schedules, setSchedules] = useState([]);
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchSchedule = async () => {
      const res = await axios.get(
        "/schedules",
        { withCredentials: true }
      );
      setSchedules(res.data);
    };
    fetchSchedule();
  }, []);

  return (
    <section className="content-tutor">
      <br />
      <h3 className="heading center">Schedule</h3>
      <button
        onClick={() => {
          setOpen(true);
        }}
        className="btn"
      >
        Add Schedule
      </button>
      <table className="styled-table">
        <thead>
          <tr>
            <th>Day</th>
            <th>From</th>
            <th>To</th>
            <th>Event</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {schedules.map((schedule) => (
            <tr key={schedule._id}>
              <td>{schedule.day}</td>
              <td>{schedule.startTime}</td>
              <td>{schedule.endTime}</td>
              <td>{schedule.event}</td>
              <td>
                <button
                  onClick={() => {
                    setOpenEdit(true);
                  }}
                  className="btn"
                >
                  Edit
                </button>
                {openEdit && (
                  <EditSchedule
                    setOpenEdit={setOpenEdit}
                    scheduleId={schedule._id}
                  />
                )}
                <button
                  onClick={async () => {
                    try {
                      await axios.delete(
                        `/schedules/`,
                        {
                          withCredentials: true,
                        }
                      );
                      swal("Success", "Deleted successfully", "success");
                    } catch (error) {
                      swal("Error", "An error occurred", "error");
                    }
                  }}
                  className="btn"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {open && <AddSchedule setOpen={setOpen} />}
    </section>
  );
};

export default Schedule;
