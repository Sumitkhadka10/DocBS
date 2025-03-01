import React from 'react';
import { FaShieldAlt, FaCalendarCheck, FaUserMd, FaRegClock, FaCheckCircle, FaStar } from 'react-icons/fa';
import { assets } from '../assets/assets';

const features = [
  { icon: <FaShieldAlt />, title: "Secure Platform", text: "Encrypted data storage and transmission" },
  { icon: <FaCalendarCheck />, title: "Flexible Scheduling", text: "24/7 appointment management" },
  { icon: <FaUserMd />, title: "Verified Providers", text: "License-checked medical professionals" },
  { icon: <FaRegClock />, title: "Real-Time Updates", text: "Instant appointment confirmations" }
];

const trustMetrics = [
  { value: "10K+", label: "Patients Served" },
  { value: "4.5/5", label: "Average Rating" },
  { value: "24h", label: "Support Response" }
];

const testimonials = [
  { text: "Simplified our clinic's appointment management significantly", role: "Healthcare Professional" },
  { text: "Reliable way to manage family medical appointments", role: "Verified Patient" },
  { text: "Secure platform that meets our privacy requirements", role: "Medical Administrator" }
];

const complianceItems = [
  { icon: <FaShieldAlt />, text: "Regular security audits" },
  { icon: <FaCheckCircle />, text: "HIPAA-compliant data practices" }
];

const About = () => (
  <div className="px-4 md:px-16 lg:px-24 xl:px-32 max-w-screen-xl mx-auto py-16">
    <section className="text-center mb-20">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 hover:text-primary transition-colors duration-300">
        Streamlining <span className="text-primary">Medical Coordination</span>
      </h1>
      <p className="text-gray-600 max-w-2xl mx-auto text-lg hover:opacity-90 transition-opacity">
        Secure platform connecting patients with verified healthcare providers
      </p>
    </section>

    <section className="flex flex-col lg:flex-row gap-16 items-center mb-20">
      <div className="lg:w-1/2 relative group">
        <img src={assets.about_image} alt="Healthcare platform interface" className="rounded-xl shadow-lg w-full h-auto transform transition-transform duration-500 group-hover:scale-95" />
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

      <div className="lg:w-1/2 space-y-8">
        <h2 className="text-2xl font-semibold text-gray-900 hover:text-primary transition-colors">
          Practical Healthcare Solutions
        </h2>
        <p className="text-gray-600 hover:text-gray-700 transition-colors">Our platform simplifies medical coordination through:</p>
        <div className="grid md:grid-cols-2 gap-6">
          {features.map(({ icon, title, text }, index) => (
            <div key={index} className="p-4 bg-white rounded-lg border border-gray-100 hover:border-primary/30 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-2 rounded-md hover:bg-primary/20 transition-colors">
                  {icon}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1 hover:text-primary transition-colors">{title}</h3>
                  <p className="text-gray-600 text-sm hover:text-gray-700">{text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="bg-gray-50 rounded-xl p-8 mb-20 hover:shadow-inner transition-shadow duration-300">
      <div className="grid md:grid-cols-3 gap-8 text-center">
        {trustMetrics.map(({ value, label }, index) => (
          <div key={index} className="space-y-2 p-4 hover:bg-white hover:shadow-sm rounded-lg transition-all duration-200">
            <p className="text-2xl font-semibold text-gray-900 hover:text-primary transition-colors">{value}</p>
            <p className="text-gray-600 text-sm hover:text-gray-700">{label}</p>
          </div>
        ))}
      </div>
    </section>

    <section className="mb-20">
      <h2 className="text-2xl font-semibold text-center text-gray-900 mb-12 hover:text-primary transition-colors">Community Feedback</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map(({ text, role }, index) => (
          <div key={index} className="p-6 bg-white rounded-lg border border-gray-100 hover:border-primary/30 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary/20 transition-colors">
                <FaStar className="text-primary hover:text-primary-dark" />
              </div>
              <div><p className="text-sm font-medium text-gray-500 hover:text-gray-600">{role}</p></div>
            </div>
            <p className="text-gray-600 text-sm hover:text-gray-700">"{text}"</p>
          </div>
        ))}
      </div>
    </section>

    <section className="bg-primary/5 rounded-xl p-8 hover:shadow-inner transition-shadow duration-300">
      <div className="flex flex-col md:flex-row gap-8 items-center">
        <div className="md:w-1/2 space-y-4">
          <h3 className="text-xl font-semibold text-gray-900 hover:text-primary transition-colors">Commitment to Security</h3>
          <div className="space-y-3">
            {complianceItems.map(({ icon, text }, index) => (
              <div key={index} className="flex items-center gap-3 hover:bg-white p-2 rounded-lg transition-colors">
                {icon}
                <p className="text-gray-600 text-sm">{text}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="md:w-1/2 text-center">
          <div className="inline-flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-sm hover:shadow-md hover:scale-105 transition-all">
            <span className="text-primary text-2xl">✓</span>
            <p className="text-gray-600 text-sm">Verified secure platform</p>
          </div>
        </div>
      </div>
    </section>
  </div>
);

export default About;
