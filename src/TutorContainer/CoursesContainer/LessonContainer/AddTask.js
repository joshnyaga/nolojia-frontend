import axios from "axios";
import React, { useState, useEffect } from "react";
import { FaWindowClose } from "react-icons/fa";
import swal from "sweetalert";
const AddTask = ({ setOpen, lessonId }) => {
  const [input, setInput] = useState({});
  const handleChange = (e) => {
    setInput((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleUpload = async (e) => {
    e.preventDefault();

    const res = await axios.post(
      `https://nolojia-backend.onrender.com/api/nolojia/v1/tasks/${lessonId}`,
      { ...input },
      { withCredentials: true }
    );
    swal("Success", "Task added", "success");
    window.location.reload();
  };
  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <div className="modal-title">Add Task</div>
          <FaWindowClose size={30} onClick={() => setOpen(false)} />
        </div>
        <div className="modal-body">
          <form onSubmit={handleUpload} className="add-course">
            <input
              type="text"
              onChange={handleChange}
              placeholder="Name"
              name="name"
              required
            />
            <span>The field is required</span>
            <textarea
              onChange={handleChange}
              name="desc"
              cols={30}
              rows={5}
              required
              placeholder="Add task here"
            ></textarea>
            <span>The field is required</span>
            <input
              type="date"
              onChange={handleChange}
              placeholder="Deadline"
              name="deadline"
              required
            />
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

export default AddTask;
