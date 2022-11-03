import axios from "axios";
import React, { useState, useEffect } from "react";
import "./assignment.css";
const SubmitForm = () => {
  const [courses, setCourses] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [selectCourse, setSelectCourse] = useState("select");
  useEffect(() => {
    const fetchCourses = async () => {
      const res = await axios.get(
        "https://nolojia.herokuapp.com/api/nolojia/v1/courses/students",
        { withCredentials: true }
      );
      setCourses(res.data);
    };
    fetchCourses();
  }, []);
  const handleChangeCourse = async (e) => {
    setSelectCourse(e.target.value);
    console.log(selectCourse);
    const fetchLessons = async () => {
      const res = await axios.get(
        `https://nolojia.herokuapp.com/api/nolojia/v1/lessons/${e.target.value}`,
        { withCredentials: true }
      );
      setLessons(res.data);
    };
    fetchLessons();
  };
  const handleChangeLesson = async (e) => {
    console.log(selectCourse);
    const fetchLessons = async () => {
      const res = await axios.get(
        `https://nolojia.herokuapp.com/api/nolojia/v1/tasks/${e.target.value}`,
        { withCredentials: true }
      );
      setTasks(res.data);
    };
    fetchLessons();
  };

  return (
    <div className="submit-form">
      <h3 className="heading center">Submit Assignment Here</h3>
      <form action="">
        <div className="input-field-assignment">
          <label htmlFor="">Course name</label>
          <select
            onChange={handleChangeCourse}
            value={selectCourse}
            id="filter"
            required
          >
            <option value="select">Select course</option>
            {courses.map((course) => (
              <option key={course._id} value={course._id}>
                {course.title}
              </option>
            ))}
          </select>
          <br />
          <br />
          <label htmlFor="">Lesson name</label>
          <select
            onChange={handleChangeLesson}
            name="filter"
            id="filter"
            required
          >
            <option>Select lesson</option>
            {lessons.map((lesson) => (
              <option key={lesson._id} value={lesson._id}>
                {lesson.title}
              </option>
            ))}
          </select>
          <label htmlFor="">Task name</label>
          <select
            onChange={handleChangeLesson}
            name="filter"
            id="filter"
            required
          >
            <option>Select task</option>
            {tasks.map((task) => (
              <option key={task._id} value={task._id}>
                {task.name}
              </option>
            ))}
          </select>
          <br />
          <br />
        </div>
        <div className="input-field-assignment">
          <label htmlFor="file">Select file</label>
          <input type="file" />
        </div>

        <button className="btn medium">Submit</button>
      </form>
    </div>
  );
};

export default SubmitForm;
