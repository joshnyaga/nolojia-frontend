import React, { useState, useEffect } from "react";
import CourseCard from "../../components/tutors/Courses/CourseCard";
import AddCourse from "./AddCourse";
import ReactLoading from "react-loading";
import axios from "axios";
import "./courses.css";
import { useLocation, useNavigate } from "react-router-dom";
const SearchCourse = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const query = useLocation().search;
  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `http://localhost:3001/api/nolojia/v1/courses/search${query}`,
          {
            withCredentials: true,
          }
        );
        setCourses(res.data);

        setLoading(false);
      } catch (error) {
        console.log(error.response.data.message);
        setLoading(false);
      }
    };
    fetchCourses();
  }, [query]);
  const navigate = useNavigate();
  const handleSearch = () => {
    navigate(`/admin/courses/searchcourses?q=${input}`);
  };
  return (
    <section className="content-tutor">
      <div className="heading center">Your Courses</div>
      <button onClick={() => setOpen(true)} className="btn">
        Add Course
      </button>
      <div className="search-bar-tutor">
        <input
          type="text"
          onChange={(e) => {
            setInput(e.target.value);
          }}
          placeholder="Search Course"
        />
        <button onClick={handleSearch} className="btn">
          Search
        </button>
      </div>
      {loading ? (
        <div className="middle">
          <ReactLoading type="spin" color="#101050" height={200} width={75} />
        </div>
      ) : (
        <>
          {courses.map((course) => (
            <CourseCard key={course._id} course={course} />
          ))}
        </>
      )}

      {open && <AddCourse setOpen={setOpen} />}
    </section>
  );
};

export default SearchCourse;
