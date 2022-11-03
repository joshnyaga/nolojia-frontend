import React from "react";
import { useLocation } from "react-router-dom";
import LessonPanel from "./LessonPanel";
import LessonSearch from "./LessonSearch";
import ViewPanel from "./ViewPanel";

const LessonContainer = () => {
  const query = useLocation().search;
  return (
    <section className="content-tutor lessons-tutor">
      {query ? <LessonSearch /> : <LessonPanel />}

      <ViewPanel />
    </section>
  );
};

export default LessonContainer;
