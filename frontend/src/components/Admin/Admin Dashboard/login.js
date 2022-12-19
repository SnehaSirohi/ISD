import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom"

const Loginadmin = () => {

  const [ifPasswordAndUserNameNotsame, setIfPasswordAndUserNameNotsame] = useState(false);

  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    password: ""
  })

  const [loginstatus, setLoginstatus] = useState("")

  const handleChange = (e) => {
    const { name, value } = e.target
    setUser({
      ...user,
      [name]: value
    })
  }


  const login = async (e) => {
    e.preventDefault();
    await fetch("https://isd-production.up.railway.app/adminlogin", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    }).then(async (response) => {
      let data = await response.json();
      console.log(data);
      if (data.admin) {
        localStorage.setItem('token', data.admin)
        navigate("/admindashboard");
        setLoginstatus(data.message);
      } else {
        setIfPasswordAndUserNameNotsame(true);
        setLoginstatus(data.message);
      }
    });

  }

  return (
    <>
      <section className="login2body">
        {ifPasswordAndUserNameNotsame && < div class="alert alert-danger" role="alert">
          please check your username and password!
        </div>}
        <div className="screen">
          <div className="screen__content">
            <form className="login">
              {/* <h3 className="text-dark fw-bolder fs-4 mb-2">Login for Professors</h3> */}

              <div className="login__field">
                <input
                  type="text"
                  className="login__input"
                  id="floatingInput"
                  name="name"
                  placeholder="Username"
                  value={user.name}
                  onChange={handleChange}
                />
              </div>
              <div className="form-floating mb-3">
                <input
                  type="password"
                  className="login__input"
                  id="floatingPassword"
                  name="password"
                  placeholder="Password"
                  value={user.password}
                  onChange={handleChange}
                />
              </div>
              <button
                type="submit"
                className="button login__submit"
                onClick={login}
              >
                <span className="button__text">Log In Now</span>
              </button>
            </form>
          </div>
          <div class="screen__background">
            <span class="screen__background__shape screen__background__shape4"></span>
            <span class="screen__background__shape screen__background__shape3"></span>
            <span class="screen__background__shape screen__background__shape2"></span>
            <span class="screen__background__shape screen__background__shape1"></span>
          </div>
        </div>
      </section>
    </>
  );
};


export default Loginadmin;
