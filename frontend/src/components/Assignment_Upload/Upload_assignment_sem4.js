import React from "react";
import { useState, useEffect } from "react";
import Navbar from "../Teacher_dashboard/Navbar";
import "./upload_assignment.css";
import jwt from "jsonwebtoken";
import { useNavigate } from "react-router-dom";

function UploadAssignmentsem4() {
  const navigate = useNavigate();
  const [file, setFile] = useState("");
  const [subject, setsubject] = useState("");
  const [deadline, setdeadline] = useState("");
  const [teacher, setTeacher] = useState("");
  const [description, setdescription] = useState("");
  const [UnmeshShukla, setUnmeshShukla] = useState(false);
  const [NitishaAgg, setNitishaAgg] = useState(false);
  const [MKDas, setMKDas] = useState(false);
  const [Sanjeev, setSanjeev] = useState(false);
  const [success, setsuccess] = useState(false)
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
    if (data.name == "Sanjeev") {
      setSanjeev(true);
    }
  }

  async function Upload() {
    if (!subject) {
      alert("Please select the subject")
    }
    else if (!file) {
      alert("Please upload a file")
    }
    else {
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
          semester: "Sem-4",
          teacher,
          description,
        }),
      });

      const data = await response.json();
      setsuccess(data.success)
      setTimeout(() => {
        setsuccess(false)
        navigate("/Teacherdashboard");
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
          <div className=" mb-3">
            {NitishaAgg && (
              <div>

                <select
                  type="text"
                  className="form-control shadow-none"
                  id="subject"
                  name="subject"
                  value={subject}
                  onChange={(e) => setsubject(e.target.value)}>
                  <option>Select Subject</option>
                  <option value="Internet of Things Systems, Security and Cloud">
                    Internet of Things Systems, Security and Cloud
                  </option>
                </select>
              </div>
            )}
            {UnmeshShukla && (
              <div>

                <select
                  type="text"
                  className="form-control shadow-none"
                  id="subject"
                  name="subject"
                  value={subject}
                  onChange={(e) => setsubject(e.target.value)}>
                  <option>Select Subject</option>
                  <option value="Health Informatics">Health Informatics</option>
                </select>
              </div>
            )}
            {Sanjeev && (
              <div>

                <select
                  type="text"
                  className="form-control shadow-none"
                  id="subject"
                  name="subject"
                  value={subject}
                  onChange={(e) => setsubject(e.target.value)}>
                  <option>Select Subject</option>
                  <option value="Dissertation Project">
                    Dissertation Project
                  </option>
                </select>
              </div>
            )}
            {MKDas && (
              <div>

                <select
                  type="text"
                  className="form-control shadow-none"
                  id="subject"
                  name="subject"
                  value={subject}
                  onChange={(e) => setsubject(e.target.value)}>
                  <option>Select Subject</option>
                  <option value="Research Methods in Informatics">
                    Research Methods in Informatics
                  </option>
                </select>
              </div>
            )}
          </div>

          {/* upload file */}
          <div className="mb-3 mt-3" id="deadline_block">
            <label className="form-label deadline">Deadline</label>
            <input
              type="date"
              className="time_block12"
              value={deadline}
              onChange={(e) => setdeadline(e.target.value)}
            />
          </div>

          <div className="file-card">
            <div className="file-inputs">
              <input
                type="file"
                value={file}
                onChange={(e) => setFile(e.target.value)}
              />
              <button>Upload</button>
            </div>
            {file && <div className="fileuploaddisplay">{file}</div>}
            <div className="infocontent">
              <p className="main">Supported files</p>
              <p className="info">PDF,Doc, JPG, PNG</p>
            </div>
          </div>

          {/* text box */}

          <div class="mb-3 mt-4">
            <label for="exampleFormControlTextarea1" class="form-label">
              Discription
            </label>
            <textarea
              class="form-control"
              placeholder="optional"
              id="exampleFormControlTextarea1"
              rows="3"
              value={description}
              onChange={(e) => setdescription(e.target.value)}></textarea>
          </div>

          {/* submit button */}

          <div className="text-center">
            <button className="submitbutton mt-3 " onClick={Upload}>
              Submit
            </button>
          </div>
        </div>
      </div>
      {success && <div className="container-fluid blacky">
        <div className="success">
          <div classNam="wrappertick"> <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"> <circle className="checkmark__circle" cx={26} cy={26} r={25} fill="none" /> <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
          </svg>
          </div>
          <h4>Assignment Posted</h4>
        </div>
      </div>}
    </>
  );
}

export default UploadAssignmentsem4;
