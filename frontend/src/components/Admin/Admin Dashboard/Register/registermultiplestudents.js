import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from '../../../Admin Dashboard/Navbar'
import * as XLSX from 'xlsx'
import List from './List'

function StudentRegister() {
  const navigate = useNavigate();
  const [filename, setFilename] = useState("");
  const [jsonData, setJsonData] = useState([])
  const [visible, setVisible] = useState(false)
  const [errmsg, setErrmsg] = useState("")
  const [success, setSuccess] = useState(false)
  const handleFile = async (e) => {

    const file = e.target.files[0];
    setFilename(file.name)
    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data)

    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    setJsonData(XLSX.utils.sheet_to_json(worksheet))
    console.log(jsonData);
    setVisible(true)

  }
  console.log(jsonData);

  async function RegisterAll(e) {
    e.preventDefault()

    const response = await fetch("http://localhost:4000/registerall", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonData),
    });

    const data = await response.json();
    setSuccess(data.success)
    setTimeout(() => {
      setSuccess(false)
      navigate('/admindashboard')
    },2500)
    console.log(data)
    if (data.status === "ok") {
      setErrmsg("")

    }
    else {
      setErrmsg(data.msg)
      navigate('/admindashboard')
    }
  }


  return (
    <>
      <Navbar />
      <section>
        <div className="file-card">
          <div className="file-inputs">
            <input
              type="file"
              onChange={(e) => handleFile(e)}
            />
            <button>Select File</button>
          </div>
          {filename && <div className="fileuploaddisplay">{filename}</div>}
          <div className="infocontent">
            <p className="main">Supported files</p>
            <p className="info">xlsx</p>
          </div>
          {
            errmsg ? <h3 className='text-danger'>{errmsg}</h3> : ""
          }
        </div>

        {visible &&

          <div className='overflowxauto'>
            <table className='table table-striped '  >
              <thead className='heading-2'>
                <tr >
                  <th>Name</th>
                  <th>Semester</th>
                  <th>Email</th>
                  <th>Roll No.</th>
                  <th>Contact No.</th>
                  <th>Enrollment No.</th>
                </tr>
              </thead>
              <tbody>
                <List jsonData={jsonData} />
              </tbody>
            </table>

            <div className='text-center'>
              <button
                type="submit"
                className="btn btn-primary  my-1"
                onClick={RegisterAll}
              >
                Register All
              </button>
            </div>

          </div>}
      </section>

      {success && <div className="container-fluid blacky">
        <div className="success">
          <div classNam="wrappertick"> <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"> <circle className="checkmark__circle" cx={26} cy={26} r={25} fill="none" /> <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
          </svg>
          </div>
          <h4>Students Registered succesfully</h4>
        </div>
      </div>}

    </>
  );
}

export default StudentRegister;
