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

  async function Upload() {
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
    console.log(data);
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
        <h2>Upload Assignment</h2>
      </div>

      <div className="uploadassignmentcontent">
        {UnmeshShukla && (
          <div>
            <label className="form-label mt-2">Select Subject</label>

            <select
              type="text"
              className="form-control"
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
            <label className="form-label mt-2">Select Subject</label>
            <select
              type="text"
              className="form-control"
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
            <label className="form-label">Select Subject</label>
            <select
              type="text"
              className="form-control mt-2"
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
            <label className="form-label">Select Subject</label>
            <select
              type="text"
              className="form-control mt-2"
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

        {/* upload file */}

        <div className="file-card">
          <div className="file-inputs">
            <input
              type="file"
              value={file}
              onChange={(e) => setFile(e.target.value)}
            />
            <button>Select File</button>
          </div>
          <div className="infocontent">
            <p className="main">Supported files</p>
            <p className="info">PDF,Doc, JPG, PNG</p>
          </div>
        </div>

        <div className="mb-3 mt-3">
          <label className="form-label deadline">Deadline</label>
          <input
            type="date"
            value={deadline}
            onChange={(e) => setdeadline(e.target.value)}
          />
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
          <button className="submitbutton mt-3" onClick={Upload}>
            Submit
          </button>
        </div>

        {/* submit button */}


      </div>
    </div>
  );
}

export default UploadAssignmentsem1;
