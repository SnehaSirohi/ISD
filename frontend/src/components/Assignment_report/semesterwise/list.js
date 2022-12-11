
import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import { CSVLink } from 'react-csv'
const List = ({ assignments, AssignmentSubmit, files, setfile, key }) => {
  const [filename, setfilename] = React.useState("")
  return (
    <>
      {assignments.map((teach, index) => {
        const { _id,date, teacher, subject, deadline, file} = teach;
        localStorage.setItem(_id,false)
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
                {_id && <form id="uploadandsubmitblock">
                  <input type="file" id='inputfilechoose' value={""} onChange={(e) => {
                    setfile(e.target.value)
                     setfilename(e.target.value)
                     }} />
                  <button className='upload_button'>Upload</button>
                  <span>{filename}</span>
                  <button className='submit_button' type='submit' onClick={AssignmentSubmit}>Submit</button>
              
                </form>}
              </td>
            </tr>
          </>
        )
      })}
    </>
  )
}

export default List
