import React, { useState } from "react";
import "./loginteacher.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom"

const Loginteacher = () => {

  const navigate = useNavigate();
  
  const [ user, setUser] = useState({
    Teacher_id: "",
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
    await fetch("http://localhost:4000/loginteacher", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    }).then(async(response) => {
      let data = await response.json();
      console.log(data);
      if (data.teacher) {
        localStorage.setItem('token', data.teacher)
        alert("login successful")
        navigate("/Teacherdashboard");
        setLoginstatus(data.message);
      } else {
        alert("please check your username and password")
        setLoginstatus(data.message);
      }
  });

  }

 return (
        <div class="login2body">
            <div class="screen">
                <div class="screen__content">
                    <form class="login">
                        <div class="login__field">
                            <input type="text" class="login__input" placeholder="Professor ID" name="Teacher_id" value={user.Teacher_id} onChange={handleChange} />
                        </div>
                        <div class="login__field">
                            <input type="password" class="login__input" placeholder="Password" name="password" value={user.password} onChange={handleChange} />
                        </div>
                        <button class="button login__submit" type="submit">
                            <span class="button__text" onClick={login}  >Log In Now</span>
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
        </div>
    );
};


export default Loginteacher;
