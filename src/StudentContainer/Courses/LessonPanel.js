import React from "react";
import "./courses.css";
import { useEffect, useState } from "react";
import Lesson from "../../components/students/LessonCard/Lesson";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Task from "../../components/tutors/Tasks/Task";
const LessonPanel = (lessonProp) => {
  const [lesson, setLesson] = useState({});
  const [lessons, setLessons] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [tutorId, setTutorId] = useState("");
  const [tutor, setTutor] = useState({});
  const [loading, setLoading] = useState(false);
  const courseId = useLocation().pathname.split("/")[2];
  const lessonId = useLocation().pathname.split("/")[3];
  console.log(tutor, tutorId, loading)
  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const res = await axios.get(
          `https://nolojia.herokuapp.com/api/nolojia/v1/lessons/first/${courseId}`,
          { withCredentials: true }
        );
        setLesson(res.data);
      } catch (error) {}
    };
    const fetchCourse = async () => {
      try {
        const res = await axios.get(
          `https://nolojia.herokuapp.com/api/nolojia/v1/courses/tutor/${courseId}`,
          { withCredentials: true }
        );
        setTutorId(res.data.userId);

        const user = await axios.get(
          `https://nolojia.herokuapp.com/api/nolojia/v1/users/${res.data.userId}`,
          { withCredentials: true }
        );
        setTutor(user.data);
      } catch (error) {}
    };
    const fetchLessons = async () => {
      try {
        const res = await axios.get(
          `https://nolojia.herokuapp.com/api/nolojia/v1/lessons/${courseId}`,
          { withCredentials: true }
        );
        setLessons(res.data);
      } catch (error) {}
    };
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `https://nolojia.herokuapp.com/api/nolojia/v1/tasks/${lessonId}`,
          {
            withCredentials: true,
          }
        );
        setTasks(res.data);
        console.log(tasks);
        setLoading(false);
      } catch (error) {
        console.log(error.response.data.message);
        setLoading(false);
      }
    };
    fetchLesson();
    fetchCourse();
    fetchLessons();
    fetchTasks();
  }, [courseId, lessonId, tasks]);
  useEffect(() => {
    const fetchSingleLesson = async () => {
      try {
        const res = await axios.get(
          `https://nolojia.herokuapp.com/api/nolojia/v1/lessons/one/${lessonId}`,
          { withCredentials: true }
        );
        setLesson(res.data);
      } catch (error) {}
    };
    fetchSingleLesson();
  }, [lessonId]);
  return (
    <div className="lesson-panel">
      {courseId ? (
        <>
          <div className="video-container">
            <video controls src={lesson.videoUrl}></video>
          </div>
          <div className="info-lessons">
            <p className="title">{lesson.title}</p>
          </div>
          <p className="desc">{lesson.desc}</p>
          <div className="heading-center">Assignments</div>
          {tasks !== "No tasks found" ? (
            <div className="task-container">
              {tasks.map((task) => (
                <Task key={task._id} task={task} />
              ))}
            </div>
          ) : (
            <div className="middle">No Tasks for this lesson</div>
          )}

          {lessons === "No lesson available for the course" ? (
            <div className="middle">No lesson available for the course</div>
          ) : (
            <div>
              {" "}
              {lessons.map((singleLesson) => (
                <Lesson key={singleLesson._id} lessona={singleLesson} />
              ))}
            </div>
          )}
        </>
      ) : (
        <div className="middle">Select a course to view content</div>
      )}
    </div>
  );
};

export default LessonPanel;
