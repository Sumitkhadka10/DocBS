import React from 'react';
import { assets } from '../assets/assets';

const Banner = () => {
  return (
    <div className="relative w-full min-h-screen flex items-center bg-primary text-white overflow-hidden isolate">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute w-[40rem] h-[40rem] bg-gradient-radial from-accent-500/10 to-transparent top-0 left-0 animate-pulse-slow" />
        <div className="absolute w-[50rem] h-[50rem] bg-gradient-conic from-primary-700/20 via-transparent to-transparent bottom-0 right-0 animate-rotate" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8 py-20">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Text Content */}
          <div className="lg:w-1/2 space-y-8 text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight animate-fadeInUp">
              <span className="relative inline-block">
                <span className="absolute inset-0 bg-gradient-to-r from-accent-400 to-accent-600 transform -skew-x-12 -z-10" />
                <span className="relative text-white">Your Personalized</span>
              </span>
              <br />
              <span className="text-gray-100">Healthcare Solution</span>
            </h1>

            <div className="p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 max-w-2xl mx-auto lg:mx-0">
              <p className="text-xl text-gray-200 leading-relaxed">
                Connect with certified medical specialists through our intelligent matching system. 
                Experience seamless scheduling and personalized care designed around your unique health needs.
              </p>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10">
                <div className="h-2 w-2 bg-accent-400 rounded-full animate-pulse" />
                <span className="text-sm">24/7 Availability</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10">
                <div className="h-2 w-2 bg-accent-400 rounded-full animate-pulse" />
                <span className="text-sm">150+ Specialties</span>
              </div>
            </div>
          </div>

          {/* Image Container */}
          <div className="lg:w-1/2 relative group w-full">
            <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white/20 transform rotate-1 hover:rotate-0 transition-transform duration-300">
              <img
                src={assets.appointment_img}
                alt="Medical Consultation"
                className="w-full h-auto object-cover aspect-square"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-primary/40 to-transparent" />
            </div>

            {/* Floating Stats */}
            <div className="absolute -left-8 top-8 hidden lg:block">
              <div className="bg-white/5 backdrop-blur-sm p-4 rounded-2xl space-y-3 shadow-xl border border-white/10">
                {['98% Success Rate', '5k+ Patients', 'Instant Booking'].map((stat, index) => (
                  <div key={index} className="flex items-center gap-2 group">
                    <div className="h-2 w-2 bg-accent-400 rounded-full animate-pulse" />
                    <span className="text-sm text-gray-200 group-hover:text-white transition-colors">
                      {stat}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;