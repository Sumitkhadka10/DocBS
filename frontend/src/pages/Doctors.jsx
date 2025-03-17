import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import { AppContext } from '../context/AppContext';

const Doctors = () => {
  const { speciality } = useParams();
  const navigate = useNavigate(); 
  const [filterDoc, setFilterDoc] = useState([]); 
  const [sortOption, setSortOption] = useState('default'); 
  const { doctors } = useContext(AppContext);

  const applyFilterAndSort = () => {
    let filtered = speciality 
      ? doctors.filter((doc) => doc.speciality === speciality) 
      : [...doctors];

    if (sortOption === 'availability') {
      filtered.sort((a, b) => (a.available === b.available ? 0 : a.available ? -1 : 1));
    } else if (sortOption === 'unavailability') {
      filtered.sort((a, b) => (a.available === b.available ? 0 : a.available ? 1 : -1));
    }

    setFilterDoc(filtered);
  };

  useEffect(() => {
    applyFilterAndSort();
  }, [doctors, speciality, sortOption]);

  const specialities = [
    'General physician',
    'Gynecologist',
    'Dermatologist',
    'Pediatricians',
    'Neurologist',
    'Gastroenterologist'
  ];

  const handleSortChange = (option) => {
    setSortOption(option);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <h1 className="text-3xl font-bold text-gray-900 hover:text-primary transition-colors">
            Expert Medical Professionals
          </h1>
          <p className="mt-2 text-gray-600 hover:text-gray-700 transition-colors">
            Connect with leading medical specialists committed to providing exceptional care and personalized treatment.
          </p>
        </div>
      </div>

      {/* Specialty Navigation */}
      <div className="bg-white border-y border-slate-200 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center overflow-x-auto py-4 no-scrollbar">
            <button
              onClick={() => navigate('/doctors')}
              className={`whitespace-nowrap mr-3 px-5 py-2.5 rounded-md text-sm font-medium transition-all ${
                !speciality
                  ? 'bg-primary text-white shadow-sm'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-700'
              }`}
            >
              All Specialists
            </button>
            {specialities.map((spec) => (
              <button
                key={spec}
                onClick={() => (speciality === spec ? navigate('/doctors') : navigate(`/doctors/${spec}`))}
                className={`whitespace-nowrap mr-3 px-5 py-2.5 rounded-md text-sm font-medium transition-all ${
                  speciality === spec
                    ? 'bg-primary text-white shadow-sm'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-700'
                }`}
              >
                {spec}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 hover:text-primary transition-colors">
              {speciality || 'All Specialists'}
            </h2>
            <div className="flex items-center mt-2">
              <span className="inline-flex items-center justify-center bg-primary/10 text-primary text-sm px-3 py-1 rounded-md font-medium">
                {filterDoc.length} {filterDoc.length === 1 ? 'Professional' : 'Professionals'}
              </span>
            </div>
          </div>
          
          <div className="relative w-full sm:w-auto">
            <div className="flex items-center">
              <span className="text-sm text-gray-600 mr-3 font-medium hover:text-gray-700">Sort by:</span>
              <select
                value={sortOption}
                onChange={(e) => handleSortChange(e.target.value)}
                className="flex-grow sm:flex-grow-0 bg-white border border-gray-300 text-gray-600 text-sm py-2.5 pl-4 pr-10 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary hover:text-gray-700"
              >
                <option value="default">Default</option>
                <option value="availability">Available First </option>
                <option value="unavailability">Unavailable First </option>
              </select>
              <svg
                className="w-4 h-4 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>
          </div>
        </div>

        {/* Doctor Grid */}
        {filterDoc.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-16 text-center">
            <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <p className="text-gray-900 text-xl font-medium hover:text-primary transition-colors">No specialists found</p>
            <p className="text-gray-600 text-sm mt-2 max-w-md mx-auto hover:text-gray-700">We couldn't find any specialists in this category. Try selecting a different specialty or view all specialists.</p>
            <button
              onClick={() => navigate('/doctors')}
              className="mt-6 px-6 py-2.5 bg-primary text-white rounded-md hover:bg-primary/90 transition font-medium text-sm shadow-sm"
            >
              View All Specialists
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filterDoc.map((doctor, index) => (
              <div
                key={index}
                className="group bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition-all hover:shadow-md hover:border-gray-300"
              >
                {/* Doctor Image with Container */}
                <div 
                  className="relative h-64 bg-gray-50 flex items-center justify-center overflow-hidden cursor-pointer"
                  onClick={() => navigate(`/appointment/${doctor._id}`)}
                >
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-3/4 h-3/4 object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute top-0 left-0 w-full p-4 flex justify-between items-start">
                    <span
                      className={`px-3 py-1.5 text-xs font-medium rounded-md ${
                        doctor.available
                          ? 'bg-primary/10 text-primary'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {doctor.available ? 'Available' : 'Unavailable'}
                    </span>
                  </div>
                </div>
                
                {/* Doctor Info */}
                <div className="p-6">
                  <h3 
                    className="text-gray-900 font-semibold text-lg cursor-pointer hover:text-primary transition-colors"
                    onClick={() => navigate(`/appointment/${doctor._id}`)}
                  >
                    {doctor.name}
                  </h3>
                  <div className="flex items-center mt-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2"></div>
                    <p className="text-gray-600 text-sm font-medium hover:text-gray-700">{doctor.speciality}</p>
                  </div>
                  
                  <div className="mt-6 pt-5 border-t border-gray-100 flex justify-between items-center">
                    <span className="text-xs text-gray-500 font-medium hover:text-gray-600">
                      {doctor.available ? 'Accepting new patients' : 'Not accepting patients'}
                    </span>
                    <button
                      onClick={() => doctor.available && navigate(`/appointment/${doctor._id}`)}
                      className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                        doctor.available
                          ? 'bg-primary text-white hover:bg-primary/90'
                          : 'bg-gray-100 text-gray-600 cursor-not-allowed'
                      }`}
                    >
                      {doctor.available ? 'Book' : 'Unavailable'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Doctors;