import React from "react";
import "./challenge.css";
function Challenge() {
  return (
    <div className="card-challenge">
      <div className="challenge-col">
        <p>challenge</p>
        <span>Algorithms</span>
      </div>
      <div className="challenge-col">
        <p>Prize</p>
        <span>Laptop</span>
      </div>

      <div className="challenge-col">
        <p>Submission Date</p>
        <span>22-04-2022</span>
      </div>
    </div>
  );
}

export default Challenge;
