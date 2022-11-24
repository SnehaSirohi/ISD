import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import {CSVLink} from 'react-csv'
const List = ({teacher}) => {
  return (
   <>
    {teacher.map((teach)=>{
        const {name,subject,date}=teach;
        return(
            <>
               <tr>
            <td>{name}
            </td>
            <td>
              {subject}
            </td>
            <td>
              {date}
            </td>
          </tr>
            </>
        )
     })}
   </>
  )
}

export default List