import React from 'react';
import { assets } from '../assets/assets';

const Banner = () => {
  return (
    <div className="relative w-full min-h-screen flex items-center bg-primary text-white overflow-hidden isolate">
      {/* Subtle Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-400/10 to-purple-400/10 animate-pulse-slow" />

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-12 md:py-16 lg:py-20">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          {/* Text Content */}
          <div className="lg:w-[55%] space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-teal-300 to-purple-300 bg-clip-text text-transparent">
                Find Your Trusted
              </span>
              <br />
              <span className="text-gray-100">Healthcare Partner</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-300 leading-relaxed border-l-4 border-teal-400/40 pl-4">
              Connect with certified specialists, schedule appointments effortlessly, 
              and experience personalized care tailored to your needs.{" "}
              <span className="text-teal-300/90 font-medium">Book now</span> and take 
              the first step towards better health.
            </p>
          </div>

          {/* Image Container */}
          <div className="lg:w-[45%] w-full relative group">
            <div className="relative overflow-hidden rounded-xl shadow-2xl transform transition-transform duration-500 hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-400/20 to-purple-400/10 animate-glow" />
              <img
                src={assets.appointment_img}
                alt="Doctor Consultation"
                className="w-full h-auto object-cover relative z-10"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Animated Elements */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="w-2 h-2 bg-teal-400/40 rounded-full animate-pulse"
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
        @keyframes glow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; transform: scale(1.05); }
        }
      `}</style>
    </div>
  );
};

export default Banner;