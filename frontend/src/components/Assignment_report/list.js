import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import { CSVLink } from 'react-csv'
const List = ({ assignments }) => {
  return (
    <>
      {assignments.map((teach) => {
        const {date, teacher, subject, deadline, file } = teach;
        return (
          <>
            <tr>
              <td>
                {date}
              </td>
              <td>{teacher}
              </td>
              <td>
                {subject}
              </td>
              <td>
                {deadline}
              </td>
              <td>
                {file}
              </td>
              <td>
                <button  style={{backgroundColor:'#007bff', color:'white',borderRadius:"10px",border:"none", height:"30px", width:"10rem",opacity:"0.8"}} >View Submissions</button>
              </td>
            </tr>
          </>
        )
      })}
    </>
  )
}

export default List