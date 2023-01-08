import React, { useState, useEffect } from "react";
import { MdOutlineLogout } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";
import profile from "../../../images/aiimg.png";
import "./navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../redux/userSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Navbar = () => {
  const currentUser = useSelector((state) => state.currentUser);
  const dispatch = useDispatch();
  const router = useNavigate();
  const [userName, setUserName] = useState("");
  const [userImg, setUserImg] = useState("");
  const handleLogout = () => {
    dispatch(logout());
  };
  useEffect(() => {
    // check if logged in with cookie
    const checkLogin = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3001/api/nolojia/v1/auth/loggedin",
          { withCredentials: true }
        );
      } catch (error) {
        handleLogout();
      }
    };
    checkLogin();
  });
  useEffect(() => {
    if (currentUser != null) {
      setUserName(currentUser.name);
      setUserImg(currentUser.img);
      if (currentUser.type == "tutor") {
        router("/admin");
      }
    } else {
      router("/login");
      return;
    }
    return;
  }, [currentUser]);
  return (
    <div className="nav">
      <div className="left"></div>
      <div className="right">
        {userImg == "" ? <FaUserAlt /> : <img src={profile} alt="" />}
        <p>{userName}</p>
        <MdOutlineLogout onClick={handleLogout} />
      </div>
    </div>
  );
};

export default Navbar;
