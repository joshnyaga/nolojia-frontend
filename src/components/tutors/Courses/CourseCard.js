import React, { useState, useEffect } from "react";
import img from "../../../images/study2.svg";
import { Link } from "react-router-dom";
import "./coursecard.css";
import ReactStars from "react-stars";
import EditCourse from "../../../TutorContainer/CoursesContainer/EditCourse";
import axios from "axios";
import { getStorage, ref, deleteObject } from "firebase/storage";
import swal from "sweetalert";
import app from "../../../firebase";
const CourseCard = ({ course }) => {
  const [open, setOpen] = useState(false);
  const storage = getStorage(app);
  const handleDelete = async () => {
    try {
      const res = await axios.delete(
        `/api/nolojia/v1/courses/${course._id}`,
        { withCredentials: true }
      );
      const reference = ref(storage, course.imgName);
      // Delete the file
      deleteObject(reference)
        .then(() => {
          swal("Success", "Course Deleted Successfully", "success");
          window.location.reload();
        })
        .catch((error) => {
          swal("Failed", error, "error");
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="course-card-tutor">
      <div className="img-container-tutor">
        <img src={course.img} alt="" />
      </div>
      <div className="info-course-tutor">
        <div className="top-head-tutor">
          <div className="title-course-tutor">{course.title}</div>
          <div className="price-course-tutor">Ksh. {course.price}</div>
        </div>

        <div className="desc-course-tutor">{course.desc}</div>

        <div className="other-course-tutor">
          <ReactStars
            count={course.rating}
            size={24}
            value={course.rating}
            color2={"#ffd700"}
          />
          <div className="leve-course-tutor">{course.level}</div>
        </div>
        <div className="other-course-tutor">
          <Link to={`/admin/courses/lessons/${course._id}`} className="btn">
            Lessons
          </Link>
          <button onClick={() => setOpen(true)} className="btn">
            Edit
          </button>
          <button onClick={handleDelete} className="btn">
            Delete
          </button>
        </div>
      </div>
      {open && <EditCourse setOpen={setOpen} courseId={course._id} />}
    </div>
  );
};

export default CourseCard;
