import React from 'react'
import Navbar from './Navbar'
import './teacherprofile2.css'
// import Navbar from './Navbar'

function Teacherprofile2() {
    return (
        <>
            <Navbar />
            <h1 className='Teacherheading'>Teacher Profile</h1>
            <div class="emp-profile">
                <div className='pblock'>
                    <form method="post">
                        <div className='photo_block'>
                            <div class="profile-img">
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS52y5aInsxSm31CvHOFHWujqUx_wWTS9iM6s7BAm21oEN_RiGoog" alt="" />
                            </div>
                            <div class="profile-head">
                                <h2>
                                    Kshiti Ghelani
                                </h2>
                                <h4>
                                    Asst. Lecturer
                                </h4>
                            </div>
                        </div>
                        <div class="teacherInfo">
                            <div className='keys'>
                                <p>User Id: </p>
                                <p>DOB </p>
                                <p>Email: </p>
                                <p>Phone: </p>
                            </div>
                            <div className='values'>
                                <p>Kshiti_Ghelani</p>
                                <p>28/11/2000</p>
                                <p>kshitighelani@gmail.com</p>
                                <p>123 456 7890</p>
                            </div>
                            <div className='teacherinfo2'>
                                <p>User Id: </p>
                                <h6>Kshiti_Ghelani</h6>
                                <p>DOB </p>
                                <h6>28/11/2000</h6>
                                <p>Email: </p>
                                <h6>kshitighelani@gmail.com</h6>
                                <p>Phone: </p>
                                <h6>123 456 7890</h6>
                            </div>
                        </div>
                    </form>
                </div>
                <div className='text-center' id='prof_block'>
                    <button id='butn' class="btn btn-primary" >Logout</button>
                    <button id='butn' class="btn btn-primary-1" >Reset Password</button>
                </div>
            </div>
        </>
    )
}

export default Teacherprofile2