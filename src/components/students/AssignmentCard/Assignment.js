import React from "react";
import "./assignment.css";
const Assignment = () => {
  return (
    <div className="card-assignment">
      <div className="assignment-col">
        <p>Assignment</p>
        <span>Algorithms</span>
      </div>
      <div className="assignment-col">
        <p>Course</p>
        <span>Algorithms</span>
      </div>

      <div className="assignment-col">
        <p>Submission Date</p>
        <span>22-04-2022</span>
      </div>
      <button className="btn small">Download</button>
    </div>
  );
};

export default Assignment;
