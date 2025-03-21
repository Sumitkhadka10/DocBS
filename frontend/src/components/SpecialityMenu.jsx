import React from "react";
import { specialityData } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const SpecialityMenu = ({ hideTitles = false, currentSpeciality }) => {
  const navigate = useNavigate();

  const handleSpecialityClick = (speciality) => {
    // If the clicked specialty is the current one, navigate to default "All Specialists"
    if (speciality === currentSpeciality) {
      navigate('/doctors');
    } else {
      // Otherwise, navigate to the selected specialty
      navigate(`/doctors/${speciality}`);
    }
  };

  return (
    <section className="py-2 px-4 sm:px-6" id="speciality">
      <div className="max-w-7xl mx-auto">
        <div className="relative">
          <div className="flex overflow-x-auto gap-10 no-scrollbar">
            {specialityData.map((item, index) => (
              <div
                key={index}
                onClick={() => handleSpecialityClick(item.speciality)}
                className={`flex flex-col items-center min-w-[140px] transition-all duration-300 ease-in-out hover:-translate-y-2 active:scale-95 cursor-pointer ${
                  currentSpeciality === item.speciality ? 'border-b-2 border-blue-600' : ''
                }`}
              >
                <div className="mb-1 relative flex items-center justify-center">
                  <img
                    className="w-24 h-24 object-contain relative z-10 transition-transform duration-300 hover:scale-110"
                    src={item.image}
                    alt={item.speciality}
                    loading="lazy"
                  />
                </div>
                {!hideTitles && (
                  <h3
                    className={`text-lg font-semibold text-center transition-colors duration-300 ${
                      currentSpeciality === item.speciality ? 'text-blue-600' : 'text-gray-900'
                    }`}
                  >
                    {item.speciality}
                  </h3>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpecialityMenu;