import React, { useContext, useState, useEffect } from 'react';
import { assets } from '../assets/assets';
import { DoctorContext } from '../context/DoctorContext';
import { useNavigate } from 'react-router-dom';

const DocNavbar = () => {
  const { dToken, setDToken, profileData, getProfileData } = useContext(DoctorContext);
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (dToken && !profileData) {
      getProfileData();
    }
  }, [dToken, profileData, getProfileData]);

  const logout = () => {
    navigate('/');
    if (dToken) {
      setDToken('');
      localStorage.removeItem('dToken');
    }
    setDropdownOpen(false);
  };

  if (!dToken || !profileData) {
    return null;
  }

  return (
    <div
      className={`sticky top-0 z-50 bg-white transition-all duration-300 ${
        scrolled ? 'shadow-md border-b border-gray-200' : 'bg-white'
      }`}
    >
      {/* Single-color top stripe */}
      <div className="h-1 bg-indigo-600"></div>

      <div className="max-w-[1400px] mx-auto flex justify-between items-center py-4 px-0 md:pr-6 lg:pr-8">
        {/* Left Section: Logo and Doctor Badge */}
        <div className="flex items-center space-x-4 pl-2">
          <div className="relative group">
            <img
              className="w-32 sm:w-40 md:w-48 lg:w-52 cursor-pointer transition-transform duration-300 transform group-hover:scale-105"
              src={assets.logo_main}
              alt="Company Logo"
              aria-label="Navigate to Doctor Dashboard"
              onClick={() => navigate('/doctor-dashboard')}
            />
            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-indigo-600 group-hover:w-3/4 transition-all duration-300"></div>
          </div>
          {dToken && (
            <div className="hidden sm:flex items-center space-x-2 bg-indigo-50 px-3 py-1.5 rounded-full border border-indigo-200">
              <span className="text-sm font-medium text-indigo-700">Doctor</span>
            </div>
          )}
        </div>

        {/* Right Section: Profile and Dropdown */}
        <div className="relative pr-4">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 p-1.5 pr-3 rounded-full border border-gray-200 hover:border-indigo-600 hover:bg-indigo-50 transition-all duration-300 group"
            aria-label="Doctor Menu"
            tabIndex={0}
          >
            <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
              <img
                src={profileData.image || 'https://via.placeholder.com/40'}
                alt={profileData.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="hidden md:flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700 group-hover:text-indigo-600 transition-colors truncate max-w-[120px]">
                {profileData.name}
              </span>
              <span className="flex items-center">
                <span className={`w-2 h-2 rounded-full mr-1 ${profileData.available ? 'bg-green-500' : 'bg-red-500'}`}></span>
                <span className={`text-xs ${profileData.available ? 'text-green-600' : 'text-red-600'}`}>
                  {profileData.available ? 'Online' : 'Offline'}
                </span>
              </span>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-gray-500 group-hover:text-indigo-600 transition-colors"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {dropdownOpen && (
            <>
              <div
                className="fixed inset-0 z-10 bg-black/10"
                onClick={() => setDropdownOpen(false)}
              ></div>
              <div className="absolute right-0 mt-3 w-48 bg-white rounded-lg shadow-xl py-2 z-20 border border-gray-100">
                <div className="px-4 py-2 border-b border-gray-100">
                  <span className="text-sm font-medium text-gray-700 truncate block">
                    {profileData.name}
                  </span>
                  <span className="text-xs text-gray-500 truncate block">
                    {profileData.email}
                  </span>
                </div>
                <button
                  onClick={() => {
                    navigate('/doctor-dashboard');
                    setDropdownOpen(false);
                  }}
                  className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 flex items-center gap-2 transition-colors duration-200"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  Dashboard
                </button>
                <button
                  onClick={() => {
                    navigate('/doctor-profile');
                    setDropdownOpen(false);
                  }}
                  className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 flex items-center gap-2 transition-colors duration-200"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Profile
                </button>
                <button
                  onClick={logout}
                  className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 flex items-center gap-2 transition-colors duration-200"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Logout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DocNavbar;