import React, { useEffect, useState } from "react";
import image1 from "../../../images/study4.svg";
import ReactStars from "react-stars";
import axios from "axios";
import "./course.css";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import Payment from "../../../StudentContainer/DashBoard/Payment";
const Course = (course) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleEnroll = async () => {
    try {
      if (course.course.price == 0) {
        const res = await axios.put(
          `/users/enroll/${course.course._id}`,
          {
            name: "key",
          },

          {
            withCredentials: true,
          }
        );
        swal("Success", res.data, "success");
        window.location.reload();
      } else {
        setOpen(true);
      }
    } catch (error) {
      swal("An Error occurred", error.response.data.message, "error");
    }
  };
  return (
    <div className="card">
      <img src={course.course.img} alt="" />
      <div className="card-info">
        <div className="col-1">
          <p className="name">{course.course.title}</p>
          <div className="rating">
            <ReactStars
              count={course.course.rating}
              size={24}
              value={course.course.rating}
              color2={"#ffd700"}
            />
          </div>
        </div>

        <p className="level">USD. {course.course.price}</p>
        {course.course.type === "all" ? (
          <button onClick={handleEnroll} className="btn">
            Enroll{" "}
          </button>
        ) : (
          <Link to={`/courses/${course.course._id}`} className="btn btn-big">
            See more{" "}
          </Link>
        )}
      </div>
      {open && (
        <Payment
          setOpen={setOpen}
          title={course.course.title}
          price={course.course.price}
        />
      )}
    </div>
  );
};

export default Course;
