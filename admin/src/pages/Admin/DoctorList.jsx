import React, { useContext, useEffect, useState } from 'react'
import { AdminContext } from '../../context/AdminContext'

const DoctorList = () => {
  const { doctors, aToken, getAllDoctors, changeAvailability } = useContext(AdminContext)
  const [hoveredCard, setHoveredCard] = useState(null)
  
  useEffect(() => {
    if (aToken) {
      getAllDoctors()
    }
  }, [aToken])

  return (
    <div className="p-6 max-h-[90vh] overflow-y-auto bg-slate-50 w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Medical Staff</h1>
          <p className="text-slate-500 mt-1">Manage healthcare professionals</p>
        </div>
        <div className="px-4 py-2 bg-white rounded-lg shadow-sm border border-slate-200">
          <span className="font-medium text-slate-800">{doctors.length}</span>
          <span className="text-slate-500 ml-1">Doctors</span>
        </div>
      </div>
      
      {/* Doctor Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5">
        {doctors.map((doctor, index) => (
          <div 
            key={index} 
            className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
            onMouseEnter={() => setHoveredCard(index)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="relative">
              <img 
                className="w-full h-48 object-cover rounded-t-lg"
                src={doctor.image} 
                alt={`Dr. ${doctor.name}`}
                style={{
                  transform: hoveredCard === index ? 'scale(1.03)' : 'scale(1)',
                  transition: 'transform 0.3s ease'
                }}
              />
              <div className={`absolute top-3 right-3 px-2 py-1 rounded-md text-xs font-medium ${
                doctor.available 
                  ? 'bg-emerald-100 text-emerald-700' 
                  : 'bg-slate-100 text-slate-600'
              }`}>
                {doctor.available ? 'Available' : 'Unavailable'}
              </div>
            </div>
            
            <div className="p-4">
              <h2 className="text-lg font-medium text-slate-800">{doctor.name}</h2>
              <span className="inline-block mt-1 px-2 py-1 bg-sky-50 text-sky-700 text-xs font-medium rounded">
                {doctor.speciality}
              </span>
              
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-sm text-slate-600">Status</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={doctor.available} 
                    onChange={() => changeAvailability(doctor._id)} 
                    className="sr-only"
                  />
                  <div className={`w-9 h-5 rounded-full transition ${
                    doctor.available ? 'bg-emerald-500' : 'bg-slate-300'
                  }`}>
                    <div className={`absolute top-0.5 left-0.5 bg-white w-4 h-4 rounded-full transition-transform ${
                      doctor.available ? 'translate-x-4' : ''
                    }`}></div>
                  </div>
                </label>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Empty state */}
      {doctors.length === 0 && (
        <div className="flex flex-col items-center justify-center h-64 bg-white rounded-lg border border-slate-200 shadow-sm">
          <svg className="w-12 h-12 text-slate-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
          <p className="text-slate-500 font-medium">No doctors available</p>
        </div>
      )}
    </div>
  )
}

export default DoctorList