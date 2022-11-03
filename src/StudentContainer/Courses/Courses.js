import React from "react";
import CoursePanel from "./CoursePanel";
import LessonPanel from "./LessonPanel";
import "./courses.css";
import Navbar from "../../components/students/Nav/Navbar";
import Sidebar from "../../components/students/SideBar/Sidebar";

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
