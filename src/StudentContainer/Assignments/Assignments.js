import React from "react";
import AssignmentPanel from "./AssignmentPanel";
import SubmitForm from "./SubmitForm";
import "./assignment.css";
const Assignments = () => {
  return (
    <section className="assignment-container">
      <AssignmentPanel />
      <SubmitForm />
    </section>
  );
};

export default Assignments;
