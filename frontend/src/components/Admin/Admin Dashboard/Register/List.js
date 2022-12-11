import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import {CSVLink} from 'react-csv'
const List = ({jsonData}) => {
  return (
   <>
    {jsonData.map((data)=>{
        const {name,semester, email, rollNum, contactNum, enrollNum,}=data;
        return(
            <>
               <tr>
            <td>
              {name}
            </td>
            <td>
                {semester}
            </td>
            <td>
                {email}
            </td>
            <td>
                {rollNum}
            </td>

            <td>
                {contactNum}
            </td>
            <td>
                {enrollNum}
            </td>
          </tr>
            </>
        )
     })}
   </>
  )
}

export default List