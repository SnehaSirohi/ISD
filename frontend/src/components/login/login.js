import React, { useState } from "react";
import "./login.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom"

const Login = () => {

  const navigate = useNavigate();
  
  const [ user, setUser] = useState({
    enrollNum: "",
    password: ""
  })

  const [loginstatus, setLoginstatus] = useState("")

  const handleChange = (e) => {
    const { name, value} = e.target
    setUser({
      ...user,
      [name]: value
    })
  }

  const login = async(e) => {
    e.preventDefault();
    await fetch("http://localhost:4000/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    }).then(async(response) => {
      let data = await response.json();
      console.log(data);
      if (data.user) {
        navigate("/");
        setLoginstatus(data.message);
      } else {
        setLoginstatus(data.message);
      }
  });

  }

  return (
    <>
      <section className="wrapper">
        <div className="container">
          <div className="col-sm-8 offset-sm-2 col-lg-6 offset-lg-3 col-xl-4 offset-xl-4 text-center">
            <form className="rounded bg-white shadow p-5">
              <h3 className="text-dark fw-bolder fs-4 mb-2">Login</h3>
        
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInput"
                  name="enrollNum"
                  placeholder="Enrollment Number"
                  value={user.enrollNum}
                  onChange={ handleChange }
                />
                <label htmlFor="floatingInput">Enrollment Number</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="password"
                  className="form-control"
                  id="floatingPassword"
                  name="password"
                  placeholder="Password"
                  value={user.password}
                  onChange={ handleChange }
                />
                <label htmlFor="floatingPassword">Password</label>
              </div>
              <button
                type="submit"
                className="btn btn-primary submi_btn w-100 my-4"
                onClick={login}
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};


export default Login;