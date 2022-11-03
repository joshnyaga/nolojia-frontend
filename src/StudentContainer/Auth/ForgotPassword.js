import React, { useState } from "react";
import "./auth.css";
import axios from "axios";
import swal from "sweetalert";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ForgotPassword = () => {
  const [focusEmail, setFocusEmail] = useState(false);
  const [email, setEmail] = useState("");
  const handleSubmit = async () => {
    try {
      const url = `/auth/sendLink`;
      const { data } = await axios.post(
        url,
        { email: email },
        { withCredentials: true }
      );
      toast.promise(data, {
        pending: "Checking our database...",
        success: "Done",
        error: "An error occurred",
      });
      console.log(data);
      swal("Check your email", data.message, "success");
    } catch (error) {
      toast(error.response.data.message);
    }
  };
  return (
    <div className="auth-forgot">
      <div className="form">
        <h2 className="title">Forgot Password</h2>
        <div className="input-field forgot-input">
          <input
            type="email"
            name="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            autoComplete="off"
            placeholder="Email"
            onBlur={(e) => {
              setFocusEmail(true);
            }}
            focussed={focusEmail.toString()}
            required
          />
          <span>Email is not valid</span>
        </div>
        <button onClick={handleSubmit} className="btn">
          Submit
        </button>
      </div>
      <ToastContainer theme="dark" />
    </div>
  );
};

export default ForgotPassword;
