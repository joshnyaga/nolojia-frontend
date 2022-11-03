import React from "react";
import CoursePanel from "./CoursePanel";
import LessonPanel from "./LessonPanel";
import "./courses.css";
const Courses = () => {
  return (
    <>
      <div className="course-section">
        <CoursePanel />
        <LessonPanel />
      </div>
    </>
  );
};

export default Courses;
