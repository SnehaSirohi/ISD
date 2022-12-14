import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import { CSVLink } from 'react-csv'
const List = ({ material }) => {
  return (
    <>
      {material.map((teach) => {
        const { teacher, subject, semester,date, file } = teach;
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
                {date}
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