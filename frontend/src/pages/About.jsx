import React from 'react';
import { assets } from '../assets/assets';

const About = () => {
  return (
    <div className="px-4 md:px-20 lg:px-40">
      {/* Heading Section */}
      <div className="text-center text-2xl md:text-4xl pt-10 text-gray-500 font-semibold">
        <p>
          ABOUT <span className="text-gray-700 font-bold">US</span>
        </p>
      </div>

      {/* About Content */}
      <div className="my-12 flex flex-col md:flex-row gap-12 items-center">
        {/* Image Section */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            className="w-full max-w-[360px] md:max-w-[500px] aspect-auto object-cover rounded-md shadow-md"
            src={assets.about_image}
            alt="About DoctorBookingSystem"
          />
        </div>
        {/* Text Section */}
        <div className="flex flex-col justify-center gap-6 md:w-1/2 text-base text-gray-600">
          <p>
            Welcome to <b>DoctorBookingSystem</b>, your trusted partner in managing your healthcare needs
            conveniently and efficiently. At DoctorBookingSystem, we understand the challenges
            individuals face when it comes to scheduling doctor appointments and managing their
            health records.
          </p>
          <p>
            DoctorBookingSystem is committed to excellence in healthcare technology. We
            continuously strive to enhance our platform, integrating the latest advancements to
            improve user experience and deliver superior service.
          </p>
          <div className="bg-blue-50 p-6 rounded-lg shadow-md text-gray-700">
            <b>Our Vision:</b>
            <ul className="list-disc pl-5 mt-2">
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

      {/* Why Choose Us Section */}
      <div className="text-center text-xl md:text-3xl my-16 font-semibold text-gray-700">
        <p>
          WHY <span className="text-primary font-bold">CHOOSE US</span>
        </p>
      </div>

      <div className="flex flex-col md:flex-row justify-between mb-20 gap-8 md:gap-4">
        {[
          {
            title: 'Efficiency',
            description:
              'Streamlined tools for appointment scheduling and management save you time and reduce hassle.',
            icon: '🕒',
          },
          {
            title: 'Convenience',
            description:
              'Access a network of trusted healthcare professionals with a user-friendly platform.',
            icon: '🌍',
          },
          {
            title: 'Personalization',
            description:
              'Tailored recommendations and reminders to keep your health on track effortlessly.',
            icon: '✨',
          },
        ].map((item, index) => (
          <div
            key={index}
            className="border px-10 md:px-12 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer rounded-lg shadow-sm"
          >
            <div className="text-3xl md:text-4xl">{item.icon}</div>
            <b className="text-lg md:text-xl">{item.title}</b>
            <p className="text-sm md:text-base">{item.description}</p>
          </div>
        ))}
      </div>

      {/* Additional Features Section */}
      <div className="text-center text-xl md:text-3xl my-16 font-semibold text-gray-700">
        <p>
          OUR <span className="text-primary font-bold">FEATURES</span>
        </p>
      </div>
      <div className="flex flex-col md:flex-row gap-8 mb-20">
        {[
          {
            title: '24/7 Support',
            description:
              'Our dedicated team is available around the clock to assist you with your healthcare needs.',
            icon: '📞',
          },
          {
            title: 'Easy Access',
            description:
              'Access our platform from anywhere, anytime, using your preferred device.',
            icon: '📱',
          },
          {
            title: 'Reliable Updates',
            description:
              'Stay informed with real-time updates about appointments and health tips.',
            icon: '🔔',
          },
        ].map((feature, index) => (
          <div
            key={index}
            className="border px-8 py-6 rounded-lg shadow-md text-gray-600 hover:shadow-lg transition-all duration-300 text-center"
          >
            <div className="text-4xl mb-4">{feature.icon}</div>
            <b className="text-lg md:text-xl text-gray-700">{feature.title}</b>
            <p className="text-sm md:text-base mt-2">{feature.description}</p>
          </div>
        ))}
      </div>

      {/* Testimonials Section */}
      <div className="text-center text-xl md:text-3xl my-16 font-semibold text-gray-700">
        <p>
          WHAT OUR <span className="text-primary font-bold">USERS SAY</span>
        </p>
      </div>
      <div className="flex flex-col md:flex-row gap-8">
        {[
          {
            name: 'Rahul Shrestha',
            feedback:
              'DoctorBookingSystem has completely transformed how I manage my healthcare. Highly recommended!',
            avatar: '🙂',
          },
          {
            name: 'Kiyana Thapa',
            feedback:
              'Easy to use and extremely efficient. I can book appointments without any hassle!',
            avatar: '😊',
          },
          {
            name: 'Ritika Adhikari',
            feedback:
              'Finding the right doctor was never this easy. Amazing platform for everyone!',
            avatar: '🙌',
          },
          {
            name: 'Santosh Chetri',
            feedback:
              'The personalized reminders are a game-changer. Never miss an appointment again!',
            avatar: '👍',
          },
        ].map((testimonial, index) => (
          <div
            key={index}
            className="border p-6 rounded-lg shadow-md text-gray-600 hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="text-4xl">{testimonial.avatar}</div>
              <b className="text-lg md:text-xl text-gray-700">{testimonial.name}</b>
            </div>
            <p className="text-sm md:text-base">{testimonial.feedback}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;
