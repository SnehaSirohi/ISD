import React from "react";

const List = ({ notification }) => {
    console.log("notifications : ",notification)
  return (
    <>
     {notification.map((noti)=>{
        const {name,subject}=noti;
        return(
            
            <>
            <h3>{name} has Submitted the assignment of {subject}</h3>
            </>
        )
     })}
    </>
  );
};

export default List;
