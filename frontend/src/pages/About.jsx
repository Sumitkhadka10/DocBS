import React from 'react';
import { 
  FaShieldAlt, 
  FaCalendarCheck, 
  FaUserMd, 
  FaRegClock,
  FaCheckCircle,
  FaStar
} from 'react-icons/fa';
import { assets } from '../assets/assets';

const About = () => {
  return (
    <div className="px-4 md:px-16 lg:px-24 xl:px-32 max-w-screen-xl mx-auto py-16">

      {/* Header Section */}
      <div className="text-center mb-20">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 hover:text-primary transition-colors duration-300">
          Streamlining <span className="text-primary">Medical Coordination</span>
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg hover:opacity-90 transition-opacity">
          Secure platform connecting patients with verified healthcare providers
        </p>
      </div>

      {/* Core Content */}
      <div className="flex flex-col lg:flex-row gap-16 items-center mb-20">
        {/* Image Section */}
        <div className="lg:w-1/2 relative group">
          <img
            src={assets.about_image}
            alt="Healthcare platform interface"
            className="rounded-xl shadow-lg w-full h-auto transform transition-transform duration-500 group-hover:scale-95"
          />
          <div className="absolute -bottom-6 -right-6 bg-white p-5 rounded-xl shadow-md border border-gray-100 hover:-translate-y-2 transition-transform">
            <div className="flex items-center gap-3">
              <FaCheckCircle className="text-xl text-primary" />
              <div>
                <p className="text-lg font-semibold text-gray-900">4.7/5</p>
                <p className="text-gray-600 text-sm">User Satisfaction</p>
              </div>
            </div>
          </div>
        </div>

        {/* Value Proposition */}
        <div className="lg:w-1/2 space-y-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900 hover:text-primary transition-colors">
              Practical Healthcare Solutions
            </h2>
            <p className="text-gray-600 hover:text-gray-700 transition-colors">
              Our platform simplifies medical coordination through:
            </p>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: <FaShieldAlt className="text-xl text-primary" />,
                title: "Secure Platform",
                text: "Encrypted data storage and transmission"
              },
              {
                icon: <FaCalendarCheck className="text-xl text-primary" />,
                title: "Flexible Scheduling",
                text: "24/7 appointment management"
              },
              {
                icon: <FaUserMd className="text-xl text-primary" />,
                title: "Verified Providers",
                text: "License-checked medical professionals"
              },
              {
                icon: <FaRegClock className="text-xl text-primary" />,
                title: "Real-Time Updates",
                text: "Instant appointment confirmations"
              }
            ].map((feature, index) => (
              <div 
                key={index} 
                className="p-4 bg-white rounded-lg border border-gray-100 hover:border-primary/30 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-2 rounded-md hover:bg-primary/20 transition-colors">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1 hover:text-primary transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 text-sm hover:text-gray-700">{feature.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Trust Metrics */}
      <div className="bg-gray-50 rounded-xl p-8 mb-20 hover:shadow-inner transition-shadow duration-300">
        <div className="grid md:grid-cols-3 gap-8 text-center">
          {[
            { value: "10K+", label: "Patients Served" },
            { value: "4.5/5", label: "Average Rating" },
            { value: "24h", label: "Support Response" }
          ].map((metric, index) => (
            <div 
              key={index} 
              className="space-y-2 p-4 hover:bg-white hover:shadow-sm rounded-lg transition-all duration-200"
            >
              <p className="text-2xl font-semibold text-gray-900 hover:text-primary transition-colors">
                {metric.value}
              </p>
              <p className="text-gray-600 text-sm hover:text-gray-700">{metric.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className="mb-20">
        <h2 className="text-2xl font-semibold text-center text-gray-900 mb-12 hover:text-primary transition-colors">
          Community Feedback
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              text: "Simplified our clinic's appointment management significantly",
              role: "Healthcare Professional"
            },
            {
              text: "Reliable way to manage family medical appointments",
              role: "Verified Patient"
            },
            {
              text: "Secure platform that meets our privacy requirements",
              role: "Medical Administrator"
            }
          ].map((testimonial, index) => (
            <div 
              key={index} 
              className="p-6 bg-white rounded-lg border border-gray-100 hover:border-primary/30 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary/20 transition-colors">
                  <FaStar className="text-primary hover:text-primary-dark" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 hover:text-gray-600">
                    {testimonial.role}
                  </p>
                </div>
              </div>
              <p className="text-gray-600 text-sm hover:text-gray-700">"{testimonial.text}"</p>
            </div>
          ))}
        </div>
      </div>

      {/* Compliance */}
      <div className="bg-primary/5 rounded-xl p-8 hover:shadow-inner transition-shadow duration-300">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="md:w-1/2 space-y-4">
            <h3 className="text-xl font-semibold text-gray-900 hover:text-primary transition-colors">
              Commitment to Security
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 hover:bg-white p-2 rounded-lg transition-colors">
                <FaShieldAlt className="text-xl text-primary" />
                <p className="text-gray-600 text-sm">Regular security audits</p>
              </div>
              <div className="flex items-center gap-3 hover:bg-white p-2 rounded-lg transition-colors">
                <FaCheckCircle className="text-xl text-primary" />
                <p className="text-gray-600 text-sm">HIPAA-compliant data practices</p>
              </div>
            </div>
          </div>
          <div className="md:w-1/2 text-center">
            <div className="inline-flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-sm hover:shadow-md hover:scale-105 transition-all">
              <span className="text-primary text-2xl">✓</span>
              <p className="text-gray-600 text-sm">Verified secure platform</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default About;