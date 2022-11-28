import React from 'react'
import { useState, useEffect } from 'react'
import Navbar from '../Student_dashboard/Navbar';
import './upload_assignment.css';
import jwt from 'jsonwebtoken'
import { useNavigate } from "react-router-dom"

function UploadAssignmentsem1() {
    const navigate = useNavigate();
    const [file, setFile] = useState("");
    const [subject, setsubject] = useState("");
    const [deadline,setdeadline]=useState("")
    const [teacher,setTeacher] = useState("")
    const [description,setdescription]=useState("")
    const semester = "Sem-1"


     async function populate(e) {
    const req = await fetch('http://localhost:4000/upload', {
      headers: {
        'x-access-token': localStorage.getItem('token'), //
      },
    })
    const data = await req.json();
    setTeacher(data.name)
  }

    async function Upload() {
        const response = await fetch("http://localhost:4000/upload", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                'x-access-token': localStorage.getItem('token'), 

            },
            body: JSON.stringify({
                file,
                subject,
                deadline,
                semester,
                teacher,
                description
            }),
        });

        const data = await response.json();
        console.log(data)
    }

    //--------------------
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      const user = jwt.decode(token)
      console.log(user)
      if (!user) {
        localStorage.removeItem('token')
        navigate("/Teacherdashboard");
      } else {
        populate()

      }
    }
  }, [])
    return (
        <div className='uploadassignmentbody'>
            <Navbar />
            <div className='uploadheading'>
                <h2>Upload Assignment</h2>
            </div>
          <div className='uploadassignmentcontent'>
              <div className=" mb-3" >
                   <label htmlFor="form-label">Deadline</label>
                   <input type="date" value={deadline} onChange={(e)=>setdeadline(e.target.value)} />
              </div>
          </div>
            <div className='uploadassignmentcontent'>
                <div className=" mb-3">
                    <label className="form-label">Select Subject</label>
                    <select
                        type="text"
                        className="form-control"
                        name="subject"
                        value={subject}
                        onChange={(e) => setsubject(e.target.value)}
                    >
                        <option required>Select Subject</option>
                        <option value="Software Design & Programming">
                            Software Design & Programming
                        </option>
                        <option value="Algorithms And Data Structure">
                            Algorithms and Data Structure
                        </option>
                        <option value="Computer System Architecture">
                            Computer System Architecture
                        </option>
                        <option value="Mathematical Foundation Of Computing">
                            Mathematical Foundation of Computing
                        </option>
                    </select>
                </div>

                {/* upload file */}
                
                <div className="file-card">
                    <div className='file-inputs'>
                        <input type="file" value={file} onChange={(e) => setFile(e.target.value)} />
                        <button >Upload</button>
                    </div>
                    <div className='infocontent'>
                        <p className="main">Supported files</p>
                        <p className="info">PDF,Doc, JPG, PNG</p>
                    </div>
                </div>

                {/* text box */}

                <div class="mb-3 mt-4">
                    <label for="exampleFormControlTextarea1" class="form-label">Discription</label>
                    <textarea class="form-control" placeholder='optional' id="exampleFormControlTextarea1" rows="3" value={description} onChange={(e)=>setdescription(e.target.value)} ></textarea>
                </div>

                {/* submit button */}

                <button className='submitbutton' onClick={Upload} >Submit</button>
            </div>
        </div>
    )
}

export default UploadAssignmentsem1;