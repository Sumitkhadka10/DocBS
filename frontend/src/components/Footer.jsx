import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='md:mx-10'>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
            {/* ...left.... */}
            <div>
                <img className='mb-5 w-48' src={assets.logo} alt="" />
                <p className='w-full md:w-2/3 text-gray-600 leading-6'>We aim to make healthcare accessible and convenient by connecting you with trusted doctors. Book appointments, manage schedules, and access health resources with ease. Our platform is designed to provide a seamless experience, ensuring data privacy and security.</p>

            </div>
            {/* ...middle.... */}
            <div>
                <p className='text-xl font-medium mb-5'>Company</p>
                <ul className='flex flex-col gap-2 text-gray-600'>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Contact us</li>
                    <li>Privacy Policy</li>
                </ul>

            </div>
            {/* ...right.... */}
            <div>
                <p className='text-xl font-medium mb-5'>Get in touch</p>
                <ul className='flex flex-col gap-2 text-gray-600'>
                    <li>+9779813000000</li>
                    <li>Doctorbookingsystem@gmail.com</li>
                </ul>

            </div>
            
        </div>
        <div>
            {/* ....Copyright Text.... */}
        </div>
        <hr />
        <p className='py-5 text-sm text-center'>Copyright © 2025 DoctorBookingSystem - All Right Reserved.</p>
    </div>
  )
}

export default Footer