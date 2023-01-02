import React from 'react'

const Sem2Subjects = ({NitishaAgg,UnmeshShukla,MKDas,Sanjeev,subject,setsubject}) => {
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
              <option value="">Select Subject</option>
              <option value="Computer Communication and Networks">
                Computer Communication and Networks
              </option>
              <option value="Operating Systems">Operating Systems</option>
            </select></div>}

          {UnmeshShukla && <div className="selectsubjectcontainer">

            <select
              type="text"
              className="form-control shadow-none"
              id="subject"
              name="subject"
              value={subject}
              onChange={(e) => setsubject(e.target.value)}>
              <option value="">Select Subject</option>
              <option value="Database Systems">Database Systems</option>
            </select></div>}

          {MKDas && <div className="selectsubjectcontainer">

            <select
              type="text"
              className="form-control shadow-none"
              id="subject"
              name="subject"
              value={subject}
              onChange={(e) => setsubject(e.target.value)}>
              <option value="">Select Subject</option>
              <option value="Applied Machine Learning">
                Applied Machine Learning
              </option>
            </select></div>}

          {Sanjeev && <div className="selectsubjectcontainer">

            <select
              type="text"
              className="form-control shadow-none"
              id="subject"
              name="subject"
              value={subject}
              onChange={(e) => setsubject(e.target.value)}>
              <option value="">Select Subject</option>
              <option value="Open Elective-1">Open Elective-1</option>
            </select></div>}
    </>
  )
}

export default Sem2Subjects
