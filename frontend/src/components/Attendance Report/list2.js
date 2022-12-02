import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import {CSVLink} from 'react-csv'
const List = ({student}) => {
  return (
   <>
    {student.map((stu)=>{
        const {date,attendanceStatus,subject}=stu;
        return(
            <>
            <tr>
            <td>
                {subject}
            </td>
            <td>
              {date}
            </td>
            <td>
                {attendanceStatus}
            </td>
          </tr>
            </>
        )
     })}
   </>
  )
}

export default List