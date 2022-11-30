import React from "react";
import { useState, useEffect } from "react";
import Navbar from "../Student_dashboard/Navbar";
import jwt from "jsonwebtoken";
import { useNavigate } from "react-router-dom";

function UploadStudyMaterialSem2() {
  const navigate = useNavigate();
  const [file, setFile] = useState("");
  const [subject, setsubject] = useState("");
  const [teacher, setTeacher] = useState("");
  const [description, setdescription] = useState("");
  const [UnmeshShukla, setUnmeshShukla] = useState(false);
  const [NitishaAgg, setNitishaAgg] = useState(false);
  const [MKDas, setMKDas] = useState(false);
  const [Sanjeev, setSanjeev] = useState(false);

  async function populate(e) {
    const req = await fetch("http://localhost:4000/upload/studymaterial", {
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
      setSanjeev(false);
    }
  }

  async function Upload() {
    const response = await fetch("http://localhost:4000/upload/studymaterial", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({
        file,
        subject,
        semester: "Sem-2",
        teacher,
        description,
      }),
    });

    const data = await response.json();
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
    <div className="uploadassignmentbody">
      <Navbar />
      <div className="uploadheading">
        <h2>Upload Studymaterial</h2>
      </div>
      <div className="uploadassignmentcontent">
        <div className=" mb-3">
          {NitishaAgg && (
            <div>
              <label className="form-label">Select Subject</label>
              <select
                type="text"
                className="form-control"
                id="subject"
                name="subject"
                value={subject}
                onChange={(e) => setsubject(e.target.value)}>
                   <option>Select Subject</option>
                <option value="Computer Communication and Networks">
                  Computer Communication and Networks
                </option>
                <option value="Operating Systems">Operating Systems</option>
              </select>
            </div>
          )}

          {UnmeshShukla && (
            <div>
              <label className="form-label">Select Subject</label>
              <select
                type="text"
                className="form-control"
                id="subject"
                name="subject"
                value={subject}
                onChange={(e) => setsubject(e.target.value)}>
                   <option>Select Subject</option>
                <option value="Database Systems">Database Systems</option>
              </select>
            </div>
          )}

          {MKDas && (
            <div>
              <label className="form-label">Select Subject</label>
              <select
                type="text"
                className="form-control"
                id="subject"
                name="subject"
                value={subject}
                onChange={(e) => setsubject(e.target.value)}>
                   <option>Select Subject</option>
                <option value="Applied Machine Learning">
                  Applied Machine Learning
                </option>
              </select>
            </div>
          )}

          {Sanjeev && (
            <div>
              <label className="form-label">Select Subject</label>
              <select
                type="text"
                className="form-control"
                id="subject"
                name="subject"
                value={subject}
                onChange={(e) => setsubject(e.target.value)}>
                   <option>Select Subject</option>
                <option value="Open Elective-1">Open Elective-1</option>
              </select>
            </div>
          )}
        </div>

        {/* upload file */}

        <div className="file-card">
          <div className="file-inputs">
            <input
              type="file"
              value={file}
              onChange={(e) => setFile(e.target.value)}
            />
            <button>Upload</button>
          </div>
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

        <button className="submitbutton" onClick={Upload}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default UploadStudyMaterialSem2;
