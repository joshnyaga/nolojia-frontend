import axios from "axios";
import React, { useState, useEffect } from "react";
import { FaWindowClose } from "react-icons/fa";
import swal from "sweetalert";
const EditTask = ({ setOpen, taskId, task }) => {
  const [input, setInput] = useState({});
  const handleChange = (e) => {
    setInput((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `https://nolojia.herokuapp.com/api/nolojia/v1/tasks/${taskId}`,
        { ...input },
        { withCredentials: true }
      );
      swal("Success", res.data, "success");
    } catch (error) {
      swal("Error occurred", "Something went wrong", "error");
    }
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
              defaultValue={task.name}
            />
            <span>The field is required</span>
            <textarea
              onChange={handleChange}
              name="desc"
              cols={30}
              rows={5}
              required
              placeholder="Add task here"
              defaultValue={task.desc}
            ></textarea>
            <span>The field is required</span>
            <input
              type="date"
              onChange={handleChange}
              placeholder="Deadline"
              name="deadline"
              defaultValue={task.deadline}
              required
            />
            <span>The field is required</span>
          </form>
        </div>
        <div className="modal-footer">
          <button type="submit" className="btn">
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

export default EditTask;
