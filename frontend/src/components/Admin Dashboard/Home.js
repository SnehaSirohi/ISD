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
                    <div class="row row-cols-1 row-cols-sm-3 row-cols-md-3 g-3">
                        <Link to='/registerTeacher'><div class="col">
                            <div class="card-body">
                                <h3>Register Teacher</h3>
                            </div>
                        </div>
                        </Link>
                        <Link to="/registerStudent"><div class="col">

                            <div class="card-body">
                                <h3>Register a Single Student</h3>
                            </div>
                        </div>
                        </Link>
                        <Link to="/registerAllStudent"><div class="col">

                            <div class="card-body">
                                <h3>Register Multiple Students</h3>
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
