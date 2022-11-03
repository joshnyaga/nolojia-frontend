import React from "react";
import { Link } from "react-router-dom";
import "./livestream.css";
const NoLiveStream = () => {
  return (
    <div>
      <section className="mainbox-livestream">
        <div className="code-livestream">No LiveStream</div>
        <div className="error-livestream">
          Currently there is no livestream. Please check the schedule to confirm
        </div>
        <div className="guide-livestream">
          Contact the admin incase there is an error
        </div>
        <Link to="/schedule" className="btn medium">
          Go to Schedule
        </Link>
      </section>
    </div>
  );
};

export default NoLiveStream;
