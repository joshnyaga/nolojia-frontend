import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import "./auth.css";
const EmailVerify = () => {
  //https://cdn.pixabay.com/photo/2015/06/09/16/12/error-803716_960_720.png
  const [validEmail, setValidEmail] = useState(false);
  const pathname1 = useLocation().pathname.split("/")[2];
  const pathname2 = useLocation().pathname.split("/")[4];
  useEffect(() => {
    const verifyEmailUrl = async () => {
      try {
        const url = `/auth/${pathname1}/verify/${pathname2}`;
        const { data } = await axios.get(url, { withCredentials: true });
        console.log(data);
        setValidEmail(true);
      } catch (error) {
        console.log(error.response.data.message);
        setValidEmail(false);
      }
    };
    verifyEmailUrl();
  }, [pathname1, pathname2]);
  return (
    <div className="verification">
      {validEmail ? (
        <div className="card-verification">
          <div className="icon-container-success">
            <i className="checkmark">✓</i>
          </div>
          <h1>Success</h1>
          <p>
            Email verified successfully;
            <br /> Click the button below to go to login page!
          </p>
          <Link to="/login" className="btn">
            login
          </Link>
        </div>
      ) : (
        <div className="card-verification">
          <div className="icon-container-error">
            <i className="checkmark">x</i>
          </div>
          <h1>Error</h1>
          <p>
            The link is already invalid
            <br /> You can request a new link or check email for latest link!
          </p>
          <Link to="/login" className="btn">
            login
          </Link>
        </div>
      )}
    </div>
  );
};

export default EmailVerify;
