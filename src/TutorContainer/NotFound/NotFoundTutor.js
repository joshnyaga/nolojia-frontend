import React from "react";
import "./notfound.css";
import { Link } from "react-router-dom";
const NotFoundTutor = () => {
  return (
    <div>
      <div className="mainbox">
        <div className="code">404</div>
        <div className="error">Page not Found</div>
        <div className="guide">Return to Home to solve this error</div>
        <Link to="/admin/" className="btn medium">
          Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundTutor;
