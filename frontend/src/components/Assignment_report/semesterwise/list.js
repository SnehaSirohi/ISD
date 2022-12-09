
import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import { CSVLink } from 'react-csv'
const List = ({ assignments, AssignmentSubmit, files, setfile, key }) => {
  return (
    <>
      {assignments.map((teach, index) => {
        const { date, teacher, subject, deadline, file } = teach;
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
                <form id="uploadandsubmitblock">
                  <input type="file" id='inputfilechoose' value={files} onChange={(e) => setfile(e.target.value)} key={teach.id} />
                  <button className='upload_button'>Upload</button>
                  <button type='submit' onClick={AssignmentSubmit}>Submit</button>
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
