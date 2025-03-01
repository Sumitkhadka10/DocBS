import React, { useState } from "react";
import { assets } from "../assets/assets";
import { FaMapMarkerAlt, FaFacebook, FaTwitter, FaInstagram, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";

const Contact = () => {
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  const handleMapLoad = () => {
    setIsMapLoaded(true);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* SEO Optimization */}
      <head>
        <title>Contact Us - DoctorBookingSystem</title>
        <meta
          name="description"
          content="Get in touch with DoctorBookingSystem for any booking inquiries, feedback, or support."
        />
      </head>

      {/* Main Heading */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-800 mb-4 relative pb-4">
          CONTACT <span className="text-blue-600">US</span>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-blue-600 rounded-full"></div>
        </h1>
        <p className="text-gray-500 text-lg">Your Gateway to Better Healthcare</p>
      </div>

      {/* Contact Content Section */}
      <div className="grid md:grid-cols-2 gap-12 mb-20">
        {/* Contact Information Card */}
        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-blue-100 rounded-full">
              <MdLocationOn className="text-blue-600 text-2xl" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Healthcare Hub</h2>
              <p className="text-gray-600 mt-1">
                Naxal Bhagawati Marga, <br />
                Kathmandu, Nepal
              </p>
            </div>
          </div>

          <div className="space-y-6 mb-8">
            <div className="flex items-center gap-4 group">
              <FaPhoneAlt className="text-gray-500 group-hover:text-blue-600 transition-colors" />
              <span className="text-gray-600 group-hover:text-blue-600 transition-colors">
                +977 9813600000
              </span>
            </div>
            <div className="flex items-center gap-4 group">
              <FaEnvelope className="text-gray-500 group-hover:text-blue-600 transition-colors" />
              <span className="text-gray-600 group-hover:text-blue-600 transition-colors">
                doctorbookingsystem@gmail.com
              </span>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex gap-4 mb-8">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
            >
              <FaFacebook size={24} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 text-blue-400 hover:bg-blue-50 rounded-full transition-colors"
            >
              <FaTwitter size={24} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 text-pink-500 hover:bg-pink-50 rounded-full transition-colors"
            >
              <FaInstagram size={24} />
            </a>
          </div>

          {/* Action Buttons */}
          <div className="grid md:grid-cols-2 gap-4">
            <a
              href="mailto:doctorbookingsystem@gmail.com"
              className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg shadow-md transition-colors"
            >
              <FaEnvelope />
              Email Support
            </a>
            <a
              href="tel:+9779813600000"
              className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-md transition-colors"
            >
              <FaPhoneAlt />
              Emergency Call
            </a>
          </div>
        </div>

        {/* Contact Illustration */}
        <div className="hidden md:block relative rounded-2xl overflow-hidden shadow-lg bg-gray-50">
          <img
            className="w-full h-full object-cover"
            src={assets.contact_image}
            alt="Healthcare Professionals"
          />
        </div>
      </div>

      {/* Interactive Map Section */}
      <div className="mb-20">
        <h3 className="text-2xl font-semibold text-gray-800 mb-8 text-center">
          Our Healthcare Network
        </h3>
        <div className="relative rounded-2xl overflow-hidden shadow-xl border-4 border-white">
          {!isMapLoaded && (
            <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
              <div className="animate-pulse text-gray-500">
                Loading healthcare facilities map...
              </div>
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
            <div className="animate-pulse bg-blue-600 text-white p-4 rounded-full shadow-xl">
              <FaMapMarkerAlt size={28} />
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Healthcare Services Section */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl shadow-lg mb-12">
        <h3 className="text-3xl font-bold text-gray-800 mb-12 text-center">
          Our Healthcare Support Services
        </h3>
        <div className="grid md:grid-cols-3 gap-8">
          {/* Appointment Card */}
          <div className="group relative bg-white p-8 rounded-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-default">
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-200 rounded-xl transition-all duration-300"></div>
            <div className="text-blue-600 mb-6 transition-colors duration-300 group-hover:text-blue-700">
              <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17 3h4a1 1 0 011 1v16a1 1 0 01-1 1H3a1 1 0 01-1-1V4a1 1 0 011-1h4V1h2v2h6V1h2v2zm-2 2H9v2H7V5H4v4h16V5h-3v2h-2V5zm5 6H4v8h16v-8zM6 14h2v2H6v-2zm4 0h8v2h-8v-2z"/>
              </svg>
            </div>
            <h4 className="text-xl font-semibold text-gray-800 mb-4">
              Instant Appointments
            </h4>
            <p className="text-gray-600 mb-4">
              24/7 access to specialists with real-time availability and automated reminders
            </p>
            <div className="text-sm text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="font-medium">98% Success Rate</span> • 2min Average Response
            </div>
          </div>

          {/* Support Card */}
          <div className="group relative bg-white p-8 rounded-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-default">
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-green-200 rounded-xl transition-all duration-300"></div>
            <div className="text-green-600 mb-6 transition-colors duration-300 group-hover:text-green-700">
              <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 100-16 8 8 0 000 16zM11 7h2v2h-2V7zm0 4h2v6h-2v-6z"/>
              </svg>
            </div>
            <h4 className="text-xl font-semibold text-gray-800 mb-4">
              Patient Support
            </h4>
            <p className="text-gray-600 mb-4">
              Dedicated care coordination for insurance, referrals, and special needs
            </p>
            <div className="text-sm text-green-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="font-medium">24/7 Assistance</span> • Multilingual Staff
            </div>
          </div>

          {/* Partnership Card */}
          <div className="group relative bg-white p-8 rounded-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-default">
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-purple-200 rounded-xl transition-all duration-300"></div>
            <div className="text-purple-600 mb-6 transition-colors duration-300 group-hover:text-purple-700">
              <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 14v2a6 6 0 00-6 6H4a8 8 0 018-8zm0-1c-3.315 0-6-2.685-6-6s2.685-6 6-6 6 2.685 6 6-2.685 6-6 6zm0-2c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm9.446 9.032l1.504 1.504-1.414 1.414-1.504-1.504a4 4 0 111.414-1.414zM18 20a2 2 0 100-4 2 2 0 000 4z"/>
              </svg>
            </div>
            <h4 className="text-xl font-semibold text-gray-800 mb-4">
              Medical Partnerships
            </h4>
            <p className="text-gray-600 mb-4">
              Collaborate with our network to enhance healthcare delivery and accessibility
            </p>
            <div className="text-sm text-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="font-medium">500+ Partners</span> • HIPAA Compliant
            </div>
          </div>
        </div>
      </div>

      {/* Closing Statement */}
      <div className="text-center text-gray-600 mb-8">
        <p className="text-lg font-medium">
          Committed to Your Health Journey - Connect with Us Anytime
        </p>
      </div>
    </div>
  );
};

export default Contact;