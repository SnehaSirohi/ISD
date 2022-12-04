
import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import { CSVLink } from 'react-csv'
const List = ({ assignments,AssignmentSubmit,files,setfile }) => {
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
                <form>
                <input type="file" value={files} onChange={(e)=>setfile(e.target.value)} />
                <button type='submit'  onClick={AssignmentSubmit}>Submit</button>
                </form>
              </td>
            </tr>
          </>
        )
      })}
    </>
  )
}

export default List
