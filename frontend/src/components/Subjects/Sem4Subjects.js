import React from 'react'

const Sem4Subjects = ({NitishaAgg,UnmeshShukla,MKDas,Sanjeev,subject,setsubject}) => {
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
                <option value="Internet of Things Systems, Security and Cloud">
                  Internet of Things Systems, Security and Cloud
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
                <option value="Health Informatics">Health Informatics</option>
              </select>
            </div>}
            {Sanjeev && <div className="selectsubjectcontainer">

              <select
                type="text"
                className="form-control shadow-none"
                id="subject"
                name="subject"
                value={subject}
                onChange={(e) => setsubject(e.target.value)}>
                <option value= "">Select Subject</option>
                <option value="Dissertation Project">Dissertation Project</option>
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
                <option value="Research Methods in Informatics">
                  Research Methods in Informatics
                </option>
              </select>
            </div>}
   </>
  )
}

export default Sem4Subjects
