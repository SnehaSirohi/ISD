import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./attendance.css";
const List = ({ students, setpresent,setabsent }) => {
  return (
    <>
      {students.map((student) => {
        const { name } = student;
        return (
          <tr>
            <td>{name}</td>
            <td>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="flexCheckChecked1"
                  value="Present"
                  onChange={(e) => setpresent(e.target.value)}
                />
              </div>
            </td>
            <td>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="flexCheckChecked2"
                  value="absent"
                  onChange={(e) => setabsent(e.target.value)}
                />
              </div>
            </td>
          </tr>
        );
      })}
    </>
  );
};

export default List;
