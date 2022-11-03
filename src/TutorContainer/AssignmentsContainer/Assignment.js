import React from "react";
import "./assignment.css";
const Assignment = () => {
  return (
    <section className="content-tutor">
      <div className="search-bar">
        <select name="task" id="task">
          <option value="somevalue">Some value loop this</option>
        </select>
      </div>
      <table class="styled-table">
        <thead>
          <tr>
            <th>No.</th>
            <th>Student name</th>
            <th>Lesson name</th>
            <th>zip file</th>
            <th>Add comment</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>SOS-1743</td>
            <td>Shopokoa</td>
            <td>300</td>
            <td>375</td>
            <td>02/02/2022</td>
            <td>02/07/2022</td>
            <td>Overdue</td>
          </tr>
        </tbody>
      </table>
    </section>
  );
};

export default Assignment;
