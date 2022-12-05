import React from 'react'
import './teacherprofile2.css'

function Teacherprofile2() {
    return (
        <>
            <h1 className='Teacherheading'>Teacher Profile</h1>
            <div class="emp-profile">
                <div>
                    <form method="post">
                        <div class="row">
                            <div>
                                <div class="profile-img">
                                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS52y5aInsxSm31CvHOFHWujqUx_wWTS9iM6s7BAm21oEN_RiGoog" alt="" />
                                </div>
                            </div>
                            <div class="profile-head">
                                <h4>
                                    Kshiti Ghelani
                                </h4>
                                <h6>
                                    Web Developer and Designer
                                </h6>
                            </div>
                        </div>
                        <div class="teacherInfo">
                            <div className='keys'>
                                <div>
                                    <label>User Id: </label>
                                </div>
                                <div>
                                    <label>Name: </label>
                                </div>
                                <div>
                                    <label>Email: </label>
                                </div>
                                <div>
                                    <label>Phone: </label>
                                </div>
                            </div>
                            <div className='values'>
                                <div>
                                    <p>Kshiti Ghelani</p>
                                </div>
                                <div>
                                    <p>kshitighelani@gmail.com</p>
                                </div>
                                <div>
                                    <p>123 456 7890</p>
                                </div>

                                <div>
                                    <p>Web Developer and Designer</p>
                                </div>

                            </div>
                        </div>
                        <div className='profilebuttons'>
                            <button>Logout</button>
                            <button>Reset Password</button>
                        </div>
                    </form>
                </div>

            </div>
        </>
    )
}

export default Teacherprofile2