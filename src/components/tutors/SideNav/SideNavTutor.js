import React from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import Nav from "../Nav/Nav";
import logo from "../../../images/nolojiaWhite.png";
import "./sidenav.css";
const SideNavTutor = () => {
  const pathname = useLocation().pathname.split("/")[2];
  const navigate = useNavigate();
  return (
    <>
      <div id="menu-bars" className="fa fa-bars"></div>

      <header className="header-dashboard">
        <Link to="#" className="logo">
          <img src={logo} alt="" />
        </Link>
        <nav className="navbar">
          <Link
            className={`${pathname === "" ? "active" : "link"}`}
            to="/admin/"
          >
            Dashboard
          </Link>
          <Link
            className={`${pathname === "courses" ? "active" : "link"}`}
            to="/admin/courses"
          >
            Courses
          </Link>

          <Link
            className={`${pathname === "schedule" ? "active" : "link"}`}
            to="/admin/schedule"
          >
            Schedule
          </Link>

          <Link
            className={`${pathname === "livestream" ? "active" : "link"}`}
            to="/admin/livestream"
          >
            Livestream
          </Link>

          <Link
            className={`${pathname === "assignments" ? "active" : "link"}`}
            to="/admin/assignment"
          >
            Assignments
          </Link>
          <Link
            className={`${pathname === "challenges" ? "active" : "link"}`}
            to="/assignment"
          >
            Challenges
          </Link>
        </nav>
        <div className="follow"> Copyright @ nolojia 2022</div>
      </header>
      <Nav />
      <Outlet />
    </>
  );
};

export default SideNavTutor;
