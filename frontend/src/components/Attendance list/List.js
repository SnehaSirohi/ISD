import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./attendance.css";

const List = ({ students, status,setstatus}) => {
  
  useEffect(()=>{
    let obj = {}
    {students.map((student) => {
      const { name,rollNum } = student;
      obj[name]=false;
    })}
    setstatus(obj)
  },[students])

  return (
    
    <>
    
      {students.map((student) => {
        const { name,rollNum } = student;
        return (
          <tr>
            <td>{name} {rollNum}
            </td>
            <td>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="flexCheckChecked1"
                  onChange={(e) =>setstatus({...status,[`${name}`]:e.target.checked})}
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
