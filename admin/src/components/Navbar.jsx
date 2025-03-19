import React, { useContext, useState, useEffect } from 'react';
import { assets } from '../assets/assets';
import { AdminContext } from '../context/AdminContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { aToken, setAToken } = useContext(AdminContext);
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

  const logout = () => {
    navigate('/');
    if (aToken) {
      setAToken('');
      localStorage.removeItem('aToken');
    }
    setDropdownOpen(false);
  };

  return (
    <div
      className={`sticky top-0 z-50 bg-white transition-all duration-500 ${
        scrolled ? 'shadow-lg border-b border-gray-200' : 'bg-white'
      }`}
    >
      <div className="h-1 bg-indigo-600"></div>
      <div className="flex justify-between items-center py-4 px-0 md:pr-6 lg:pr-8">
        <div className="flex items-center space-x-4 pl-4">
          <div className="relative group">
            <img
              className="w-40 sm:w-48 lg:w-52 cursor-pointer transition-transform duration-300 transform group-hover:scale-105"
              src={assets.logo_main}
              alt="Company Logo"
              onClick={() => navigate('/admin-dashboard')}
            />
            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-indigo-600 group-hover:w-3/4 transition-all duration-300"></div>
          </div>
          {aToken && (
            <div className="relative hidden sm:block">
              <div
                className="
                  relative z-10 py-1.5 px-4 rounded-full font-medium text-sm tracking-wide
                  bg-indigo-600 text-white
                  shadow-md border border-indigo-600/20
                "
              >
                Admin
              </div>
            </div>
          )}
        </div>
        <div className="relative pr-4">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 p-1.5 pr-3 rounded-full border border-gray-200 hover:border-indigo-600/30 transition-all duration-300 hover:bg-indigo-600/20 group"
          >
            <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center text-sm font-semibold shadow-sm">
              A
            </div>
            <span className="hidden md:block text-sm font-medium text-gray-600 group-hover:text-indigo-600 transition-colors">
              Admin
            </span>
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
                className="fixed inset-0 z-10 bg-black/5"
                onClick={() => setDropdownOpen(false)}
              ></div>
              <div className="absolute right-0 mt-3 w-48 bg-white rounded-xl shadow-xl py-2 z-20 border border-gray-200 animate-fade-in-down overflow-hidden">
                <button
                  onClick={logout}
                  className="w-full text-left px-4 py-3 text-sm text-gray-600 hover:bg-indigo-600/20 hover:text-indigo-600 flex items-center gap-2 transition-colors duration-200"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    className="w-4 h-4"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                    <polyline points="16 17 21 12 16 7"></polyline>
                    <line x1="21" y1="12" x2="9" y2="12"></line>
                  </svg>
                  <span className="font-medium">Logout</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;