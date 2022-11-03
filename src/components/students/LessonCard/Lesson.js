import React from "react";
import "./lesson.css";
import { AiFillPlayCircle } from "react-icons/ai";
import { Link } from "react-router-dom";

const Lesson = (prop) => {
  return (
    <Link to={`/courses/${prop.lessona.courseId}/${prop.lessona._id}`}>
      <div className="lesson-card">
        <div className="play-button">
          <AiFillPlayCircle />
        </div>
        <div className="info">
          <div className="lesson-title">{prop.lessona.title}</div>
          <div className="lesson-desc">{prop.lessona.desc}</div>
        </div>
      </div>
    </Link>
  );
};

export default Lesson;
