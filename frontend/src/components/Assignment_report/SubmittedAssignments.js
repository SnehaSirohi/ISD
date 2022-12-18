import React from 'react'

const SubmittedAssignments = ({assid}) => {
 const fetchdata = async () => {
    const response = await fetch("http://localhost:4000/submittedassignments", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        'x-access-token': localStorage.getItem('token'), //
      }
    })
    const json = await response.json()
    if (json.data.length != 0) {
    //   setVisible(true)
    //   setString("Assignments Posted ")
    }else{
    //   setString("No Assignments Posted !")
    }
  }
  return (
   <>
   </>
  )
}

export default SubmittedAssignments
