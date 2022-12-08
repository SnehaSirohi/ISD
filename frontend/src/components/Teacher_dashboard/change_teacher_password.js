import React, { useEffect, useState } from 'react'
import jwt from 'jsonwebtoken'
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom";
import "./change_teach_password.css"


const ChangeTeacherPassword = () => {

  const navigate = useNavigate();
  const [teacher_id, setTeacher_id] = useState([])
  const [allpasswords, setAllpasswords] = useState({
    oldpassword: "",
    newpassword: "",
    confirmpassword: ""
  })
  const [errmsg, setErrmsg] = useState("")

  const handleChange = (e) => {
    const { name, value} = e.target
    setAllpasswords({
      ...allpasswords,
      [name]: value
    })
  }


  async function updatepassword(e) {
    e.preventDefault()

    if (allpasswords.oldpassword === allpasswords.newpassword) {
//       return(
//         <div class="alert alert-danger d-flex align-items-center" role="alert">
//   <svg class="bi flex-shrink-0 me-2" role="img" aria-label="Danger:"><use xlink:href="#exclamation-triangle-fill"/></svg>
//   <div>
//     An example danger alert with an icon
//   </div>
// </div>
//       )
      setErrmsg("Old password and New password cannot be same");
    } else if (allpasswords.newpassword !== allpasswords.confirmpassword) {
      setErrmsg("Confirm password and new password must be same");
    } else {
      const req = await fetch('http://localhost:4000/Teacherdashboard/changepassword', {
        method: "PATCH",
        headers: {

          Accept: "application/json",
          "Content-Type": "application/json",
          'x-access-token': localStorage.getItem('token'),
        },
        body: JSON.stringify(allpasswords),
      }
      )
      const json = await req.json()
      console.log(json)
      if (json.status === 'ok') {
        setTeacher_id(json.Teacher_id)
      }
      // console.log(teacher_id)
      if (json) {
        setErrmsg("")
        alert("Password updated successful")
        navigate("/loginteacher");
      }
    }

  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      const user = jwt.decode(token)
      if (!user) {
        localStorage.removeItem('token')
        navigate("/Teacherdashboard");
      }
    }
  }, [teacher_id])

  return (
    <>
      <section className="wrapper ">
        <div className="container pt-10">
          <div className="col-sm-8 offset-sm-2 col-lg-6 offset-lg-3 col-xl-4 offset-xl-4 text-center">
            <form className="rounded bg-white shadow p-5" >
              <h3 className="text-dark fw-bolder fs-4 mb-2">Change Password</h3>

              <label htmlFor="floatingInput">Old Password</label>
              <div className="form-floating mb-3">
                <input
                  type="password"
                  className="form-control"
                  id="floatingInput"
                  name="oldpassword"
                  placeholder="Old Password"
                  value={allpasswords.oldpassword}
                  onChange={handleChange}
                />
              </div>

              <label htmlFor="floatingPassword">New Password</label>
              <div className="form-floating mb-3">
                <input
                  type="password"
                  className="form-control"
                  id="floatingPassword"
                  name="newpassword"
                  placeholder="New Password"
                  value= {allpasswords.newpassword}
                  onChange={handleChange}
                />
              </div>

              <label htmlFor="floatingConfirmPassword">Confirm Password</label>
              <div className="form-floating mb-3">
                <input
                  type="password"
                  className="form-control"
                  id="floatingConfirmPassword"
                  name="confirmpassword"
                  placeholder="Confirm Password"
                  value= {allpasswords.confirmpassword}
                  onChange={handleChange}

                />
              </div>
              {
                errmsg ? <h3 className='text-danger'>{errmsg}</h3> : ""
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

export default ChangeTeacherPassword