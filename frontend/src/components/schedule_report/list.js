import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import {CSVLink} from 'react-csv'
const List = ({classes}) => {
  return (
   <>
   
    {classes.map((teach)=>{
        const {name,subject,date,time}=teach;
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
            <td>
              {time}
            </td>
          </tr>
            </>
        )
     })}
   </>
  )
}

export default List