import React, { useContext, useState, useEffect } from 'react';
import { assets } from '../assets/assets';
import { AdminContext } from '../context/AdminContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const { aToken, setAToken } = useContext(AdminContext);
    const navigate = useNavigate();
    const [scrolled, setScrolled] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    // Handle scroll effect for navbar
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const logout = () => {
        navigate('/');
        aToken && setAToken('');
        aToken && localStorage.removeItem('aToken');
        setDropdownOpen(false);
    };

    return (
        <div className={`sticky top-0 z-50 bg-white transition-all duration-500 ${scrolled
                ? 'shadow-lg border-b border-gray-100'
                : 'bg-white/95 backdrop-blur-sm'
            }`}>
            {/* Enhanced top gradient stripe */}
            <div className='h-1 bg-gradient-to-r from-blue-700 via-purple-600 to-indigo-700 bg-size-200 animate-gradient-x'></div>

            <div className='container mx-auto flex justify-between items-center py-4 px-4 md:px-6 lg:px-8'>
                {/* Left section with logo and badge */}
                <div className='flex items-center space-x-6'>
                    <div className='relative group'>
                        <img
                            className='w-40 sm:w-48 lg:w-52 cursor-pointer transition-transform duration-300 transform group-hover:scale-105'
                            src={assets.logo_main}
                            alt="Company Logo"
                            onClick={() => navigate('/admin-dashboard')}
                        />
                        <div className='absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-600 group-hover:w-3/4 transition-all duration-300'></div>
                    </div>

                    {/* Enhanced Role badge with improved glow effect */}
                    <div className='relative hidden sm:block'>
                        <div className={`
                            relative z-10 py-1.5 px-4 rounded-full font-medium text-sm tracking-wide
                            ${aToken
                                ? 'bg-gradient-to-r from-blue-700 to-indigo-600 text-white'
                                : 'bg-gradient-to-r from-emerald-700 to-emerald-600 text-white'
                            }
                            shadow-md border border-white/20
                        `}>
                            {aToken ? 'Admin' : 'Doctor'}
                        </div>
                        <div className={`
                            absolute inset-0 rounded-full blur opacity-30
                            ${aToken ? 'bg-blue-400' : 'bg-emerald-400'}
                            animate-pulse
                        `}></div>
                    </div>
                </div>

                {/* Right section with logout dropdown only - enhanced */}
                <div className="relative">
                    <button
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        className="flex items-center gap-2 p-1.5 pr-3 rounded-full border border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-md bg-white/90 hover:bg-white group"
                    >
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-700 to-indigo-600 text-white flex items-center justify-center text-sm font-bold shadow-sm">
                            A
                        </div>
                        <span className="hidden md:block text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors">Admin</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 text-gray-400 group-hover:text-gray-600 transition-colors"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>

                    {/* Enhanced dropdown menu */}
                    {dropdownOpen && (
                        <>
                            <div
                                className="fixed inset-0 z-10 bg-black/5 backdrop-blur-sm"
                                onClick={() => setDropdownOpen(false)}
                            ></div>
                            <div className="absolute right-0 mt-3 w-48 bg-white rounded-xl shadow-xl py-2 z-20 border border-gray-100 animate-fade-in-down overflow-hidden">
                                <button
                                    onClick={logout}
                                    className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors duration-200"
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