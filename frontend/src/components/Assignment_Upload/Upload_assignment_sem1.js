import React from "react";
import { useState, useEffect } from "react";
import Navbar from "../Teacher_dashboard/Navbar";
import "./upload_assignment.css";
import jwt from "jsonwebtoken";
import { useNavigate } from "react-router-dom";

function UploadAssignmentsem1() {
  const navigate = useNavigate();
  const [file, setFile] = useState("");
  const [subject, setsubject] = useState("");
  const [deadline, setdeadline] = useState("");
  const [teacher, setTeacher] = useState("");
  const [description, setdescription] = useState("");
  const [UnmeshShukla, setUnmeshShukla] = useState(false);
  const [NitishaAgg, setNitishaAgg] = useState(false);
  const [MKDas, setMKDas] = useState(false);
  const [SunilKumar, setSunilKumar] = useState(false);
  const[success,setsuccess]=useState(false)
  async function populate(e) {
    const req = await fetch("http://localhost:4000/upload/assignment", {
      headers: {
        "x-access-token": localStorage.getItem("token"), //
      },
    });
    const data = await req.json();
    setTeacher(data.name);
    if (data.name == "Unmesh Shukla") {
      setUnmeshShukla(true);
    }
    if (data.name == "Nitisha Aggarwal") {
      setNitishaAgg(true);
    }
    if (data.name == "M.K Das") {
      setMKDas(true);
    }
    if (data.name == "Sunil Kumar") {
      setSunilKumar(true);
    }
  }

  async function Upload(e) {
    if (!subject) {
      alert("Please select the subject")
    }
    else if (!file) {
      alert("Please upload a file")
    }
    else {
      e.preventDefault()
      const response = await fetch("http://localhost:4000/upload/assignment", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-access-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({
          file,
          subject,
          deadline,
          semester: "Sem-1",
          teacher,
          description,
        }),
      });

      const data = await response.json();
      setsuccess(data.success)
      setTimeout(() => {
        setsuccess(false)
      }, 2500);
    }
    

  }

  //--------------------
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = jwt.decode(token);
      console.log(user);
      if (!user) {
        localStorage.removeItem("token");
        navigate("/Teacherdashboard");
      } else {
        populate();
      }
    }
  }, []);
  return (
    <>
    <div className="uploadassignmentbody">
      <Navbar />
      <div className="uploadheading">
        <h1>Upload Assignment</h1>
      </div>

      <div className="uploadassignmentcontent">
        {UnmeshShukla && (
          <div>


            <select
              type="text"
              className="form-control shadow-none"
              id="subject"
              name="subject"
              value={subject}
              required
              onChange={(e) => setsubject(e.target.value)}>
              <option>Select Subject</option>
              <option value="Algorithms And Data Structure">
                Algorithms and Data Structure
              </option>
            </select>
          </div>
        )}
        {NitishaAgg && (
          <div>

            <select
              type="text"
              className="form-control shadow-none"
              id="subject"
              name="subject"
              value={subject}
              required
              onChange={(e) => setsubject(e.target.value)}>
              <option>Select Subject</option>
              <option value="Software Design & Programming">
                Software Design & Programming
              </option>
            </select>
          </div>
        )}
        {MKDas && (
          <div>

            <select
              type="text"
              className="form-control mt-2 shadow-none"
              id="subject"
              name="subject"
              value={subject}
              required
              onChange={(e) => setsubject(e.target.value)}>
              <option>Select Subject</option>
              <option value="Mathematical Foundation Of Computing">
                Mathematical Foundation of Computing
              </option>
            </select>
          </div>
        )}
        {SunilKumar && (
          <div>

            <select
              type="text"
              className="form-control mt-2 shadow-none"
              id="subject"
              name="subject"
              value={subject}
              required
              onChange={(e) => setsubject(e.target.value)}>
              <option>Select Subject</option>
              <option value="Computer System Architecture">
                Computer System Architecture
              </option>
            </select>
          </div>
        )}

        <div className="mb-3 mt-3" id="deadline_block">
          <label className="form-label deadline">Deadline</label>
          <input
            type="date"
            className="time_block12"
            value={deadline}
            onChange={(e) => setdeadline(e.target.value)}
          />
        </div>
        {/* upload file */}

        <div className="file-card">
          <div className="file-inputs">
            <input type="file" value={file} onChange={(e) => setFile(e.target.value)} />
            <button>Select File</button>
          </div>
          <div className="infocontent">
            <p className="main">Supported files</p>
            <p className="info">PDF,Doc, JPG, PNG</p>
          </div>
        </div>


        {/* text box */}

        <div class="mb-3 mt-4 descriptionbody">
          <label for="exampleFormControlTextarea1" class="form-label">
            Discription
          </label>
          <textarea
            class="form-control"
            placeholder="optional"
            id="text-area"
            rows="3"
            value={description}
            onChange={(e) => setdescription(e.target.value)}></textarea>
        </div>
        <div className="text-center">
          <button className="submitbutton mt-3 " onClick={Upload}>
            Submit
          </button>
        </div>

        {/* submit button */}


      </div>
    </div>
{/* <div className="container-fluid uploadblacky">
    <div className="success">
   <div classNam="wrappertick"> <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"> <circle className="checkmark__circle" cx={26} cy={26} r={25} fill="none"/> <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
</svg>
</div>
<h4>Assignment Posted</h4>
</div>
      </div> */}
    </>
  );
}

export default UploadAssignmentsem1;
