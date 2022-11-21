import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
const Sem_4 = () => {
  const [subject, setsubject] = useState("");
  const [date, setdate] = useState("");
  const [time, settime] = useState("");
  const [message, setmessage] = useState("");
  const sem = "Sem-4";

  async function schedule(e) {
    e.preventDefault();

    const response = await fetch("http://localhost:4000/scheduletest", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        subject,
        sem,
        date,
        time,
        message,
      }),
    });

    const data = await response.json();
  }

  return (
    <>
      <form onSubmit={schedule}>
        <div className=" mb-3">
          <label className="form-label">Select Subject</label>
          <select
            type="text"
            className="form-control"
            id="subject"
            name="subject"
            value={subject}
            onChange={(e) => setsubject(e.target.value)}>
            <option>Select Subject</option>
            <option value="Research Methods in Informatics">
              Research Methods in Informatics
            </option>
            <option value="Internet of Things Systems, Security and Cloud">
              Internet of Things Systems, Security and Cloud
            </option>
            <option value="Dissertation Project">Dissertation Project</option>
            <option value="Health Informatics">Health Informatics</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="date" className="form-label">
            Date
          </label>
          <input
            type="date"
            className="form-control"
            id="date"
            aria-describedby="date"
            value={date}
            onChange={(e) => setdate(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="time" className="form-label">
            time
          </label>
          <input
            type="time"
            className="form-control"
            id="time"
            value={time}
            onChange={(e) => settime(e.target.value)}
          />
        </div>
        <div class="mb-3">
          <label for="exampleFormControlTextarea1" class="form-label">
            Message
          </label>
          <textarea
            type="text"
            class="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
            placeholder="Optional"
            value={message}
            onChange={(e) => setmessage(e.target.value)}></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          Schedule Test
        </button>
      </form>
    </>
  );
};

export default Sem_4;