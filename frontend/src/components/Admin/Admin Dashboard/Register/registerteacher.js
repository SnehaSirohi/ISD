import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function TeacherRegister() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    Teacher_id: "",
    contactNum: "",
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
    
      const response = await fetch("http://localhost:4000/registerteacher", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
  
      const data = await response.json();
      console.log(data)
      if (data.status === "ok") {
        setErrmsg("")
        alert("Teacher Added succesfully")
      }
    
    }
   
  return (
    <>
     <section className="wrapper ">
        <div className="container pt-10">
          <div className="col-sm-8 offset-sm-2 col-lg-6 offset-lg-3 col-xl-4 offset-xl-4 text-center">
            <form className="rounded bg-white shadow p-5" >
              <h3 className="text-dark fw-bolder fs-4 mb-2">Register new Teacher</h3>

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

              <label htmlFor="floatingid">Teacher's ID</label>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="floatingid"
                  name="Teacher_id"
                  placeholder="Teacher's ID"
                  value={user.Teacher_id}
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
    </>
  );
}

export default TeacherRegister;
