import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import {CSVLink} from 'react-csv'
const List = ({data2}) => {
  return (
   <>
    {data2.map((data)=>{
        const {date,name,subject,semester}=data;
        return(
            <>
               <tr>
            <td>
              {name}
            </td>
            <td>
              {subject}
            </td>
            <td>
              {date}
            </td>
            <td>
                {semester}
            </td>
          </tr>
            </>
        )
     })}
   </>
  )
}

export default List