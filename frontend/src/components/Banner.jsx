import React from 'react'
import { assets } from '../assets/assets'

const Banner = () => {
  return (
    <div>
        {/* ----Leftside--- */}
        <div>
            <div>
                <p>Book Appointment</p>
                <p>With lots of Trusted Doctors</p>
            </div>
            <button>Create Account</button>
        </div>

         {/* ----Rightside--- */}
         <div>
            <img src={assets.appointment_img} alt="" />

        </div>
    </div>
  )
}

export default Banner