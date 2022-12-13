
import React, { useEffect } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import { CSVLink } from 'react-csv'
const List = ({ assignments, AssignmentSubmit, files, setfile, key, removefileid, setremovefileid, temp, setTemp }) => {
  useEffect(() =>{
    if(files.id !== "")
    {
      localStorage.setItem(files.id, files.name)
      setTemp({id: files.id, name: files.name})
      setremovefileid("")
    }
  },[files])

  return (
    <>
      {assignments.map((teach, index) => {
        const { _id,date, teacher, subject, deadline, file} = teach;
        // localStorage.setItem(_id,"")

        
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
              <td style={{backgroundColor:'#81ffc487'}}>
                <form id="uploadandsubmitblock" >
                  <input type="file" id='inputfilechoose' value={""} onChange={(e) => {
                    setfile({id: _id, name: e.target.value})
                     }} />
                  <button className='upload_button'>Upload</button>  
                  <span>{removefileid !== _id && (localStorage.getItem(_id) || (_id===temp.id && temp.name)) }</span>
                  <button className='submit_button' type='submit' onClick={(e)=>{AssignmentSubmit(e, _id)}}>Submit</button>
              
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
