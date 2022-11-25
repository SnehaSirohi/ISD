import React, { useState } from "react";
const Random=()=>{
    const [text,settext]=useState("")
    console.log(text)
    const send = async ()=>{
        const response=await fetch("http://localhost:4000/random",{
            method : "POST",
            headers:{
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body :JSON.stringify({
                text
            })
        })
    }
    return(
        <>
        <div>
            <input type="text" value={text} onChange={(e)=>settext(e.target.value)} />
            <button onClick={send} >submit here</button>
        </div>
        </>
    )
}
export default Random;