import axios from "axios";
import { useState, useEffect } from "react";
import Course from "../../components/students/CourseCard2/Course";
import "./courses.css";
import ReactLoading from "react-loading";
function CoursePanel() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          "https://nolojia-backend.onrender.com/api/nolojia/v1/courses/students",
          { withCredentials: true }
        );
        setCourses(res.data);
        setLoading(false);
      } catch (error) {
        console.log(error.response.data.message);
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  return (
    <div className="course-panel">
      <div className="course-search">
        <input type="text" placeholder="search course" />
        <button className="btn">Search...</button>
      </div>
      <hr />
      {loading ? (
        <div className="middle">
          <ReactLoading type="spin" color="#101050" height={200} width={75} />
        </div>
      ) : (
        <>
          {courses.map((course) => (
            <Course key={course._id} course={course} />
          ))}
        </>
      )}
    </div>
  );
}

export default CoursePanel;
