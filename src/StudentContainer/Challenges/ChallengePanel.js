import React from "react";
import Challenge from "../../components/students/ChallengeCard/Challenge";
import "./challenges.css";
function ChallengePanel() {
  return (
    <div className="challenge-panel">
      <div className="challenge-search">
        <input type="text" placeholder="search challenge by name" />
        <button className="btn">Search...</button>
      </div>
      <Challenge />
      <Challenge />
      <Challenge />
    </div>
  );
}

export default ChallengePanel;
