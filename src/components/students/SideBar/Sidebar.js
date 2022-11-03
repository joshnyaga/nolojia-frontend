import React from "react";
import logo from "../../../images/nolojiaWhite.png";
import { Outlet, Link, useLocation } from "react-router-dom";
import "./sidenav.css";
import { RiDashboardFill } from "react-icons/ri";
import { SiCoursera } from "react-icons/si";
import { AiFillSchedule } from "react-icons/ai";
import { AiFillVideoCamera } from "react-icons/ai";
import { FaTasks } from "react-icons/fa";
import { useSelector } from "react-redux";

import { MdAssignment } from "react-icons/md";
import Navbar from "../Nav/Navbar";
const Sidebar = () => {
  const pathname = useLocation().pathname.split("/")[1];
  return (
    <>
      <Navbar />
      <div className="sidebar">
        <div className="logo">
          <img src={logo} alt="School logo" />
        </div>
        <div className="sidebar--links">
          <Link className={`${pathname === "" ? "active" : "link"}`} to="/">
            <div className="links--box">
              <RiDashboardFill />
              <p className="box--title">Main</p>
            </div>
          </Link>

          <Link
            className={`${pathname === "courses" ? "active" : "link"}`}
            to="/courses"
          >
            <div className="links--box">
              <SiCoursera />
              <p className="box--title">Courses</p>
            </div>
          </Link>
          <Link
            to="/schedule"
            className={`${pathname === "schedule" ? "active" : "link"}`}
          >
            <div className="links--box">
              <AiFillSchedule />
              <p className="box--title">Schedule</p>
            </div>
          </Link>
          {/* <Link to="/materials">
          <div className="links--box">
              <i className="fa fa-book"></i>
              <p className="box--title">Materials</p>
          </div>
          </Link> */}
          <Link
            to="/livestream"
            className={`${pathname === "livestream" ? "active" : "link"}`}
          >
            <div className="links--box">
              <AiFillVideoCamera />
              <p className="box--title">LiveStream</p>
            </div>
          </Link>
          <Link
            to="/challenges"
            className={`${pathname === "challenges" ? "active" : "link"}`}
          >
            <div className="links--box">
              <FaTasks />
              <p className="box--title">Challenges</p>
            </div>
          </Link>
          <Link
            to="/assignments"
            className={`${pathname === "assignments" ? "active" : "link"}`}
          >
            <div className="links--box">
              <MdAssignment />
              <p className="box--title">Assignments</p>
            </div>
          </Link>
        </div>
        <div className="sidebar--logoff"></div>
      </div>
      <Outlet />
    </>
  );
};

export default Sidebar;
