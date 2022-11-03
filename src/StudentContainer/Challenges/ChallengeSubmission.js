import React from "react";
import "./challenges.css";
function ChallengeSubmission() {
  return (
    <div className="submit-challenge">
      <h3 className="heading center">Submit Challenge Here</h3>
      <form action="">
        <div className="input-field-challenge">
          <label htmlFor="file">Select file</label>
          <br />
          <input type="file" />
        </div>

        <button className="btn medium">Submit</button>
      </form>
    </div>
  );
}

export default ChallengeSubmission;
