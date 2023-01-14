import React, { useState, useEffect } from "react";
import "./nav.css";
import { MdOutlineLogout } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { current } from "@reduxjs/toolkit";
import { logout } from "../../../redux/userSlice";
import axios from "axios";

const Nav = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.currentUser);
  const handleLogout = () => {
    dispatch(logout());
  };
  useEffect(() => {
    // check if logged in with cookie
    const checkLogin = async () => {
      try {
        const res = await axios.get(
          "https://nolojia-backend.onrender.com/api/nolojia/v1/auth/loggedin",
          { withCredentials: true }
        );
      } catch (error) {
      }
    };
    checkLogin();
  });
  useEffect(() => {
    if (currentUser != null) {
      setUser(currentUser);
    } else {
      navigate("/login");
    }
  }, [currentUser]);

  return (
    <div className="nav--bar">
      <div></div>
      <div className="profile-details">
        {user.img != "" ? <img src={user.img} alt="profile" /> : <FaUserAlt />}
        <p className="profile--name">{user.name}</p>
        <MdOutlineLogout onClick={handleLogout} />
      </div>
    </div>
  );
};

export default Nav;
