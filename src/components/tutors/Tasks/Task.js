import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import swal from "sweetalert";
import EditTask from "../../../TutorContainer/CoursesContainer/LessonContainer/EditTask";
import "./task.css";
const Task = ({ task }) => {
  const [open, setOpen] = useState(false);
  const currentUser = useSelector((state) => state.currentUser);
  const handleDelete = async () => {
    await axios.delete(
      `/tasks/${task._id}`,
      { withCredentials: true }
    );

    window.location.reload();
  };
  return (
    <div className="task-card-tutor">
      <div className="desc-task-tutor">{task.desc}</div>
      <br />
      <div className="date-task-tutor">Deadline: {task.deadline}</div>
      {currentUser.type === "student" ? (
        <div></div>
      ) : (
        <div className="btns-task-tutor">
          <button
            onClick={() => {
              setOpen(true);
            }}
            className="btn"
          >
            Edit
          </button>
          <button onClick={handleDelete} className="btn">
            Delete
          </button>
        </div>
      )}
      {open && <EditTask setOpen={setOpen} taskId={task._id} task={task} />}
    </div>
  );
};

export default Task;
