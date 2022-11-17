import React, { useEffect, useState } from 'react'
import jwt from 'jsonwebtoken'
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom";

const ChangePassword = () => {

   

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
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary submi_btn w-100 my-4"
                // onClick={login}
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