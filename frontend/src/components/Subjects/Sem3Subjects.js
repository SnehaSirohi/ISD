import React from 'react'

const Sem3Subjects = ({NitishaAgg,UnmeshShukla,MKDas,Manish,subject,setsubject}) => {
  return (
  <>
   {NitishaAgg && <div className="selectsubjectcontainer">
            
            <select
              type="text"
                className="form-control shadow-none"
              id="subject"
              name="subject"
              value={subject}
              onChange={(e) => setsubject(e.target.value)}>
              <option value= "">Select Subject</option>
              <option value="Information System Design">
                Information System Design
              </option>
            </select>
          </div>}
          {UnmeshShukla && <div className="selectsubjectcontainer">
            
            <select
              type="text"
                className="form-control shadow-none"
              id="subject"
              name="subject"
              value={subject}
              onChange={(e) => setsubject(e.target.value)}>
              <option value= "">Select Subject</option>
              <option value="Cloud Computing">Cloud Computing</option>
            </select>
          </div>}
          {MKDas && <div className="selectsubjectcontainer">
            
            <select
              type="text"
                className="form-control shadow-none"
              id="subject"
              name="subject"
              value={subject}
              onChange={(e) => setsubject(e.target.value)}>
              <option value= "">Select Subject</option>
              <option value="Software Engineering">Software Engineering</option>
            </select>
          </div>}
          {Manish && <div className="selectsubjectcontainer">
            
            <select
              type="text"
                className="form-control shadow-none"
              id="subject"
              name="subject"
              value={subject}
              onChange={(e) => setsubject(e.target.value)}>
              <option value= "">Select Subject</option>
              <option value="IT Planning and Management">
                IT Planning and Management
              </option>
            </select>
          </div>}
  </>
  )
}

export default Sem3Subjects
