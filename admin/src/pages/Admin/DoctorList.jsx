import React, { useContext, useEffect, useState } from 'react';
import { AdminContext } from '../../context/AdminContext';

const DoctorList = () => {
  const { doctors, aToken, getAllDoctors, changeAvailability } = useContext(AdminContext);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  useEffect(() => {
    if (aToken) getAllDoctors();
  }, [aToken]);

  const filteredDoctors = doctors.filter(doctor => {
    if (filter === 'available' && !doctor.available) return false;
    if (filter === 'unavailable' && doctor.available) return false;
    if (searchQuery && !doctor.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

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

  const handleDoctorClick = (doctor) => {
    setSelectedDoctor(doctor);
  };

  const closeModal = () => {
    setSelectedDoctor(null);
  };

  return (
    <div className="p-8 max-h-[90vh] overflow-y-auto bg-white w-full">
      {/* Header */}
      <div className="relative mb-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 relative z-10">
          <div>
            <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-500 mb-2">Doctor Directory</h1>
            <p className="text-sm text-gray-500">Manage your medical professionals</p>
          </div>
          <div className="px-6 py-2 bg-white rounded-md shadow-md border border-gray-200 flex items-center">
            <span className="font-bold text-xl text-gray-700">{filteredDoctors.length}</span>
            <span className="text-sm text-gray-500 ml-2">Doctors</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div className="flex gap-4 overflow-x-auto">
          <button 
            className={`px-5 py-2 rounded-md font-medium text-base transition-all flex items-center ${filter === 'all' ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-md' : 'bg-white text-gray-700 hover:bg-blue-50 shadow-md border border-gray-200'}`}
            onClick={() => setFilter('all')}
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path>
            </svg>
            All Doctors
          </button>
          <button 
            className={`px-5 py-2 rounded-md font-medium text-base transition-all flex items-center ${filter === 'available' ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-md' : 'bg-white text-gray-700 hover:bg-blue-50 shadow-md border border-gray-200'}`}
            onClick={() => setFilter('available')}
          >
            {availableIcon}
            Available
          </button>
          <button 
            className={`px-5 py-2 rounded-md font-medium text-base transition-all flex items-center ${filter === 'unavailable' ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-md' : 'bg-white text-gray-700 hover:bg-blue-50 shadow-md border border-gray-200'}`}
            onClick={() => setFilter('unavailable')}
          >
            {unavailableIcon}
            Unavailable
          </button>
        </div>

        <div className="relative w-full md:w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search doctors by name..."
            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-700 placeholder-gray-400 shadow-sm"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Doctor Grid */}
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
                  className="w-full h-full object-cover object-center cursor-pointer"
                  src={doctor.image} 
                  alt={`Dr. ${doctor.name}`}
                  style={{
                    transform: hoveredCard === index ? 'scale(1.08)' : 'scale(1)',
                    transition: 'transform 0.5s ease-in-out'
                  }}
                  onClick={() => handleDoctorClick(doctor)} // Moved onClick to the image
                />
              </div>
              <div className={`absolute top-4 right-4 px-4 py-2 rounded-md text-xs font-bold tracking-wide flex items-center ${doctor.available ? 'bg-blue-500 text-white border border-blue-600' : 'bg-red-500 text-white border border-red-600'}`}>
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
                  <span className="text-sm text-gray-500">{doctor.experience} Exp</span>
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
                    <div className={`w-12 h-6 rounded-full transition ${doctor.available ? 'bg-gradient-to-r from-blue-600 to-blue-500' : 'bg-gray-300'}`}>
                      <div className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full shadow-md transition-transform ${doctor.available ? 'translate-x-6' : ''}`}></div>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredDoctors.length === 0 && (
        <div className="flex flex-col items-center justify-center h-96 bg-white rounded-md border border-gray-200 shadow-md">
          <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-6">
            <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-700 mb-2">No doctors found</h3>
          <p className="text-sm text-gray-500 text-center max-w-md">
            {searchQuery 
              ? `No doctors match your search for "${searchQuery}".`
              : filter === 'all' 
                ? 'There are no doctors available in the system at the moment.' 
                : `No ${filter} doctors found. Try changing the filter.`}
          </p>
        </div>
      )}

      {/* Doctor Details Modal */}
      {selectedDoctor && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 font-sans">
          <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-3xl max-h-[85vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6 border-b border-gray-200 pb-4">
              <h3 className="text-xl font-semibold text-gray-800">Doctor Details</h3>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Left Section: Image and Basic Info */}
              <div className="flex flex-col items-center">
                <img
                  className="w-32 h-32 rounded-full object-cover mb-4 shadow-sm"
                  src={selectedDoctor.image}
                  alt={`Dr. ${selectedDoctor.name}`}
                />
                <h4 className="text-lg font-semibold text-gray-800">{selectedDoctor.name}</h4>
                <p className="text-sm text-gray-600">{selectedDoctor.speciality}</p>
                <p className="text-sm text-gray-500">{selectedDoctor.experience}</p>
              </div>

              {/* Right Section: Detailed Info */}
              <div className="md:col-span-2 space-y-6">
                <div>
                  <h5 className="text-md font-semibold text-gray-700 mb-2">Professional Details</h5>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p><span className="font-medium text-gray-700">Degree:</span> {selectedDoctor.degree || 'Not provided'}</p>
                    <p><span className="font-medium text-gray-700">Fee:</span> RS {selectedDoctor.fee || 'N/A'}</p>
                    <p><span className="font-medium text-gray-700">Availability:</span> 
                      <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${selectedDoctor.available ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {selectedDoctor.available ? 'Available' : 'Unavailable'}
                      </span>
                    </p>
                    <p><span className="font-medium text-gray-700">About:</span> {selectedDoctor.about || 'Not provided'}</p>
                  </div>
                </div>
                <div>
                  <h5 className="text-md font-semibold text-gray-700 mb-2">Contact Information</h5>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p><span className="font-medium text-gray-700">Address Line 1:</span> {selectedDoctor.address?.line1 || 'Not provided'}</p>
                    <p><span className="font-medium text-gray-700">Address Line 2:</span> {selectedDoctor.address?.line2 || 'Not provided'}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorList;