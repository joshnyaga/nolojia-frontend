import React from "react";
import Assignment from "../../components/students/AssignmentCard/Assignment";
import "./assignment.css";
const AssignmentPanel = () => {
  return (
    <div className="assignment-panel">
      <div className="assignment-search">
        <input type="text" placeholder="search assignement" />
        <button className="btn">Search...</button>
      </div>
      <div className="course-filter">
        <select name="filter" id="filter">
          <option>Html and Css</option>
          <option>Java Basics</option>
          <option>Algorithms and Data Structure</option>
        </select>
      </div>
      <Assignment />
      <Assignment />
      <Assignment />
      <Assignment />
    </div>
  );
};

export default AssignmentPanel;
