import React from 'react'
import loader from './loader.svg'
import './Loader.css'
const Loader = () => {
  return (
    <div className='loadercontainer'>
      <img src={loader} alt="" className='loader' />
    </div>
  )
}

export default Loader
