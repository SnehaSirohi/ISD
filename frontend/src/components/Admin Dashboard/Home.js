import React from 'react'
import Navbar from './Navbar'
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <>
    <div className='page'>
            <Navbar />
            <div class="album py-5 bg-light text-center">
                <div class="container">
                    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-2 g-3">
                        <Link to='/registerTeacher'><div class="col">
                            <div class="card-body">
                                <h3>Register Teacher</h3>
                            </div>
                        </div>
                        </Link>
                        <Link to="/admindashboard/Sem2/attendance"><div class="col">

                            <div class="card-body">
                                <h3>Register Student</h3>
                            </div>
                        </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>

    </>
  )
}


export default Home
