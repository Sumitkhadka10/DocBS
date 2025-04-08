import React, { useContext, useState, useEffect } from 'react';
import { DoctorContext } from '../context/DoctorContext';
import { NavLink } from 'react-router-dom';

const DocSidebar = () => {
  const { dToken, profileData, getProfileData } = useContext(DoctorContext);
  const [collapsed, setCollapsed] = useState(false);

  const navItemStyle = "flex items-center w-full px-6 py-3 text-base font-medium rounded-md transition-all duration-200";
  const activeStyle = "bg-indigo-600 text-white shadow-md";
  const inactiveStyle = "text-gray-600 hover:bg-indigo-600/20 hover:text-indigo-600";

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  // Fetch profile data when component mounts if not already available
  useEffect(() => {
    if (dToken && !profileData) {
      getProfileData();
    }
  }, [dToken, profileData, getProfileData]);

  // Only render when both dToken and profileData are available
  if (!dToken || !profileData) {
    return null;
  }

  return (
    <>
      {/* Mobile toggle button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded-md shadow-md border border-gray-200 hover:bg-indigo-600/20"
        onClick={toggleSidebar}
        aria-label={collapsed ? "Open Sidebar" : "Close Sidebar"}
      >
        {collapsed ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        )}
      </button>

      <div
        className={`fixed top-0 left-0 h-full bg-white border-r border-gray-200 shadow-lg transition-all duration-300 z-40
          ${collapsed ? '-translate-x-full' : 'translate-x-0'} 
          lg:translate-x-0 lg:static lg:w-64`}
      >
        <div className="flex flex-col h-screen">
          {/* Doctor profile area */}
          <div className="h-24 flex items-center px-6 border-b border-gray-200">
            <div className="flex items-center space-x-4 w-full">
              <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                <img
                  src={profileData.image || 'https://via.placeholder.com/40'}
                  alt={profileData.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col space-y-1">
                <h1 className="text-base font-semibold text-gray-900 truncate">
                  {profileData.name}
                </h1>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-600 truncate">
                    {profileData.speciality || 'Specialty'}
                  </span>
                  <span className="flex items-center">
                    <span className={`w-2 h-2 rounded-full mr-1 ${
                      profileData.available ? 'bg-green-500' : 'bg-red-500'
                    }`}></span>
                    <span className={`text-xs ${
                      profileData.available ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {profileData.available ? 'Online' : 'Offline'}
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Navigation */}
          <div className="flex-1 py-8 px-4 overflow-y-auto space-y-4">
            <div className="space-y-2">
              <NavLink
                className={({ isActive }) => `${navItemStyle} ${isActive ? activeStyle : inactiveStyle}`}
                to={'/doctor-dashboard'}
                onClick={() => window.innerWidth < 1024 && setCollapsed(true)}
              >
                <div className="w-8 h-8 flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <span className="leading-none">Dashboard</span>
              </NavLink>

              <NavLink
                className={({ isActive }) => `${navItemStyle} ${isActive ? activeStyle : inactiveStyle}`}
                to={'/doctor-appointments'}
                onClick={() => window.innerWidth < 1024 && setCollapsed(true)}
              >
                <div className="w-8 h-8 flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="leading-none">Appointments</span>
              </NavLink>

              <NavLink
                className={({ isActive }) => `${navItemStyle} ${isActive ? activeStyle : inactiveStyle}`}
                to={'/doctor-profile'}
                onClick={() => window.innerWidth < 1024 && setCollapsed(true)}
              >
                <div className="w-8 h-8 flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <span className="leading-none">My Profile</span>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </>
  )};  

export default DocSidebar ;