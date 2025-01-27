import React from 'react';
import { assets } from '../assets/assets';

const Contact = () => {
  return (
    <div className="px-4 py-10">
      {/* Heading Section */}
      <div className="text-center text-3xl font-semibold pt-10 text-gray-700">
        <p>
          CONTACT <span className="text-blue-600">US</span>
        </p>
        <p className="text-gray-500 text-lg mt-2">We are here to assist you</p>
      </div>

      {/* Content Section */}
      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 items-center">
        {/* Office Information */}
        <div className="flex flex-col justify-center items-start gap-6 w-full md:w-1/2">
          <p className="font-semibold text-xl text-gray-600">Our Office</p>
          <p className="text-gray-500">
            Kathmandu, Nepal <br /> Kageshwori, Manohara-09
          </p>
          <p className="text-gray-500">
            Tel: <span className="font-medium">+977 9813600000</span> <br />
            Email: <span className="font-medium">doctorbookingsystem@gmail.com</span>
          </p>
          <div className="mt-4 flex gap-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Facebook
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline"
            >
              Twitter
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-500 hover:underline"
            >
              Instagram
            </a>
          </div>
          <div className="mt-6 flex flex-col gap-4">
            <a
              href="mailto:doctorbookingsystem@gmail.com"
              className="bg-green-600 text-white px-5 py-2 rounded-lg shadow-md text-center hover:bg-green-700"
            >
              Send Us an Email
            </a>
            <a
              href="tel:+9779813600000"
              className="bg-blue-500 text-white px-5 py-2 rounded-lg shadow-md text-center hover:bg-blue-600"
            >
              Call Us Now
            </a>
          </div>
        </div>

        {/* Contact Image */}
        <img
          className="w-full md:max-w-[400px] rounded-xl shadow-lg"
          src={assets.contact_image}
          alt="Contact Us"
        />
      </div>

      {/* Location Map Section */}
      <div className="mt-10">
        <h3 className="text-center text-xl font-semibold text-gray-700 mb-4">Find Us Here</h3>
        <div className="flex justify-center">
          <iframe
            title="Office Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.3871411347396!2d85.3240364150613!3d27.708955682792284!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb198fd987d119%3A0x2d3aee8356bc872!2sKathmandu%2C%20Nepal!5e0!3m2!1sen!2snp!4v1673996145263!5m2!1sen!2snp"
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>

      {/* Additional Information Section */}
      <div className="bg-gray-100 py-6 px-4 rounded-lg shadow-md mt-10">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Why Contact Us?</h3>
        <p className="text-gray-500 mb-2">For booking-related inquiries and support</p>
        <p className="text-gray-500 mb-2">To provide feedback or suggestions</p>
        <p className="text-gray-500">For partnership and collaboration opportunities</p>
      </div>

      {/* Footer Note */}
      <div className="mt-10 text-center text-gray-500">
        <p>We value your feedback and inquiries. Feel free to reach out to us anytime!</p>
      </div>
    </div>
  );
};

export default Contact;
