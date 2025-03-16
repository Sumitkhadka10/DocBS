import React, { useContext, useState } from 'react';
import { DoctorContext } from '../context/DoctorContext';
import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';

const DocSidebar = () => {
  const { dToken } = useContext(DoctorContext);
  const [collapsed, setCollapsed] = useState(false);

  const navItemStyle = "flex items-center w-full px-6 py-3 text-base font-medium rounded-md transition-all duration-200";
  const activeStyle = "bg-sky-500 text-white shadow-md";
  const inactiveStyle = "text-gray-700 hover:bg-sky-50 hover:text-sky-700";

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <>
      {/* Mobile toggle button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded-md shadow-md border border-gray-200 hover:bg-sky-50"
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
        {dToken && (
          <div className="flex flex-col h-screen">
            {/* Logo area */}
            <div className="h-20 flex items-center px-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-sky-500 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">D</span>
                </div>
                <h1 className="text-xl font-bold text-sky-500">Doctor Portal</h1>
              </div>
            </div>

            {/* Main Navigation */}
            <div className="flex-1 py-6 px-4 overflow-y-auto">
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

            {/* Doctor profile section at bottom */}
            <div className="border-t border-gray-200 p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-sky-500 flex items-center justify-center overflow-hidden">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                {/* Placeholder for dynamic doctor name (if available) */}
                <span className="text-sm font-medium text-gray-700">Doctor</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Overlay for mobile */}
      {!collapsed && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};

export default DocSidebar;