import React, { useState, useContext } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext.jsx";
import NotificationDropdown from "../pages/NotificationDropdown.jsx";

const Navbar = () => {
  const navigate = useNavigate();
  const { token, setToken, userData } = useContext(AppContext);
  const [showMenu, setShowMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const logout = () => {
    setToken(false);
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="border-b border-gray-200 py-3 px-4 mb-6">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <img
            onClick={() => navigate("/")}
            className="w-36 cursor-pointer hover:opacity-80 transition-opacity"
            src={assets.logo}
            alt="Logo"
          />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg transition-colors ${
                isActive
                  ? "text-primary font-medium border-b-2 border-primary"
                  : "hover:text-primary text-gray-700"
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/doctors"
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg transition-colors ${
                isActive
                  ? "text-primary font-medium border-b-2 border-primary"
                  : "hover:text-primary text-gray-700"
              }`
            }
          >
            All Doctors
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg transition-colors ${
                isActive
                  ? "text-primary font-medium border-b-2 border-primary"
                  : "hover:text-primary text-gray-700"
              }`
            }
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg transition-colors ${
                isActive
                  ? "text-primary font-medium border-b-2 border-primary"
                  : "hover:text-primary text-gray-700"
              }`
            }
          >
            Contact
          </NavLink>
        </div>

        {/* User Section / Login Button */}
        <div className="flex items-center">
          {token && userData ? (
            <div className="flex items-center gap-3">
              {/* Notification Dropdown */}
              <NotificationDropdown
                isOpen={showNotifications}
                setIsOpen={setShowNotifications}
              />

              {/* User Dropdown */}
              <div className="relative group">
                <div className="flex items-center gap-2 p-2 rounded-full cursor-pointer hover:bg-gray-50 transition-colors">
                  <img
                    className="w-8 h-8 rounded-full object-cover border-2 border-primary/20"
                    src={userData.image}
                    alt="User"
                  />
                  <span className="text-gray-700 font-medium pr-1 hidden sm:inline">
                    {userData.name || "User"}
                  </span>
                  <img
                    className="w-2.5 opacity-70"
                    src={assets.dropdown_icon}
                    alt=""
                  />
                </div>

                <div className="absolute right-0 mt-2 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-20">
                  <div className="bg-white rounded-lg shadow-lg overflow-hidden w-48 border border-gray-100">
                    <div className="flex flex-col text-sm">
                      <button
                        onClick={() => navigate("/my-profile")}
                        className="text-left px-4 py-3 hover:bg-gray-50 text-gray-700 transition-colors flex items-center gap-2"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-primary"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                        My Profile
                      </button>
                      <button
                        onClick={() => navigate("/my-appointments")}
                        className="text-left px-4 py-3 hover:bg-gray-50 text-gray-700 transition-colors flex items-center gap-2"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-primary"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        My Appointments
                      </button>
                      <button
                        onClick={() => navigate("/my-report-card")}
                        className="text-left px-4 py-3 hover:bg-gray-50 text-gray-700 transition-colors flex items-center gap-2"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-primary"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        My ReportCard
                      </button>
                      <button
                        onClick={logout}
                        className="text-left px-4 py-3 hover:bg-red-50 text-red-600 transition-colors flex items-center gap-2"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                          />
                        </svg>
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="hidden md:flex items-center gap-2 bg-primary hover:bg-primary/80 text-white px-5 py-2 rounded-full font-medium text-sm transition-colors shadow-md hover:shadow-lg"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                />
              </svg>
              Create Account
            </button>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setShowMenu(true)}
            className="ml-4 p-1 rounded-md hover:bg-gray-100 md:hidden focus:outline-none transition-colors"
          >
            <img className="w-6" src={assets.menu_icon} alt="Menu" />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`${
          showMenu ? "fixed inset-0 bg-black bg-opacity-30 z-10" : "hidden"
        } md:hidden`}
        onClick={() => setShowMenu(false)}
      ></div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 w-64 h-full bg-white shadow-xl z-20 transform ${
          showMenu ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out md:hidden`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <img className="w-32" src={assets.logo} alt="Logo" />
          <button
            onClick={() => setShowMenu(false)}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <img className="w-6" src={assets.cross_icon} alt="Close" />
          </button>
        </div>

        <div className="p-4">
          <NavLink
            to="/"
            onClick={() => setShowMenu(false)}
            className={({ isActive }) =>
              `block w-full text-left px-3 py-3 rounded-md mb-1 ${
                isActive
                  ? "text-primary border-l-4 border-primary pl-2"
                  : "text-gray-700 hover:bg-gray-50"
              }`
            }
          >
            HOME
          </NavLink>
          <NavLink
            to="/doctors"
            onClick={() => setShowMenu(false)}
            className={({ isActive }) =>
              `block w-full text-left px-3 py-3 rounded-md mb-1 ${
                isActive
                  ? "text-primary border-l-4 border-primary pl-2"
                  : "text-gray-700 hover:bg-gray-50"
              }`
            }
          >
            ALL DOCTORS
          </NavLink>
          <NavLink
            to="/about"
            onClick={() => setShowMenu(false)}
            className={({ isActive }) =>
              `block w-full text-left px-3 py-3 rounded-md mb-1 ${
                isActive
                  ? "text-primary border-l-4 border-primary pl-2"
                  : "text-gray-700 hover:bg-gray-50"
              }`
            }
          >
            ABOUT
          </NavLink>
          <NavLink
            to="/contact"
            onClick={() => setShowMenu(false)}
            className={({ isActive }) =>
              `block w-full text-left px-3 py-3 rounded-md mb-1 ${
                isActive
                  ? "text-primary border-l-4 border-primary pl-2"
                  : "text-gray-700 hover:bg-gray-50"
              }`
            }
          >
            CONTACT
          </NavLink>

          {token && userData && (
            <NavLink
              to="/notifications"
              onClick={() => setShowMenu(false)}
              className={({ isActive }) =>
                `block w-full text-left px-3 py-3 rounded-md mb-1 flex items-center gap-2 ${
                  isActive
                    ? "text-primary border-l-4 border-primary pl-2"
                    : "text-gray-700 hover:bg-gray-50"
                }`
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              NOTIFICATIONS
            </NavLink>
          )}

          {!token && (
            <NavLink
              to="/login"
              onClick={() => setShowMenu(false)}
              className="flex items-center justify-center gap-2 mt-4 bg-primary hover:bg-primary/80 text-white px-4 py-3 rounded-md"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                />
              </svg>
              CREATE ACCOUNT
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;