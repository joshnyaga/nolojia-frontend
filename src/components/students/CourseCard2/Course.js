import React from "react";
import "./Course.css";
import { Link } from "react-router-dom";
import image1 from "../../../images/study4.svg";
import ReactStars from "react-stars";
function Course({ course }) {
  return (
    <Link to={`/courses/${course._id}`}>
      <div className="course-card">
        <div className="img-container">
          <img src={course.img} alt="" />
        </div>
        <div className="info">
          <div className="col-1">
            <p className="title">{course.title}</p>
            <div className="rating">
              <ReactStars
                count={5}
                size={24}
                value={course.rating}
                color2={"#ffd700"}
              />
              ,
            </div>
          </div>
          <p className="desc">{course.desc}</p>
        </div>
      </div>
    </Link>
  );
}

export default Course;
