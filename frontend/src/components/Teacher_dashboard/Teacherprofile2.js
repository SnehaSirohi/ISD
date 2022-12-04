import React from 'react'
import './teacherprofile2.css'

function Teacherprofile2() {
    return (
        <div>
            <div class="container emp-profile">
                <form method="post">
                    <div>
                        <div class="col-md-4">
                            <div class="profile-img">
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS52y5aInsxSm31CvHOFHWujqUx_wWTS9iM6s7BAm21oEN_RiGoog" alt="" />
                                <div class="file btn btn-lg btn-primary">
                                    Change Photo
                                    <input type="file" name="file" />
                                </div>
                            </div>
                        </div>
                        <div>
                            <div class="profile-head">
                                <h5>
                                    Kshiti Ghelani
                                </h5>
                                <h6>
                                    Web Developer and Designer
                                </h6>
                                <h4>About</h4>
                                <div>
                                    <div class="tab-content profile-tab" id="myTabContent">
                                        <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                            <div>
                                                <label>User Id</label>
                                                <p>Kshiti123</p>
                                            </div>
                                            <div>
                                                <label>Name</label>
                                                <p>Kshiti Ghelani</p>
                                            </div>
                                            <div>
                                                <label>Email</label>
                                                <p>kshitighelani@gmail.com</p>
                                            </div>
                                            <div>
                                                <label>Phone</label>
                                                <p>123 456 7890</p>
                                            </div>
                                            <div >
                                                <label>Profession</label>
                                                <p>Web Developer and Designer</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Teacherprofile2