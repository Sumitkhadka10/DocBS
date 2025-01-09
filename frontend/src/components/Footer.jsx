import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div>
        <div>
            {/* ...left.... */}
            <div>
                <img src={assets.logo} alt="" />
                <p>We aim to make healthcare accessible and convenient by connecting you with trusted doctors. Book appointments, manage schedules, and access health resources with ease. Our platform is designed to provide a seamless experience, ensuring data privacy and security.</p>

            </div>
            {/* ...middle.... */}
            <div>
                <p>Company</p>
                <ul>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Contact us</li>
                    <li>Privacy Policy</li>
                </ul>

            </div>
            {/* ...right.... */}
            <div>
                <p>Get in touch</p>
                <ul>
                    <li>+9779813000000</li>
                    <li>Doctorbookingsystem@gmail.com</li>
                </ul>

            </div>
            
        </div>
        <div>
            {/* ....Copyright Text.... */}
        </div>
        <hr />
        <p>Copyright © 2025 DoctorBookingSystem - All Right Reserved.</p>
    </div>
  )
}

export default Footer