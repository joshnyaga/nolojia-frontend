import React, { useState, useEffect } from "react";
import Course from "../../components/students/CourseCard/Course";
import ReactLoading from "react-loading";
import axios from "axios";
import "./dashboard.css";
const Dashboard = () => {
  const [allCourses, setAllCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [yourCourses, setYourCourses] = useState([]);
  const [type, setType] = useState("");
  useEffect(() => {
    const fetchAllCourses = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          "https://nolojia-backend.onrender.com/api/nolojia/v1/courses/",
          {
            withCredentials: true,
          }
        );
        const array = res.data;

        const newArr = array.map((v) => ({ ...v, type: "all" }));

        console.log(newArr);
        setAllCourses(res.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchAllCourses();
  }, []);
  useEffect(() => {
    const fetchYourCourses = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          "https://nolojia-backend.onrender.com/api/nolojia/v1/courses/students",
          {
            withCredentials: true,
          }
        );
        const array = res.data;

        const newArr = array.map((v) => ({ ...v, type: "yours" }));
        setYourCourses(newArr);
        setLoading(false);
        setType("yours");
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchYourCourses();
  }, []);
  return (
    <div>
      <section className="dash-section">
        <h3 className="heading">Your courses</h3>
        <div className="dash-cards">
          {loading ? (
            <div className="middle">
              <ReactLoading
                type="spin"
                color="#101050"
                height={200}
                width={75}
              />
            </div>
          ) : (
            <>
              {yourCourses.length > 0 ? (
                <>
                  {yourCourses.map((course) => (
                    <Course yours={type} key={course._id} course={course} />
                  ))}
                </>
              ) : (
                <div className=" strong">
                  You have not enrolled for any course yet
                </div>
              )}
            </>
          )}
        </div>
      </section>
      <section className="dash-section">
        <h3 className="heading">All Courses</h3>
        <div className="dash-cards">
          {loading ? (
            <div className="middle">
              <ReactLoading
                type="spin"
                color="#101050"
                height={200}
                width={75}
              />
            </div>
          ) : (
            <>
              {allCourses.length > 0 ? (
                <>
                  {allCourses.map((course) => (
                    <Course all={type} key={course._id} course={course} />
                  ))}
                </>
              ) : (
                <div className="strong">No courses available</div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
