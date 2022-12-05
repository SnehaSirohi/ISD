import React from 'react'
import "./profile.css"
import 'bootstrap/dist/css/bootstrap.min.css';
function Profile() {
    return (
        <>
            <div>
  <div className="header">
    <div className="profilephoto">
      <img src="https://mdbcdn.b-cdn.net/img/new/avatars/1.webp" className="rounded-circle shadow-4" style={{width: 150}} alt="Avatar" />
    </div>
    <div className="profile">
      <h6>Name</h6>
      <h6>teacherID/enrollmentNum</h6>
    </div>
  </div>
  <div className="section">
    <div className="section1">
      <div className="sec">
        <h6>Mail ID</h6>
        <h6>Contact No</h6>
        <h6>Roll No</h6>
        <h6>Enrollment No</h6>
        <h6>Semester</h6>
        <h6>Session</h6>
      </div>
    </div>
    <div className="section2">
      <h6>Value</h6>
      <h6>Value</h6>
      <h6>Value</h6>
      <h6>Value</h6>
      <h6>Value</h6>
      <h6>Value</h6>
    </div>
  </div>
  <div className="bottom">
    <div className="btn-primary">
      Logout
    </div>
    <div className="btn-primary">
      Reset Password
    </div>
  </div>
</div>

        </>
    )
}

export default Profile;