import React from 'react';
import { assets } from '../assets/assets';

const About = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 text-gray-500">
        <p>
          ABOUT <span className="text-gray-700 font-medium">US</span>
        </p>
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-12 items-center">
        <div className="w-full md:w-auto flex justify-center">
          <img
            className="w-full max-w-[360px] aspect-auto object-cover rounded-md shadow-md"
            src={assets.about_image}
            alt="About DoctorBookingSystem"
          />
        </div>
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600">
          <p>
            Welcome to DoctorBookingSystem, your trusted partner in managing your healthcare needs
            conveniently and efficiently. At DoctorBookingSystem, we understand the challenges
            individuals face when it comes to scheduling doctor appointments and managing their
            health records.
          </p>
          <p>
            DoctorBookingSystem is committed to excellence in healthcare technology. We
            continuously strive to enhance our platform, integrating the latest advancements to
            improve user experience and deliver superior service.
          </p>
          <div className="bg-blue-50 p-4 rounded-lg shadow-sm text-gray-700">
            <b>Our Vision:</b>
            <ul className="list-disc pl-5">
              <li>Create a seamless healthcare experience for every user.</li>
              <li>Bridge the gap between patients and healthcare providers.</li>
              <li>Enable secure, effortless access to quality healthcare.</li>
            </ul>
          </div>
          <p>
            Privacy and security are at the core of our platform, ensuring that your information is
            handled with the utmost care. Join us in reshaping the future of healthcare!
          </p>
        </div>
      </div>

      <div className="text-xl my-10">
        <p>
          WHY TO <span className="text-gray-700 font-semibold">CHOOSE US</span>
        </p>
      </div>

      <div className="flex flex-col md:flex-row mb-20 gap-6 md:gap-0">
        {[
          {
            title: 'Efficiency:',
            description:
              'Streamlined tools for appointment scheduling and management save you time and reduce hassle.',
            icon: '🕒',
          },
          {
            title: 'Convenience:',
            description:
              'Access a network of trusted healthcare professionals with a user-friendly platform.',
            icon: '🌍',
          },
          {
            title: 'Personalization:',
            description:
              'Tailored recommendations and reminders to keep your health on track effortlessly.',
            icon: '✨',
          },
        ].map((item, index) => (
          <div
            key={index}
            className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer"
          >
            <div className="text-3xl">{item.icon}</div>
            <b>{item.title}</b>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;
