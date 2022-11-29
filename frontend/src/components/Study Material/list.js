import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import { CSVLink } from 'react-csv'
const List = ({ teacher }) => {
  return (
    <>
      {teacher.map((teach) => {
        const { teacher, subject, semester, file } = teach;
        return (
          <>
            <tr>
              <td>{teacher}
              </td>
              <td>
                {subject}
              </td>
              <td>
                {semester}
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