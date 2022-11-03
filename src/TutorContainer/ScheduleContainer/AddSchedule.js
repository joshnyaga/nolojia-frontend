import React, { useState, useEffect } from "react";
import { FaWindowClose } from "react-icons/fa";
import swal from "sweetalert";
import axios from "axios";
const AddSchedule = ({ setOpen }) => {
  const [input, setInput] = useState({});
  const handleChange = (e) => {
    setInput((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleUpload = async (e) => {
    e.preventDefault();
    console.log(input);
    const res = await axios.post(
      `/schedules`,
      { ...input },
      { withCredentials: true }
    );
    console.log(input);
    swal("Success", "Task added", "success");
    window.location.reload();
  };
  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <div className="modal-title">Add Schedule</div>
          <FaWindowClose size={30} onClick={() => setOpen(false)} />
        </div>
        <div className="modal-body">
          <form onSubmit={handleUpload} className="add-course">
            <select name="day" onChange={handleChange}>
              <option value="Monday">Monday</option>
              <option value="Tuesday">Tuesday</option>
              <option value="Wednesday">Wednesday</option>
              <option value="Thursday">Thursday</option>
              <option value="Friday">Friday</option>
              <option value="Saturday">Saturday</option>
              <option value="Sunday">Sunday</option>
            </select>
            <label htmlFor="">Start time</label>
            <input
              type="time"
              name="startTime"
              onChange={handleChange}
              placeholder="Start time"
              required
            />
            <span>The field is required</span>
            <label htmlFor="">End time</label>
            <input
              type="time"
              name="endTime"
              onChange={handleChange}
              placeholder="End time"
              required
            />
            <span>The field is required</span>
            <textarea
              onChange={handleChange}
              name="event"
              cols={30}
              rows={5}
              required
              placeholder="Add event here"
            ></textarea>
            <span>The field is required</span>
          </form>
        </div>
        <div className="modal-footer">
          <button onClick={handleUpload} className="btn">
            Add
          </button>
          <button onClick={() => setOpen(false)} className="btn">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddSchedule;
