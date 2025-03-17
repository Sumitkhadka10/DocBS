import React, { useState } from "react";
import { assets } from "../assets/assets";
import { FaMapMarkerAlt, FaFacebook, FaTwitter, FaInstagram, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";

const Contact = () => {
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  const handleMapLoad = () => setIsMapLoaded(true);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* SEO Optimization */}
      <head>
        <title>Contact Us - DoctorBookingSystem</title>
        <meta name="description" content="Get in touch with DoctorBookingSystem for any booking inquiries, feedback, or support." />
      </head>

      {/* Main Heading */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 relative pb-4 hover:text-primary transition-colors">
          CONTACT <span className="text-primary">US</span>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-primary rounded-full"></div>
        </h1>
        <p className="text-gray-600 text-lg hover:text-gray-700 transition-colors">Your Gateway to Better Healthcare</p>
      </div>

      {/* Contact Content Section */}
      <div className="grid md:grid-cols-2 gap-12 mb-20">
        {/* Contact Information Card */}
        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-primary/10 rounded-full">
              <MdLocationOn className="text-primary text-2xl" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 hover:text-primary transition-colors">Healthcare Hub</h2>
              <p className="text-gray-600 mt-1 hover:text-gray-700 transition-colors">
                Naxal Bhagawati Marga, <br />
                Kathmandu, Nepal
              </p>
            </div>
          </div>

          {/* Contact Details */}
          <div className="space-y-6 mb-8">
            <div className="flex items-center gap-4 group">
              <FaPhoneAlt className="text-gray-500 group-hover:text-primary transition-colors" />
              <span className="text-gray-600 group-hover:text-primary transition-colors">+977 9813600000</span>
            </div>
            <div className="flex items-center gap-4 group">
              <FaEnvelope className="text-gray-500 group-hover:text-primary transition-colors" />
              <span className="text-gray-600 group-hover:text-primary transition-colors">doctorbookingsystem@gmail.com</span>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex gap-4 mb-8">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-3 text-primary hover:bg-primary/10 rounded-full transition-colors">
              <FaFacebook size={24} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-3 text-primary hover:bg-primary/10 rounded-full transition-colors">
              <FaTwitter size={24} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-3 text-primary hover:bg-primary/10 rounded-full transition-colors">
              <FaInstagram size={24} />
            </a>
          </div>

          {/* Action Buttons */}
          <div className="grid md:grid-cols-2 gap-4">
            <a href="mailto:doctorbookingsystem@gmail.com" className="flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg shadow-md transition-colors">
              <FaEnvelope /> Email Support
            </a>
            <a href="tel:+9779813600000" className="flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg shadow-md transition-colors">
              <FaPhoneAlt /> Emergency Call
            </a>
          </div>
        </div>

        {/* Contact Illustration */}
        <div className="hidden md:block relative rounded-2xl overflow-hidden shadow-lg bg-gray-50">
          <img className="w-full h-full object-cover" src={assets.contact_image} alt="Healthcare Professionals" />
        </div>
      </div>

      {/* Interactive Map Section */}
      <div className="mb-20">
        <h3 className="text-2xl font-semibold text-gray-900 mb-8 text-center hover:text-primary transition-colors">Our Healthcare Network</h3>
        <div className="relative rounded-2xl overflow-hidden shadow-xl border-4 border-white">
          {!isMapLoaded && (
            <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
              <div className="animate-pulse text-gray-600 hover:text-gray-700 transition-colors">Loading healthcare facilities map...</div>
            </div>
          )}
          <iframe
            title="Healthcare Facilities Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.3871411347396!2d85.3240364150613!3d27.708955682792284!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb198fd987d119%3A0x2d3aee8356bc872!2sKathmandu%2C%20Nepal!5e0!3m2!1sen!2snp!4v1673996145263!5m2!1sen!2snp"
            width="100%"
            height="400"
            style={{ border: 0 }}
            onLoad={handleMapLoad}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="animate-pulse bg-primary text-white p-4 rounded-full shadow-xl">
              <FaMapMarkerAlt size={28} />
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Healthcare Services Section */}
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 rounded-2xl shadow-lg mb-12">
        <h3 className="text-3xl font-bold text-gray-900 mb-12 text-center hover:text-primary transition-colors">Our Healthcare Support Services</h3>
        <div className="grid md:grid-cols-3 gap-8">
          {/* Appointment Card */}
          <div className="group relative bg-white p-8 rounded-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-default">
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/20 rounded-xl transition-all duration-300"></div>
            <div className="text-primary mb-6 transition-colors duration-300 group-hover:text-primary/90">
              <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17 3h4a1 1 0 011 1v16a1 1 0 01-1 1H3a1 1 0 01-1-1V4a1 1 0 011-1h4V1h2v2h6V1h2v2zm-2 2H9v2H7V5H4v4h16V5h-3v2h-2V5zm5 6H4v8h16v-8zM6 14h2v2H6v-2zm4 0h8v2h-8v-2z"/>
              </svg>
            </div>
            <h4 className="text-xl font-semibold text-gray-900 mb-4 hover:text-primary transition-colors">Instant Appointments</h4>
            <p className="text-gray-600 mb-4 hover:text-gray-700 transition-colors">24/7 access to specialists with real-time availability and automated reminders</p>
            <div className="text-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="font-medium">98% Success Rate</span> • 2min Average Response
            </div>
          </div>

          {/* Support Card */}
          <div className="group relative bg-white p-8 rounded-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-default">
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/20 rounded-xl transition-all duration-300"></div>
            <div className="text-primary mb-6 transition-colors duration-300 group-hover:text-primary/90">
              <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 100-16 8 8 0 000 16zM11 7h2v2h-2V7zm0 4h2v6h-2v-6z"/>
              </svg>
            </div>
            <h4 className="text-xl font-semibold text-gray-900 mb-4 hover:text-primary transition-colors">Patient Support</h4>
            <p className="text-gray-600 mb-4 hover:text-gray-700 transition-colors">Dedicated care coordination for insurance, referrals, and special needs</p>
            <div className="text-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="font-medium">24/7 Assistance</span> • Multilingual Staff
            </div>
          </div>

          {/* Partnership Card */}
          <div className="group relative bg-white p-8 rounded-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-default">
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/20 rounded-xl transition-all duration-300"></div>
            <div className="text-primary mb-6 transition-colors duration-300 group-hover:text-primary/90">
              <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18 4a1 1 0 011 1v14a1 1 0 01-1 1H6a1 1 0 01-1-1V5a1 1 0 011-1h12zm0-2H6a3 3 0 00-3 3v14a3 3 0 003 3h12a3 3 0 003-3V5a3 3 0 00-3-3z"/>
              </svg>
            </div>
            <h4 className="text-xl font-semibold text-gray-900 mb-4 hover:text-primary transition-colors">Care Partnerships</h4>
            <p className="text-gray-600 mb-4 hover:text-gray-700 transition-colors">Collaborating with trusted clinics for a comprehensive care experience</p>
            <div className="text-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="font-medium">Exclusive Benefits</span> • Nationwide Access
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;