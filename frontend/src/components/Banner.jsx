import React from 'react';
import { assets } from '../assets/assets';

const Banner = () => {
  return (
    <div className="relative w-full min-h-screen bg-primary text-white overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 -z-10">
        {/* Animated wave pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0,50 C20,60 40,40 60,50 C80,60 100,40 100,50 L100,100 L0,100 Z" fill="url(#gradient1)" className="animate-wave-slow">
              <animate attributeName="d" dur="15s" repeatCount="indefinite" values="
                M0,50 C20,60 40,40 60,50 C80,60 100,40 100,50 L100,100 L0,100 Z;
                M0,50 C30,40 50,60 70,40 C90,60 100,50 100,50 L100,100 L0,100 Z;
                M0,50 C20,60 40,40 60,50 C80,60 100,40 100,50 L100,100 L0,100 Z
              "/>
            </path>
          </svg>
          <defs>
            <linearGradient id="gradient1" gradientTransform="rotate(90)">
              <stop offset="0%" stopColor="white"/>
              <stop offset="100%" stopColor="rgba(255,255,255,0.5)"/>
            </linearGradient>
          </defs>
        </div>
        
        {/* Glowing accent circles */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent-500/20 rounded-full filter blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent-400/10 rounded-full filter blur-2xl"></div>
        <div className="absolute top-1/3 left-1/4 w-32 h-32 bg-accent-600/15 rounded-full filter blur-xl animate-float-slow"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 lg:py-24 flex flex-col lg:flex-row items-center lg:items-stretch gap-16">
        {/* Left Column: Content */}
        <div className="w-full lg:w-5/12 flex flex-col justify-center space-y-10">
          {/* Header with animated highlight */}
          <div className="space-y-4">
            <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-sm font-medium">
              <span className="w-2 h-2 bg-accent-400 rounded-full mr-2 animate-ping"></span>
              <span>Premium Healthcare Platform</span>
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-bold tracking-tight">
              <span className="block mb-2">Your Personalized</span>
              <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-white via-accent-200 to-white animate-gradient-x">
                Healthcare Solution
              </span>
            </h1>
          </div>
          
          {/* Main description with glass effect */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-accent-500/20 to-primary-700/20 rounded-2xl transform rotate-1"></div>
            <div className="relative p-6 lg:p-8 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-2xl overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-accent-400/20 rounded-full translate-x-1/2 -translate-y-1/2 filter blur-xl"></div>
              
              <p className="text-xl text-gray-100 leading-relaxed">
                Connect with certified medical specialists through our intelligent matching system. 
                Experience seamless scheduling and personalized care designed around your unique health needs.
              </p>
            </div>
          </div>
          
          {/* Stats in modern glass cards */}
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 lg:col-span-1">
              <div className="h-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 flex items-center gap-4 group hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-1">
                <div className="w-12 h-12 bg-accent-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-accent-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-white">24/7 Availability</h3>
                  <p className="text-sm text-gray-300">Round-the-clock access to care</p>
                </div>
              </div>
            </div>
            
            <div className="col-span-2 lg:col-span-1">
              <div className="h-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 flex items-center gap-4 group hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-1">
                <div className="w-12 h-12 bg-accent-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-accent-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-white">150+ Specialties</h3>
                  <p className="text-sm text-gray-300">Comprehensive medical network</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Additional stats - horizontal display with animation */}
          <div className="flex flex-wrap gap-3 justify-start">
            {['98% Success Rate', '5k+ Patients', 'Instant Booking'].map((stat, index) => (
              <div 
                key={index} 
                className="px-4 py-2 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 flex items-center gap-2 transform hover:scale-105 transition duration-300"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="h-3 w-3 rounded-full bg-gradient-to-r from-accent-400 to-accent-500 animate-pulse"></div>
                <span className="text-sm font-medium">{stat}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Right Column: Image */}
        <div className="w-full lg:w-7/12 relative">
          {/* Floating elements */}
          <div className="absolute top-8 left-0 lg:-left-10 z-30 animate-float">
            <div className="bg-white/10 backdrop-blur-lg px-5 py-4 rounded-2xl border border-white/20 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-accent-500/30 flex items-center justify-center">
                  <svg className="w-5 h-5 text-accent-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">98% Success Rate</p>
                  <p className="text-xs text-gray-300">Verified results</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="absolute bottom-8 right-4 lg:-right-8 z-30 animate-float-delayed">
            <div className="bg-white/10 backdrop-blur-lg px-5 py-4 rounded-2xl border border-white/20 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-accent-500/30 flex items-center justify-center">
                  <svg className="w-5 h-5 text-accent-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">5k+ Patients</p>
                  <p className="text-xs text-gray-300">Trust our service</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Main image with creative framing */}
          <div className="relative group mx-auto max-w-lg lg:max-w-none">
            {/* Decorative frame elements */}
            <div className="absolute -top-6 -left-6 w-24 h-24 border-t-4 border-l-4 border-accent-400 rounded-tl-3xl opacity-60 transform -rotate-6"></div>
            <div className="absolute -bottom-6 -right-6 w-24 h-24 border-b-4 border-r-4 border-accent-400 rounded-br-3xl opacity-60 transform -rotate-6"></div>
            
            {/* Image with multiple layers for depth */}
            <div className="relative">
              {/* Layer 1: Shadow/Glow */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-accent-500/30 via-primary-600/20 to-accent-400/30 rounded-2xl blur-xl opacity-70 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Layer 2: Border */}
              <div className="absolute -inset-1 bg-gradient-to-tr from-accent-400 via-primary to-accent-500 rounded-2xl opacity-50 group-hover:opacity-70 transition-all duration-500"></div>
              
              {/* Layer 3: Image Container */}
              <div className="relative rounded-xl overflow-hidden border-2 border-white/20 shadow-2xl transform rotate-1 group-hover:rotate-0 transition-transform duration-500">
                <img
                  src={assets.appointment_img}
                  alt="Medical Consultation"
                  className="w-full h-auto object-cover"
                  loading="eager"
                />
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/50 via-transparent to-accent-500/30"></div>
                
                {/* Bottom banner overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary to-transparent h-1/3"></div>
              </div>
            </div>
            
            {/* Certification badge */}
            <div className="absolute -right-4 top-1/2 transform translate-x-0 -translate-y-1/2 z-20">
              <div className="bg-white shadow-lg rounded-full p-3 flex items-center justify-center animate-pulse-slow">
                <div className="bg-accent-500 rounded-full p-2">
                  <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;