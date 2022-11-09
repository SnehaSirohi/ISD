import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./attendance.css";
const List = ({ students, status,setstatus}) => {
  // console.log("student:",students)
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
                  onChange={(e) =>setstatus({...status,[`${name}`]:"Present"})}
                />
              </div>
            </td>
            <td>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="flexCheckChecked2"
                  onChange={(e) => setstatus({...status,[`${name}`]:"Absent"})}
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
