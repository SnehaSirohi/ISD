import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import { CSVLink } from 'react-csv'
const List = ({ assignments,AssignmentSubmit,files,setfile }) => {
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
              <td>
                <form>
                <input type="file" value={file} onChange={(e)=>setfile(e.target.value)} required />
                <button  onClick={AssignmentSubmit}>Submit</button>
                </form>
                {/* <button onClick={AssignmentSubmit}>Submit</button> */}
              </td>
            </tr>
          </>
        )
      })}
    </>
  )
}

export default List