import React, { Suspense } from "react";
import ReactLoading from "react-loading";
const Courses = React.lazy(() => import("../StudentContainer/Courses/Courses"));
const CoursesPage = () => {
  return (
    <div>
      <Suspense
        fallback={
          <div className="middle">
            <ReactLoading
              type="spin"
              color="#101050"
              height={700}
              width={375}
            />
          </div>
        }
      >
        <Courses />
      </Suspense>
    </div>
  );
};

export default CoursesPage;
