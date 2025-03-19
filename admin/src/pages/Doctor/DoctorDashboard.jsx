import React, { useContext, useEffect } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';

const DoctorDashboard = () => {
  const { dToken, dashData, getDashData } = useContext(DoctorContext);
  const { slotDateFormat, currency } = useContext(AppContext);

  useEffect(() => {
    if (dToken) {
      getDashData();
    }
  }, [dToken, getDashData]);

  return dashData ? (
    <div className="w-full max-w-7xl mx-auto my-8 px-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight drop-shadow-sm">
          Doctor Dashboard
        </h1>
        <p className="text-gray-600 mt-2 text-lg font-medium">
          Welcome to the doctor dashboard
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Appointments</p>
              <p className="text-5xl font-bold text-gray-900 mt-2">{dashData.appointments}</p>
            </div>
            <div className="p-4 bg-indigo-600/10 rounded-full transform hover:scale-110 transition-transform duration-300">
              <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Patients</p>
              <p className="text-5xl font-bold text-gray-900 mt-2">{dashData.patients}</p>
            </div>
            <div className="p-4 bg-indigo-600/10 rounded-full transform hover:scale-110 transition-transform duration-300">
              <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Latest Appointments */}
      <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100">
        <div className="p-6 bg-gray-50 border-b border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-900">Latest Appointments</h2>
          <p className="text-sm text-gray-600 mt-1">Your recent bookings</p>
        </div>
        
        <div className="max-h-[450px] overflow-y-auto">
          {dashData.latestAppointments && dashData.latestAppointments.length > 0 ? (
            <div className="divide-y divide-gray-200">
              {dashData.latestAppointments.map((appointment) => (
                <div
                  key={appointment._id}
                  className="p-6 hover:bg-indigo-600/5 transition-colors duration-200 flex items-center justify-between flex-wrap gap-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border-2 border-gray-200">
                      <img 
                        src={appointment.userData?.image || assets.default_user} 
                        alt={appointment.userData?.name} 
                        className="w-full h-full object-cover"
                        onError={(e) => (e.target.src = assets.default_user)}
                      />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-lg">{appointment.userData?.name}</p>
                      <p className="text-sm text-gray-600">
                        {slotDateFormat(appointment.slotDate)} • {appointment.slotTime}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-semibold text-gray-900 text-lg">{currency} {appointment.amount}</span>
                    <span className={`px-3 py-1 text-xs font-medium rounded-full shadow-sm ${
                      appointment.cancelled ? 'bg-red-100 text-red-600' :
                      appointment.isCompleted ? 'bg-green-100 text-green-600' :
                      'bg-yellow-100 text-yellow-600'
                    }`}>
                      {appointment.cancelled ? 'Cancelled' :
                       appointment.isCompleted ? 'Completed' : 'Pending'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center">
              <svg className="mx-auto h-16 w-16 text-gray-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-gray-600 font-medium">No recent appointments found</p>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-12 bg-white rounded-2xl shadow-md p-6 border border-gray-100">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            onClick={() => window.location.href = '/doctor-appointments'}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-600/80 transition-all duration-300 hover:shadow-lg"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="font-medium">View Appointments</span>
          </button>
          <button
            onClick={() => window.location.href = '/doctor-profile'}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-white text-gray-900 border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 transition-all duration-300 hover:shadow-lg"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className="font-medium">Edit Profile</span>
          </button>
        </div>
      </div>
    </div>
  ) : (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default DoctorDashboard;