import React from 'react';
import { assets } from '../assets/assets';
import { FaPhoneAlt, FaEnvelope, FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <div className='md:mx-10'>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
            {/* ...left.... */}
            <div>
                <img className='mb-5 w-48' src={assets.logo} alt="Logo" />
                <p className='w-full md:w-2/3 text-gray-600 leading-6'>
                  Our mission is to simplify healthcare by connecting you with trusted doctors. Book appointments, manage your schedule, and access health resources effortlessly. We prioritize your privacy and security while providing a seamless and convenient experience.
                </p>
            </div>
            {/* ...middle.... */}
            <div>
                <p className='text-xl font-medium mb-5'>Company</p>
                <ul className='flex flex-col gap-2 text-gray-600'>
                    <li className="hover:text-primary cursor-pointer">Home</li>
                    <li className="hover:text-primary cursor-pointer">About Us</li>
                    <li className="hover:text-primary cursor-pointer">Contact Us</li>
                    <li className="hover:text-primary cursor-pointer">Privacy Policy</li>
                </ul>
            </div>
            {/* ...right.... */}
            <div>
                <p className='text-xl font-medium mb-5'>Get in Touch</p>
                <ul className='flex flex-col gap-2 text-gray-600'>
                <li className="flex items-center gap-2 hover:text-primary cursor-pointer transition-all">
                      <FaPhoneAlt />+9779813000000
                    </li>
                    <li className="flex items-center gap-2 hover:text-primary cursor-pointer transition-all">
                      <FaEnvelope /> doctorbookingsystem@gmail.com
                    </li>
                    <li className="flex gap-4 mt-3">
              <a href="https://facebook.com" className="hover:text-primary transition-all">
                <FaFacebookF />
              </a>
              <a href="https://twitter.com" className="hover:text-primary transition-all">
                <FaTwitter />
              </a>
              <a href="https://instagram.com" className="hover:text-primary transition-all">
                <FaInstagram />
              </a>
            </li>
                </ul>
            </div>
        </div>
        <div>
            {/* ....Copyright Text.... */}
        </div>
        <hr />
        <p className='py-5 text-sm text-center text-gray-600'>
       Copyright © 2025 DoctorBookingSystem. All Rights Reserved | <a href="/privacy-policy" className="text-primary hover:text-primary-dark">Privacy Policy</a> | <a href="/terms" className="text-primary hover:text-primary-dark">Terms & Conditions</a>
      </p>
    </div>
  );
}

export default Footer;
