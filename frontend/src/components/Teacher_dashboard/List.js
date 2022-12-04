import React from "react";

const List = ({ notification }) => {
    console.log("notifications : ",notification)
  return (
    <>
     {notification.map((noti)=>{
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
