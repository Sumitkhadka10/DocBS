import React from 'react';
import { assets } from '../assets/assets';

const About = () => {
  return (
    <div className="px-4 md:px-16 lg:px-20 xl:px-32 max-w-screen-xl mx-auto">
      {/* Heading Section */}
      <div className="text-center text-2xl md:text-4xl pt-10 font-semibold text-gray-500">
        <p>
          ABOUT <span className="text-primary font-bold">US</span>
        </p>
        <p className="text-lg mt-4 text-gray-600">
          Empowering healthcare with technology, convenience, and trust.
        </p>
      </div>

      {/* About Content */}
      <div className="my-16 flex flex-col md:flex-row gap-16 items-center">
        {/* Image Section */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            className="w-full max-w-[500px] aspect-auto object-cover rounded-xl shadow-lg"
            src={assets.about_image}
            alt="About DoctorBookingSystem"
          />
        </div>
        {/* Text Section */}
        <div className="flex flex-col justify-center gap-8 md:w-1/2 text-lg text-gray-600">
          <p>
            At <b className="text-primary">DoctorBookingSystem</b>, we are revolutionizing the way people access healthcare. By combining cutting-edge technology with a simple, user-friendly platform, we make doctor appointments easy, fast, and secure.
          </p>
          <p>
            We understand the hassle of managing healthcare needs, which is why we've developed a seamless system that allows you to book appointments, manage schedules, and keep track of your health all in one place.
          </p>
          <div className="bg-primary bg-opacity-10 p-6 rounded-xl shadow-lg text-gray-700">
            <b className="text-xl text-primary">Our Vision:</b>
            <ul className="list-disc pl-5 mt-2 space-y-2">
              <li className="text-base">Create an accessible healthcare ecosystem for all users.</li>
              <li className="text-base">Bridge the gap between patients and doctors through technology.</li>
              <li className="text-base">Enable secure and effortless access to top-tier healthcare professionals.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="text-center text-3xl my-16 font-semibold text-gray-700">
        <p>
          Why <span className="text-primary font-bold">Choose Us</span>
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {[ 
          { title: 'Efficiency', description: 'Save time with our fast, easy-to-use appointment scheduling system.' },
          { title: 'Convenience', description: 'Book appointments from anywhere and at any time, with just a few clicks.' },
          { title: 'Personalization', description: 'Receive tailored health reminders and recommendations that work for you.' }
        ].map((item, index) => (
          <div
            key={index}
            className="hover:scale-105 transition-all duration-300 border px-6 py-8 bg-white rounded-xl shadow-lg flex flex-col items-center gap-4 text-gray-700 cursor-pointer"
          >
            <div className="text-4xl sm:text-6xl text-primary">{/* Dynamic or Custom Icon here */}</div>
            <b className="text-xl">{item.title}</b>
            <p className="text-base">{item.description}</p>
          </div>
        ))}
      </div>

      {/* Our Features Section */}
      <div className="text-center text-3xl my-16 font-semibold text-gray-700">
        <p>
          Our <span className="text-primary font-bold">Features</span>
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {[ 
          { title: '24/7 Support', description: 'Our team is always available to assist you whenever you need us.' },
          { title: 'Easy Access', description: 'Access our platform through any device, at any time, from anywhere.' },
          { title: 'Real-Time Updates', description: 'Stay updated with live notifications and reminders on your appointments.' }
        ].map((feature, index) => (
          <div
            key={index}
            className="hover:scale-105 transition-all duration-300 border px-8 py-6 bg-white rounded-xl shadow-lg text-center text-gray-700"
          >
            <div className="text-4xl sm:text-6xl text-primary mb-4">{/* Icon representing feature */}</div>
            <b className="text-xl text-primary">{feature.title}</b>
            <p className="text-base mt-2">{feature.description}</p>
          </div>
        ))}
      </div>

      {/* Testimonials Section */}
      <div className="text-center text-3xl my-16 font-semibold text-gray-700">
        <p>
          What Our <span className="text-primary font-bold">Users Say</span>
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 justify-center">
        {[ 
          { name: 'Rahul Shrestha', feedback: 'DoctorBookingSystem has made booking appointments so much easier. It’s fast, secure, and reliable!' },
          { name: 'Kiyana Thapa', feedback: 'I can now schedule my doctor’s appointments in just a few minutes. Love it!' },
          { name: 'Ritika Adhikari', feedback: 'I trust DoctorBookingSystem for all my healthcare needs. It’s so convenient!' },
        ].map((testimonial, index) => (
          <div
            key={index}
            className="border p-6 rounded-xl shadow-lg text-gray-600 hover:scale-105 transition-all duration-300"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="text-5xl">{/* Avatar or Image of User */}</div>
              <b className="text-xl text-primary">{testimonial.name}</b>
            </div>
            <p className="text-base">{testimonial.feedback}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;
