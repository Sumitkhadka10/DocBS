import React, { useContext, useEffect, useState } from 'react';
import { AdminContext } from '../../context/AdminContext';

const DoctorList = () => {
  const { doctors, aToken, getAllDoctors, changeAvailability } = useContext(AdminContext);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [filter, setFilter] = useState('all');
  
  useEffect(() => {
    if (aToken) getAllDoctors();
  }, [aToken]);

  const filteredDoctors = doctors.filter(doctor => {
    if (filter === 'all') return true;
    return filter === 'available' ? doctor.available : !doctor.available;
  });

  // Status icons
  const availableIcon = (
    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
    </svg>
  );
  
  const unavailableIcon = (
    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
    </svg>
  );

  return (
    <div className="p-8 max-h-[90vh] overflow-y-auto bg-white w-full">
      {/* Header with decorative elements */}
      <div className="relative mb-10">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full opacity-20 -mt-10 -mr-10"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-50 rounded-full opacity-20 -mb-10 -ml-10"></div>
        
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 relative z-10">
          <div>
            <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-500 mb-2">Doctor Directory</h1>
            <p className="text-sm text-gray-500">Manage your medical professionals</p>
          </div>
          <div className="px-6 py-4 bg-white rounded-md shadow-md border border-gray-200 flex items-center">
            <span className="font-bold text-xl text-gray-700">{filteredDoctors.length}</span>
            <span className="text-sm text-gray-500 ml-2">Doctors</span>
          </div>
        </div>
      </div>
      
      {/* Enhanced filter tabs */}
      <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
        <button 
          className={`px-5 py-3 rounded-md font-medium text-base transition-all ${
            filter === 'all' 
              ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-md' 
              : 'bg-white text-gray-700 hover:bg-blue-50 shadow-md border border-gray-200'
          }`}
          onClick={() => setFilter('all')}
        >
          <span className="flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path>
            </svg>
            All Doctors
          </span>
        </button>
        <button 
          className={`px-5 py-3 rounded-md font-medium text-base transition-all ${
            filter === 'available' 
              ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-md' 
              : 'bg-white text-gray-700 hover:bg-blue-50 shadow-md border border-gray-200'
          }`}
          onClick={() => setFilter('available')}
        >
          <span className="flex items-center">
            {availableIcon}
            Available
          </span>
        </button>
        <button 
          className={`px-5 py-3 rounded-md font-medium text-base transition-all ${
            filter === 'unavailable' 
              ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-md' 
              : 'bg-white text-gray-700 hover:bg-blue-50 shadow-md border border-gray-200'
          }`}
          onClick={() => setFilter('unavailable')}
        >
          <span className="flex items-center">
            {unavailableIcon}
            Unavailable
          </span>
        </button>
      </div>
      
      {/* Doctor Grid with improved cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredDoctors.map((doctor, index) => (
          <div 
            key={index} 
            className="bg-white rounded-md overflow-hidden shadow-md hover:shadow-lg transition-all duration-200 border border-gray-200 transform hover:-translate-y-1"
            onMouseEnter={() => setHoveredCard(index)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="relative">
              <div className="w-full h-64 overflow-hidden">
                <img 
                  className="w-full h-full object-cover object-center"
                  src={doctor.image} 
                  alt={`Dr. ${doctor.name}`}
                  style={{
                    transform: hoveredCard === index ? 'scale(1.08)' : 'scale(1)',
                    transition: 'transform 0.5s ease-in-out'
                  }}
                />
              </div>
              <div className={`absolute top-4 right-4 px-4 py-2 rounded-md text-xs font-bold tracking-wide flex items-center ${
                doctor.available 
                  ? 'bg-blue-500 text-white border border-blue-600' 
                  : 'bg-red-500 text-white border border-red-600'
              }`}>
                {doctor.available ? availableIcon : unavailableIcon}
                {doctor.available ? 'Available' : 'Unavailable'}
              </div>
            </div>
            
            <div className="p-6">
              <h2 className="text-base font-medium text-gray-700 mb-1 hover:text-blue-600 transition-colors">
                {doctor.name}
              </h2>
              
              <div className="flex items-center mb-4">
                <span className="inline-block px-3 py-1 bg-blue-50 text-gray-700 text-sm font-medium rounded-md mr-2">
                  {doctor.speciality}
                </span>
                
                {doctor.experience && (
                  <span className="text-sm text-gray-500">
                    {doctor.experience} Exp
                  </span>
                )}
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Availability</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={doctor.available} 
                      onChange={() => changeAvailability(doctor._id)} 
                      className="sr-only"
                    />
                    <div className={`w-12 h-6 rounded-full transition ${
                      doctor.available ? 'bg-gradient-to-r from-blue-600 to-blue-500' : 'bg-gray-300'
                    }`}>
                      <div className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full shadow-md transition-transform ${
                        doctor.available ? 'translate-x-6' : ''
                      }`}></div>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Enhanced empty state */}
      {filteredDoctors.length === 0 && (
        <div className="flex flex-col items-center justify-center h-96 bg-white rounded-md border border-gray-200 shadow-md">
          <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-6">
            <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-700 mb-2">No doctors found</h3>
          <p className="text-sm text-gray-500 text-center max-w-md">
            {filter === 'all' 
              ? 'There are no doctors available in the system at the moment.' 
              : `No ${filter} doctors found. Try changing the filter.`}
          </p>
        </div>
      )}
    </div>
  );
};

export default DoctorList;