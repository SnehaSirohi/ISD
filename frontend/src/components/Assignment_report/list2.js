import React from 'react'

const List2 = ({submissions}) => {
  return (
    <>
    {submissions.map((submission)=>{
        const {name,date,files,semester}=submission
        return(
            <>
    <tr>
        <td>{name}</td>
        <td>{semester}</td>
        <td>{date}</td>
        <td>{files}</td>
    </tr>
            </>
        )
    })}
    </>
  )
}

export default List2;