import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import {CSVLink} from 'react-csv'
const List = ({material}) => {
  return (
   <>
    {material.map((teach)=>{
        const {teacher,subject,date,file}=teach;
        return(
            <>
               <tr>
            <td>{teacher}
            </td>
            <td>
              {subject}
            </td>
            <td>
              {file}
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