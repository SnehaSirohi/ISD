import React from 'react'
import "./profile.css"

function Profile() {
    return (
        <main>
            <div class="header">
                <div class="profilephoto">
                    <img src="https://mdbcdn.b-cdn.net/img/new/avatars/1.webp" class="rounded-circle shadow-4"
                        style="width: 150px;" alt="Avatar" />

                </div>
                <div class="profile">
                    <h6>Name</h6>
                    <h6>teacherID/enrollmentNum</h6>

                </div>
            </div>
            <div class="section">

                <div class="section1">
                    <div class="sec">

                        <h6>Mail ID</h6>
                        <h6>Contact No</h6>
                        <h6>Roll No</h6>
                        <h6>Enrollment No</h6>
                        <h6>Semester</h6>
                        <h6>Session</h6>
                    </div>
                </div>
                <div class="section2">
                    <h6>Value</h6>
                    <h6>Value</h6>
                    <h6>Value</h6>
                    <h6>Value</h6>
                    <h6>Value</h6>
                    <h6>Value</h6>
                </div>
            </div>
            <div class="bottom">
                <div class="btn-primary">
                    Logout
                </div>
                <div class="btn-primary">
                    Reset Password
                </div>
            </div>
        </main>
    )
}

export default Profile