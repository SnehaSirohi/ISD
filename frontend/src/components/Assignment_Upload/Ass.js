import React from 'react'
import { useState } from 'react'
import Navbar from '../Student_dashboard/Navbar';
import './upload_assignment.css';


function Ass() {
    const [file, setFile] = useState("");
    console.log(file);
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
                <div class="mb-3 mt-4">
                    <label for="exampleFormControlTextarea1" class="form-label">Discription</label>
                    <textarea class="form-control" placeholder='optional' id="exampleFormControlTextarea1" rows="3"></textarea>
                </div>
                <button className='buttonafterdisc'>Submit</button>
            </div>
        </div>
    )
}

export default Ass