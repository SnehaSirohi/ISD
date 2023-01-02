import React from 'react'

const Sem1Subjects = ({NitishaAgg,UnmeshShukla,MKDas,SunilKumar,subject,setsubject}) => {
  return (
    <>
     {UnmeshShukla && <div className="selectsubjectcontainer">

              <select
                type="text"
                className="form-control shadow-none"
                id="subject"
                name="subject"
                value={subject}
                onChange={(e) => setsubject(e.target.value)}>
                <option value="">Select Subject</option>
                <option value="Algorithms And Data Structure">
                  Algorithms and Data Structure
                </option>
              </select></div>}
            {NitishaAgg && <div className="selectsubjectcontainer">

              <select
                type="text"
                className="form-control shadow-none"
                id="subject"
                name="subject"
                value={subject}

                onChange={(e) => setsubject(e.target.value)}>
                <option value="">Select Subject</option>
                <option value="Software Design & Programming">
                  Software Design & Programming
                </option>
              </select></div>}
            {MKDas && <div className="selectsubjectcontainer">
              <select
                type="text"
                className="form-control mt-2 shadow-none"
                id="subject"
                name="subject"
                value={subject}

                onChange={(e) => setsubject(e.target.value)}>
                <option value="">Select Subject</option>
                <option value="Mathematical Foundation Of Computing">
                  Mathematical Foundation of Computing
                </option>
              </select></div>}
            {SunilKumar && <div className="selectsubjectcontainer">
              <select
                type="text"
                className="form-control mt-2 shadow-none"
                id="subject"
                name="subject"
                value={subject}

                onChange={(e) => setsubject(e.target.value)}>
                <option value="">Select Subject</option>
                <option value="Computer System Architecture">
                  Computer System Architecture
                </option>
              </select></div>}
    </>
  )
}

export default Sem1Subjects
