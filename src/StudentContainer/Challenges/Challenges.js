import React from "react";
import "./challenges.css";
import ChallengeInfo from "./ChallengeInfo";
import ChallengePanel from "./ChallengePanel";
import ChallengeSubmission from "./ChallengeSubmission";
function Challenges() {
  return (
    <section>
      <div className="challenge-col">
        <ChallengePanel />
        <div className="challenge-col2">
          <ChallengeInfo />
          <ChallengeSubmission />
        </div>
      </div>
    </section>
  );
}

export default Challenges;
