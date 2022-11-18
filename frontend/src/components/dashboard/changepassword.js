import React, { useEffect, useState } from 'react'
import jwt from 'jsonwebtoken'
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom";


const ChangePassword = () => {

   const [oldpassword, setOldpassword] = useState("")
   const [newpassword, setNewpassword] = useState("")
   const [confirmpassword, setConfirmpassword] = useState("")
   const [errmsg, setErrmsg] = useState("")

    const updatepassword = async(e) => {
        e.preventDefault()
        if(oldpassword === newpassword)
        {
            setErrmsg("Old password and New password cannot be same");
        }else if(newpassword !== confirmpassword){
            setErrmsg("Confirm password and new password must be same");
        } else{
            const req = await fetch('http://localhost:4000/dashboard/changepassword', {
                method: "PATCH",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },    
            oldpassword, 
            newpassword, 
            enrollNum: localStorage.getItem(users)})
            console.log(req)
        }
    }

    return(
        <>
        <section className="wrapper">
        <div className="container">
          <div className="col-sm-8 offset-sm-2 col-lg-6 offset-lg-3 col-xl-4 offset-xl-4 text-center">
            <form className="rounded bg-white shadow p-5">
              <h3 className="text-dark fw-bolder fs-4 mb-2">Change Password</h3>
        
              <label htmlFor="floatingInput">Old Password</label>
              <div className="form-floating mb-3">
                <input
                  type="password"
                  className="form-control"
                  id="floatingInput"
                  name="old_password"
                  placeholder="Old Password"
                  onChange={(e)=>{
                    setOldpassword(e.target.value)
                  }}
                />
              </div>

              <label htmlFor="floatingPassword">New Password</label>
              <div className="form-floating mb-3">
                <input
                  type="password"
                  className="form-control"
                  id="floatingPassword"
                  name="new_password"
                  placeholder="New Password"
                  onChange={(e)=>{
                    setNewpassword(e.target.value)
                  }}
                />
              </div>

              <label htmlFor="floatingConfirmPassword">Confirm Password</label>
              <div className="form-floating mb-3">
                <input
                  type="password"
                  className="form-control"
                  id="floatingConfirmPassword"
                  name="confirm_password"
                  placeholder="Confirm Password"
                  onChange={(e)=>{
                    setConfirmpassword(e.target.value)
                  }}
                />
              </div>
              {
                errmsg?<h3 className='text-danger'>{errmsg}</h3>: ""
              }

              <button
                type="submit"
                className="btn btn-primary submi_btn w-100 my-4"
                onClick={updatepassword}
              >
                Update Password
              </button>
            </form>
          </div>
        </div>
      </section>
        </>
    );
    
}

export default ChangePassword