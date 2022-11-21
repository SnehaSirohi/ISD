import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
const List = ({student}) => {
  return (
   <>
    {student.map((stu)=>{
        const {date,name,attendanceStatus,subject}=stu;
        return(
            <>
               <tr>
            <td>{name}
            </td>
            <td>
              {attendanceStatus}
            </td>
            <td>
              {date}
            </td>
            <td>
              {subject}
            </td>
          </tr>
            </>
        )
     })}
   </>
  )
}

export default List