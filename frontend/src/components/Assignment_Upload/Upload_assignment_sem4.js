import React from 'react'
import { useState } from 'react'
import Navbar from '../Student_dashboard/Navbar';
import './upload_assignment.css';


function UploadAssignmentsem4() {
    const [file, setFile] = useState("");
    const [subject, setsubject] = useState("");
    console.log(file);
    console.log(subject);
    async function Upload() {
        const response = await fetch("http://localhost:4000/upload", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                file
            }),
        });

        const data = await response.json();
    }
    return (
        <div className='uploadassignmentbody'>
            <Navbar />
            <div className='uploadheading'>
                <h2>Upload Assignment</h2>
            </div>

            <div className='uploadassignmentcontent'>

                {/* select subject */}

                <div className=" mb-3">
                    <label className="form-label">Select Subject</label>
                    <select
                        type="text"
                        className="form-control"
                        id="subject"
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
                        <button onClick={Upload}>Upload</button>
                    </div>
                    <div className='infocontent'>
                        <p className="main">Supported files</p>
                        <p className="info">PDF,Doc, JPG, PNG</p>
                    </div>
                </div>

                {/* text box */}

                <div class="mb-3 mt-4">
                    <label for="exampleFormControlTextarea1" class="form-label">Discription</label>
                    <textarea class="form-control" placeholder='optional' id="exampleFormControlTextarea1" rows="3"></textarea>
                </div>

                {/* submit button */}

                <button className='submitbutton'>Submit</button>
            </div>
        </div>
    )
}

export default UploadAssignmentsem4