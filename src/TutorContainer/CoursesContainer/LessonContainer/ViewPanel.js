import React, { useState, useEffect } from "react";
import tutor from "../../../images/tutor-pic.jpg";
import video from "../../../images/video.webm";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { BsInfo } from "react-icons/bs";
import Task from "../../../components/tutors/Tasks/Task";
import AddTask from "./AddTask";
const ViewPanel = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState({});
  const [tasks, setTasks] = useState([]);
  const lessonId = useLocation().pathname.split("/")[5];

  useEffect(() => {
    const fetchLessonInfo = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `/lessons/one/${lessonId}`,
          {
            withCredentials: true,
          }
        );
        setInfo(res.data);
        setLoading(false);
      } catch (error) {
        console.log(error.response.data.message);
        setLoading(false);
      }
      try {
        setLoading(true);
        const res = await axios.get(
          `/tasks/${lessonId}`,
          {
            withCredentials: true,
          }
        );
        setTasks(res.data);
        setLoading(false);
      } catch (error) {
        console.log(error.response.data.message);
        setLoading(false);
      }
    };
    fetchLessonInfo();
  }, [lessonId]);
  return (
    <div className="lesson-panel">
      {info != "" ? (
        <>
          {lessonId == "searchlesson" ? (
            <div className="no-info">Select from Search results</div>
          ) : (
            <>
              {" "}
              <div className="video-container">
                <video controls src={info.videoUrl}></video>
              </div>
              <div className="info-lessons">
                <p className="title">{info.title}</p>
              </div>
              <p className="desc">{info.desc}</p>
              <button onClick={() => setOpen(true)} className="btn">
                Add Task
              </button>
              {tasks != "No tasks found" ? (
                <div className="task-container">
                  {tasks.map((task) => (
                    <Task key={task._id} task={task} />
                  ))}
                </div>
              ) : (
                <div className="middle">No Tasks for this lesson</div>
              )}
            </>
          )}
        </>
      ) : (
        <div className="no-info">
          {lessonId === "searchlesson"
            ? "View Search results"
            : "No Lesson selected"}
        </div>
      )}
      {open && <AddTask setOpen={setOpen} lessonId={info._id} />}
    </div>
  );
};

export default ViewPanel;
