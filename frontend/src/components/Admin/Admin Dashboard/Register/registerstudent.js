import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from '../../../Admin Dashboard/Navbar'

function StudentRegister() {
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false)
  const [user, setUser] = useState({
    name: "",
    semester: "",
    email: "",
    rollNum: "",
    contactNum: "",
    enrollNum: "",
    password: ""
  })

  const [errmsg, setErrmsg] = useState("")

  const handleChange = (e) => {
    const { name, value } = e.target
    setUser({
      ...user,
      [name]: value
    })
  }

  async function Register(e) {
    e.preventDefault()

      const response = await fetch("https://isd-production.up.railway.app/register", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
  
      const data = await response.json();
      setSuccess(data.success)
    setTimeout(() => {
      setSuccess(false)
      navigate('/admindashboard')
    }, 2500)
     
  if(data.status === "notok"){
        setErrmsg(data.msg)
      }
  
    }  

  return (
    <>
    <Navbar />
     <section>
        <div className="container pt-10">
          <div className="col-sm-8 offset-sm-2 col-lg-6 offset-lg-3 col-xl-4 offset-xl-4 text-center">
            <form className="rounded bg-white shadow p-5" >
              <h3 className="text-dark fw-bolder fs-4 mb-2">Register new Student</h3>

              <label htmlFor="floatingInput">Name</label>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInput"
                  name="name"
                  placeholder="name"
                  value={user.name}
                  onChange={handleChange}
                />
              </div>

              <label htmlFor="floatingInput">Semester</label>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInput"
                  name="semester"
                  placeholder="Semester"
                  value={user.semester}
                  onChange={handleChange}
                />
              </div>

              <label htmlFor="floatingemail">Email</label>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="floatingemail"
                  name="email"
                  placeholder="Email"
                  value={user.email}
                  onChange={handleChange}
                />
              </div>

              <label htmlFor="floatingid">Roll Number</label>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="floatingid"
                  name="rollNum"
                  placeholder="Roll Number"
                  value={user.rollNum}
                  onChange={handleChange}
                />
              </div>

              <label htmlFor="floatingcontact">Contact Number</label>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="floatingcontact"
                  name="contactNum"
                  placeholder="Contact Number"
                  value={user.contactNum}
                  onChange={handleChange}
                />
              </div>

              <label htmlFor="floatingInput">Enrollment Number</label>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInput"
                  name="enrollNum"
                  placeholder="Enrollment Number"
                  value={user.enrollNum}
                  onChange={handleChange}
                />
              </div>

              <label htmlFor="floatingPassword">Password</label>
              <div className="form-floating mb-3">
                <input
                  type="password"
                  className="form-control"
                  id="floatingPassword"
                  name="password"
                  placeholder="Password"
                  value={user.password}
                  onChange={handleChange}
                />
              </div>

              {
                errmsg ? <h3 className='text-danger'>{errmsg}</h3> : ""
              }

              <button
                type="submit"
                className="btn btn-primary submi_btn w-100 my-4"
                onClick={Register}
              >
                Register
              </button>
            </form>
          </div>
        </div>
      </section>
      {success && <div className="container-fluid blacky">
          <div className="success">
            <div classNam="wrappertick"> <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"> <circle className="checkmark__circle" cx={26} cy={26} r={25} fill="none" /> <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
            </svg>
            </div>
            <h4>Student Registered succesfully</h4>
          </div>
        </div>}
    </>
  );
}

export default StudentRegister;
