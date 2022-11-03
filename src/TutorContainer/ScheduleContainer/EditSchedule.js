import React, { useState, useEffect } from "react";
import { FaWindowClose } from "react-icons/fa";
import axios from "axios";
import swal from "sweetalert";
const EditSchedule = ({ setOpenEdit, scheduleId }) => {
  const [input, setInput] = useState({});
  const [schedule, setSchedule] = useState({});

  const handleChange = (e) => {
    setInput((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  useEffect(() => {
    const fetchSchedule = async () => {
      const res = await axios.get(
        `/schedules/${scheduleId}`,
        { withCredentials: true }
      );
      setSchedule(res.data);
    };
    fetchSchedule();
  }, []);
  const handleUpload = async (e) => {
    e.preventDefault();

    const res = await axios.put(
      `/schedules/${scheduleId}`,
      { ...input },
      { withCredentials: true }
    );
    swal("Success", "Schedule updated", "success");
    window.location.reload();
  };
  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <div className="modal-title">Update Schedule</div>
          <FaWindowClose size={30} onClick={() => setOpenEdit(false)} />
        </div>
        <div className="modal-body">
          <form onSubmit={handleUpload} className="add-course">
            <label htmlFor="">Start time</label>
            <input
              type="time"
              name="startTime"
              onChange={handleChange}
              placeholder="Start time"
              defaultValue={schedule.startTime}
              required
            />
            <span>The field is required</span>
            <input
              type="time"
              name="endTime"
              onChange={handleChange}
              placeholder="End time"
              defaultValue={schedule.endTime}
              required
            />
            <span>The field is required</span>
            <textarea
              onChange={handleChange}
              name="event"
              cols={30}
              rows={5}
              required
              defaultValue={schedule.event}
              placeholder="Add event here"
            ></textarea>
            <span>The field is required</span>
          </form>
        </div>
        <div className="modal-footer">
          <button onClick={handleUpload} className="btn">
            Add
          </button>
          <button onClick={() => setOpenEdit(false)} className="btn">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditSchedule;
