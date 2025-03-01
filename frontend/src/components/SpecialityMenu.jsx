import React from "react";
import { specialityData } from "../assets/assets";
import { Link } from "react-router-dom";

const SpecialityMenu = () => {
  return (
    <section className="relative py-20 px-4 bg-gradient-to-b from-blue-50 to-white" id="speciality">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-14 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Explore Medical Specializations
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Direct access to specialized healthcare experts with verified credentials
          </p>
        </div>

        {/* Speciality Cards Slider */}
        <div className="relative group">
          <div className="flex snap-x snap-mandatory overflow-x-auto pb-8 gap-8 scrollbar-hide">
            {specialityData.map((item, index) => (
              <Link
                key={index}
                to={`/doctors/${item.speciality}`}
                onClick={() => window.scrollTo(0, 0)}
                className="
                  snap-center flex flex-col items-center
                  p-8 w-72 min-w-[288px] bg-white/90 backdrop-blur-sm rounded-2xl
                  shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out
                  border border-white hover:border-blue-100 transform hover:-translate-y-3
                  active:scale-95 relative overflow-hidden
                "
              >
                {/* Hover Overlay Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-white/50 opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* Speciality Icon */}
                <div className="mb-6 p-4 bg-blue-50 rounded-full relative">
                  <div className="absolute inset-0 bg-blue-100/30 blur-[20px]" />
                  <img
                    className="w-16 h-16 object-contain transition-transform duration-300 hover:scale-110"
                    src={item.image}
                    alt={item.speciality}
                    loading="lazy"
                  />
                </div>

                {/* Speciality Title & Description */}
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.speciality}</h3>
                <p className="text-center text-sm text-gray-600">
                  {item.description || "Expert care available"}
                </p>
              </Link>
            ))}
          </div>

          {/* Gradient Overlay for Scroll Indication */}
          <div className="absolute right-0 top-0 w-24 h-full bg-gradient-to-l from-blue-50/80 to-transparent pointer-events-none" />
        </div>
      </div>
    </section>
  );
};

export default SpecialityMenu;
