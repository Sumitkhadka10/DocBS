import React from 'react'
import { assets } from '../assets/assets'

const Header = () => {
  return (
    <div>

        {/* ------Leftside-----*/}
        <div>
            <p>
                Book Appointment <br />With Trusted Doctors
            </p>
            <div>
                <img src={assets.group_profiles} alt="" />
                <p>Simply browse through our extensive list of trusted doctors, <br /> schedule your appointmnet hassle-free.</p>


            </div>
            <a href=''>
                Book Apoointment <img src={assets.arrow_icon} alt="" />
            </a>
        </div>
        {/*-------Rightside------*/}

        <div>
            <img src={assets.header_img} alt="" />

        </div>

    </div>
  )
}

export default Header