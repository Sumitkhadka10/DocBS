import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Importing useNavigate from react-router-dom
import { assets } from "../assets/assets";

const HeaderPage = () => {
  const navigate = useNavigate(); // This hook allows programmatic navigation
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status

  // Function to check if the user is logged in by verifying the existence of an authToken in localStorage
  const checkAuth = () => {
    const authToken = localStorage.getItem("authToken");
    return !!authToken; // Return true if authToken exists (user is logged in), false otherwise
  };

  // Update login status on component mount
  useEffect(() => {
    setIsLoggedIn(checkAuth()); // Set the login status when the component mounts
  }, []); // Empty dependency array ensures this runs only once

  // Function to handle the CTA button click
  const handleCTAClick = () => {
    if (isLoggedIn) {
      console.log("User is logged in, navigating to /doctors");
      navigate("/doctors"); // Navigate to /doctors if the user is logged in
    } else {
      console.log("User is not logged in, navigating to /login");
      navigate("/login"); // Navigate to /login if the user is not logged in
    }
  };

  // Stats array to display important information about the service
  const stats = [
    { value: "5K+", label: "Daily Appointments" },
    { value: "98%", label: "Positive Reviews" },
    { value: "200+", label: "Specialists Available" },
  ];

  // Specialties array to display a list of specialties
  const specialties = ["General physician", "Dermatologist", "Neurologist"];

  return (
    <div className="relative bg-primary min-h-[90vh] overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 lg:px-8 py-20 flex flex-col lg:flex-row items-center gap-12">
        {/* Left Side: Text Content */}
        <div className="lg:w-1/2 text-center lg:text-left space-y-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight animate-fadeInUp">
            Find & Book Your Perfect <br />
            Healthcare Specialist in <br />
            <span className="relative inline-block">
              <span className="absolute inset-0 bg-gradient-to-r from-accent-400 to-accent-600 transform -skew-x-12 -z-10" />
              <span className="relative text-white">Minutes, Not Days</span>
            </span>
          </h1>
          <p className="text-xl text-gray-100 max-w-2xl mx-auto lg:mx-0 opacity-90">
            Connect instantly with top-rated doctors, specialists, and healthcare providers. Your journey to wellness starts with one click.
          </p>
          {/* Displaying stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-md">
            {stats.map((stat, index) => (
              <div key={index} className="p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10">
                <div className="text-2xl font-bold text-accent-300">{stat.value}</div>
                <div className="text-sm text-gray-200">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Conditionally Render the CTA Button */}
          {!isLoggedIn && (
            <button
              onClick={handleCTAClick} // Handle the button click to navigate based on authentication
              className="group relative inline-flex items-center justify-center px-8 py-4 bg-accent-500 hover:bg-accent-600 rounded-2xl font-semibold text-white transition-all duration-300 transform hover:scale-[1.02] shadow-xl shadow-accent-500/20"
            >
              <span>Book Your Consultation Now</span>
              <svg className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" />
              </svg>
            </button>
          )}
        </div>

        {/* Right Side: Image and Specialties */}
        <div className="lg:w-1/2 relative mt-12 lg:mt-0 w-full">
          <img 
            src={assets.header_img} 
            alt="Medical Consultation" 
            className="w-full h-auto object-cover rounded-3xl shadow-2xl" 
            loading="eager" 
          />
          {/* Verification Badge */}
          <div className="absolute -bottom-6 right-8 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full flex items-center gap-2 shadow-lg border border-white/20">
            <div className="h-3 w-3 bg-accent-400 rounded-full animate-pulse" />
            <span className="text-sm text-white font-medium">Verified Specialists</span>
          </div>
          {/* Specialties List */}
          <div className="absolute -right-8 top-8 hidden lg:block">
            <div className="bg-white/5 backdrop-blur-sm p-4 rounded-2xl space-y-3 shadow-xl border border-white/10">
              {specialties.map((specialty, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className={`h-2 w-2 rounded-full ${index === 0 ? "bg-red-400" : index === 1 ? "bg-blue-400" : "bg-green-400"}`} />
                  <span className="text-sm text-gray-200">{specialty}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute w-[40rem] h-[40rem] bg-gradient-radial from-accent-500/10 to-transparent top-0 left-0 animate-pulse-slow" />
        <div className="absolute w-[50rem] h-[50rem] bg-gradient-conic from-primary-700/20 via-transparent to-transparent bottom-0 right-0 animate-rotate" />
      </div>
    </div>
  );
};

export default HeaderPage;
