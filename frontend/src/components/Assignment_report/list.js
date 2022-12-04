import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import { CSVLink } from 'react-csv'
const List = ({ assignments,AssignmentSubmit }) => {
  return (
    <>
      {assignments.map((teach) => {
        const {date, teacher, subject, deadline, file,assignment ,setassignment } = teach;
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
            </tr>
          </>
        )
      })}
    </>
  )
}

export default List