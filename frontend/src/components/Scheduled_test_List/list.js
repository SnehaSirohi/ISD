import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import {CSVLink} from 'react-csv'
const List = ({tests}) => {
  return (
   <>
    {tests.map((test)=>{
        const {name,subject,date,time}=test;
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