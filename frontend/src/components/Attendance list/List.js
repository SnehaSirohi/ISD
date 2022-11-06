import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./attendance.css";
const List = ({ students }) => {
  return (
    <>
      {students.map((student) => {
        const {name} = student;
        return (
          <tr>
            <td>{name}</td>
            <td>
            <div className="form-check">
  <input className="form-check-input" type="checkbox"  id="flexCheckChecked" />
  <label className="form-check-label" htmlFor="flexCheckChecked">
    Present
  </label>
</div>

            </td>
          </tr>
        );
      })}
    </>
  );
};

export default List;
