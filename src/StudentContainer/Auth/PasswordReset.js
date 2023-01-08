import React, { useState, useEffect } from "react";
import "./auth.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
const PasswordReset = () => {
  const [validUrl, setValidUrl] = useState(false);
  const id = useLocation().pathname.split("/")[2];
  const token = useLocation().pathname.split("/")[3];

  const [focusPassword, setFocusPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [focusConfirmPassword, setFocusConfirmPassword] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const verifyUrl = async () => {
      try {
        const url = `/api/nolojia/v1/auth/verify/${id}/${token}`;
        const { data } = await axios.get(url);
        console.log(data);
        setValidUrl(true);
      } catch (error) {
        console.log(error.response.data.message);
        setValidUrl(false);
      }
    };
    verifyUrl();
  }, [id, token]);
  const handleSubmit = async () => {
    try {
      const { data } = await axios.post(
        `/api/nolojia/v1/auth/reset/${id}/${token}`,
        { password: password },
        { withCredentials: true }
      );
      console.log(data);

      swal("success", "Password changed", "success");
      navigate("/login");
    } catch (error) {
      swal("error", error.response.data.message, "error");
      console.log(error.response.data.message);
    }
  };
  return (
    <div className="auth-forgot">
      {validUrl ? (
        <div className="form">
          <h2 className="title">Reset Password</h2>
          <div className="input-field forgot-input">
            <input
              type="password"
              name="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"
              autoComplete="off"
              placeholder="New Password"
              onBlur={(e) => {
                setFocusPassword(true);
              }}
              focussed={focusPassword.toString()}
              required
            />
            <span>
              Minimum eight characters, at least one letter and one number:
            </span>
          </div>
          <div className="input-field forgot-input">
            <input
              type="password"
              name="confirmPassword"
              autoComplete="off"
              placeholder="Confirm password"
              pattern={password}
              onBlur={(e) => {
                setFocusConfirmPassword(true);
              }}
              focussed={focusConfirmPassword.toString()}
              required
            />
            <span>Passwords do not match</span>
          </div>
          <button onClick={handleSubmit} className="btn">
            Submit
          </button>
        </div>
      ) : (
        <h1 className="text-center">404 - NOT FOUND</h1>
      )}
    </div>
  );
};

export default PasswordReset;
