import React from "react";
import { assets } from "../assets/assets";
import { FaPhoneAlt, FaEnvelope, FaFacebookF, FaTwitter, FaInstagram, FaMapMarkerAlt } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Footer = () => {
  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-white border-t border-gray-100 mt-24">
      <div className="max-w-6xl mx-auto px-4 py-12">
        
        {/* Footer Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mb-12">
          
          {/* Brand Section */}
          <div className="space-y-5">
            <img
              src={assets.logo}
              alt="HealthCare Logo"
              className="w-40 h-auto mb-4 cursor-pointer"
              onClick={scrollToTop}
            />
            <p className="text-gray-500 text-[15px] leading-relaxed">
              Connecting you with trusted healthcare professionals. Book appointments seamlessly and manage your health with confidence.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="space-y-5">
            <h3 className="text-gray-800 font-semibold mb-4 text-lg">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { name: "Home", path: "/" },
                { name: "Doctors", path: "/doctors" },
                { name: "About", path: "/about" },
                { name: "Contact", path: "/contact" },
              ].map((link) => (
                <li key={link.name}>
                  <NavLink
                    to={link.path}
                    onClick={scrollToTop}
                    className={({ isActive }) =>
                      `text-gray-500 hover:text-primary transition-colors text-[15px] ${
                        isActive ? "text-primary font-medium" : ""
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div className="space-y-5">
            <h3 className="text-gray-800 font-semibold mb-4 text-lg">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="flex-shrink-0 mt-1 text-gray-500 text-sm" />
                <p className="text-gray-500 text-[15px]">
                  Naxal Bhagawati Marga,<br /> Kathmandu, Nepal 44600
                </p>
              </div>

              <div className="flex items-center gap-3">
                <FaPhoneAlt className="text-gray-500 text-sm" />
                <a href="tel:+9779813000000" className="text-gray-500 hover:text-primary transition-colors text-[15px]">
                  +977 981 300 0000
                </a>
              </div>

              <div className="flex items-center gap-3">
                <FaEnvelope className="text-gray-500 text-sm" />
                <a href="mailto:doctorbooking@gmail.com" className="text-gray-500 hover:text-primary transition-colors text-[15px]">
                  doctorbooking@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-8 border-gray-100" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          
          {/* Copyright Text */}
          <p className="text-gray-500 text-sm text-center">
            © 2025 Doctor Booking System - All Rights Reserved.
          </p>

          {/* Social Media Links */}
          <div className="flex gap-4 text-gray-500">
            {[
              { href: "https://facebook.com", icon: <FaFacebookF className="text-lg" /> },
              { href: "https://twitter.com", icon: <FaTwitter className="text-lg" /> },
              { href: "https://instagram.com", icon: <FaInstagram className="text-lg" /> },
            ].map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                {social.icon}
              </a>
            ))}
          </div>

          {/* Legal Links */}
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-gray-500 hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-500 hover:text-primary transition-colors">
              Terms of Service
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
