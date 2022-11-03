import React from "react";
import "./pagenotfound.css";
const PageNotFound = () => {
  return (
    <div>
      <div className="mainbox">
        <div className="code">404</div>
        <div className="error">Page not Found</div>
        <div className="guide">Return to Home to solve this error</div>
        <button className="btn big">Home</button>
      </div>
    </div>
  );
};

export default PageNotFound;
