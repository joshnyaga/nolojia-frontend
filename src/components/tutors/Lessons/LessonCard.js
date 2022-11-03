import React, { useState, useEffect } from "react";
import "./lessons.css";
import { Link, useNavigate } from "react-router-dom";
import EditLesson from "../../../TutorContainer/CoursesContainer/LessonContainer/EditLesson";
const LessonCard = ({ lesson }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        navigate(`/admin/courses/lessons/${lesson.courseId}/${lesson._id}`);
      }}
    >
      <div className="lesson-card-tutor">
        <div className="title-lesson-tutor">{lesson.title}</div>
        <div className="desc-lesson-tutor">{lesson.desc}</div>
        <div className="btns-lesson-tutor">
          <button
            onClick={() => {
              setOpen(true);
            }}
            className="btn"
          >
            Edit
          </button>
          <button className="btn">Delete</button>
        </div>
        {open && <EditLesson setOpen={setOpen} lessonId={lesson._id} />}
      </div>
    </div>
  );
};

export default LessonCard;
