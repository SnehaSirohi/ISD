import React from "react";

const List = ({ notification, teacher }) => {
    console.log("notifications : ",notification)

    const notifi=notification.filter((data) => {
      if(teacher == "Unmesh Shukla")
      {
        if(data.subject=="Database Systems" || data.subject=="Algorithms and Data Structure" || data.subject=="Cloud Computing" || data.subject=="Health Informatics")
        {
          return data
        }
      }
      else if(teacher == "Nitisha Aggarwal")
      {
        if(data.subject=="Software Design & Programming" || data.subject=="Computer Communication and Networks" || data.subject=="Operating Systems" || data.subject=="Information System Design" || data.subject=="Internet of Things Systems, Security and Cloud")
        {
          return data
        }
      }
      else if(teacher == "M.K Das")
      {
        if(data.subject=="Mathematical Foundation of Computing" || data.subject=="Applied Machine Learning" || data.subject=="Software Engineering" || data.subject=="Research Methods in Informatics")
        {
          return data
        }
      }
      else if(teacher == "Sunil Kumar")
      {
        if(data.subject=="Computer System Architecture")
        {
          return data
        }
      }
      else if(teacher == "Sanjeev Singh")
      {
        if(data.subject=="Open Elective-1")
        {
          return data
        }
      }
      else if(teacher == "Manish")
      {
        if(data.subject=="IT Planning and Management" || data.subject=="Algorithms and Data Structure" || data.subject=="Cloud Computing")
        {
          return data
        }
      }
    })
    console.log(notifi)
  
  return (
    <>
     {notifi.map((noti)=>{
        const {name,subject}=noti;
        return(
            
            <>
            
            <div className="container noti">

<h5>{name} has Submitted the assignment of {subject}</h5>

            </div>
            
            </>
        )
     })}
    </>
  );
};

export default List;
