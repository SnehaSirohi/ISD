import React from 'react'

const List = ({student}) => {
  return (
   <>
    {student.map((stu)=>{
        const {name,attendanceStatus}=stu;
        return(
            <>
               <tr>
            <td>{name}
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