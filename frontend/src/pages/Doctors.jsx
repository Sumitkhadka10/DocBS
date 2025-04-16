import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import { AppContext } from '../context/AppContext';
import SpecialityMenu from '../components/SpecialityMenu';

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
    } else if (sortOption === 'all') {
      navigate('/doctors');
    }

    setFilterDoc(filtered);
  };

  useEffect(() => {
    applyFilterAndSort();
  }, [doctors, speciality, sortOption]);

  const handleSortChange = (option) => {
    setSortOption(option);
    if (option === 'all') {
      navigate('/doctors');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-md shadow-sm py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 hover:text-primary transition-colors duration-300">
            Find Your <span className="text-primary">Specialist</span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg hover:opacity-90 transition-opacity">
            Discover top medical professionals tailored to your needs.
          </p>
        </div>
      </header>

      {/* Speciality Menu - Always Visible */}
      <section className="py-4">
        <SpecialityMenu hideTitles={false} currentSpeciality={speciality} />
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Filters and Title */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
          <div className="text-center sm:text-left">
            <h2 className="text-2xl font-semibold text-gray-900">
              {speciality ? `${speciality} Specialists` : 'All Specialists'}
            </h2>
            <span className="mt-1 inline-block bg-blue-100 text-blue-700 text-sm px-3 py-1 rounded-full font-medium">
              {filterDoc.length} {filterDoc.length === 1 ? 'Doctor' : 'Doctors'}
            </span>
          </div>
          {speciality && (
            <button
              onClick={() => navigate('/doctors')}
              className="px-5 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-all text-sm font-medium shadow-sm"
            >
              View All Specialties
            </button>
          )}
          <div className="relative">
            <select
              value={sortOption}
              onChange={(e) => handleSortChange(e.target.value)}
              className="appearance-none bg-white border border-gray-200 text-gray-700 text-sm py-2.5 pl-4 pr-10 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-gray-50 transition-all"
            >
              <option value="default">Sort: Default</option>
              <option value="availability">Sort: Available First</option>
              <option value="unavailability">Sort: Unavailable First</option>
              <option value="all">All Specialists</option>
            </select>
            <svg
              className="w-4 h-4 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Doctor Grid or Empty State */}
        {filterDoc.length === 0 ? (
          <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-lg p-10 text-center border border-gray-100">
            <div className="mx-auto w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
              <svg
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
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Doctors Found</h3>
            <p className="text-gray-600 text-sm max-w-md mx-auto">
              No specialists match your criteria. Explore other specialties or view all doctors.
            </p>
            <button
              onClick={() => navigate('/doctors')}
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all shadow-md font-medium"
            >
              Browse All Doctors
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filterDoc.map((doctor) => (
              <div
                key={doctor._id}
                className="bg-white/95 backdrop-blur-md rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div
                  className={`relative h-52 flex items-center justify-center bg-blue-50 overflow-hidden rounded-t-2xl ${
                    doctor.available ? 'cursor-pointer' : 'cursor-not-allowed'
                  }`}
                  onClick={() => doctor.available && navigate(`/appointment/${doctor._id}`)}
                >
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-2/3 h-2/3 object-contain transition-transform duration-300 hover:scale-105"
                  />
                  <span
                    className={`absolute top-3 left-3 px-2.5 py-1 text-xs font-medium rounded-full ${
                      doctor.available ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {doctor.available ? 'Available' : 'Unavailable'}
                  </span>
                </div>
                <div className="p-5">
                  <h3
                    className={`text-lg font-semibold text-gray-900 transition-colors ${
                      doctor.available
                        ? 'hover:text-blue-600 cursor-pointer'
                        : 'text-gray-500 cursor-not-allowed'
                    }`}
                    onClick={() => doctor.available && navigate(`/appointment/${doctor._id}`)}
                  >
                    {doctor.name}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">{doctor.speciality}</p>
                  <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                    <span className="text-xs text-gray-500">
                      {doctor.available ? 'Accepting Patients' : 'Not Accepting'}
                    </span>
                    <button
                      onClick={() => doctor.available && navigate(`/appointment/${doctor._id}`)}
                      className={`px-4 py-1.5 text-sm font-medium rounded-full transition-all ${
                        doctor.available
                          ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm'
                          : 'bg-gray-100 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      {doctor.available ? 'Book Now' : 'Unavailable'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Doctors;