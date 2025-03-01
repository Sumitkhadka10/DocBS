import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const TopDoctors = () => {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight sm:text-4xl">
            Our Medical Experts
          </h2>
          <p className="mt-3 text-lg text-gray-500 max-w-2xl mx-auto">
            Experienced professionals dedicated to your health and well-being
          </p>
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {doctors && doctors.length > 0 ? (
            doctors.slice(0, 10).map((doctor) => (
              <div
                key={doctor._id}
                onClick={() => {
                  navigate(`/appointment/${doctor._id}`);
                  window.scrollTo(0, 0);
                }}
                className="
                  group relative bg-white rounded-xl shadow-sm
                  hover:shadow-md transition-shadow duration-300 cursor-pointer
                  border border-gray-100 overflow-hidden
                "
              >
                {/* Doctor Image */}
                <div className="aspect-w-4 aspect-h-3 bg-gray-50">
                  <img
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    src={doctor.image}
                    alt={doctor.name}
                    loading="lazy"
                  />
                </div>

                {/* Doctor Details */}
                <div className="p-4 space-y-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                    <span className="text-sm font-medium text-emerald-600">
                      Available Now
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 truncate">
                    {doctor.name}
                  </h3>
                  <p className="text-sm text-gray-600 font-medium truncate">
                    {doctor.speciality}
                  </p>
                </div>

                {/* Hover Border Effect */}
                <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-blue-200 transition-all duration-300 pointer-events-none"></div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 text-lg">
                Our medical team is currently updating - please check back soon
              </p>
            </div>
          )}
        </div>

        {/* View All Doctors Button */}
        <div className="mt-12 text-center">
          <button
            onClick={() => {
              navigate("/doctors");
              window.scrollTo(0, 0);
            }}
            className="
              inline-flex items-center px-8 py-3.5 border border-transparent
              text-base font-medium rounded-xl text-white bg-blue-600
              hover:bg-blue-700 transition-colors duration-300 shadow-sm hover:shadow-md
            "
          >
            View All Professionals
          </button>
        </div>
      </div>
    </section>
  );
};

export default TopDoctors;
