// StatsCards.jsx
import React from "react";

const StatsCards = ({ appointments }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div className="bg-white rounded-xl shadow-md p-4 border border-gray-200">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-base text-gray-500 font-medium uppercase tracking-wider">Total Appointments</p>
            <p className="text-2xl font-bold text-gray-700">{appointments ? appointments.length : 0}</p>
          </div>
          <div className="bg-blue-50 p-3 rounded-lg">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-md p-4 border border-gray-200">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-base text-gray-500 font-medium uppercase tracking-wider">Active Appointments</p>
            <p className="text-2xl font-bold text-gray-700">
              {appointments ? appointments.filter(item => !item.cancelled && !item.isCompleted).length : 0}
            </p>
          </div>
          <div className="bg-blue-50 p-3 rounded-lg">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-md p-4 border border-gray-200">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-base text-gray-500 font-medium uppercase tracking-wider">Cancelled Appointments</p>
            <p className="text-2xl font-bold text-gray-700">
              {appointments ? appointments.filter(item => item.cancelled).length : 0}
            </p>
          </div>
          <div className="bg-blue-50 p-3 rounded-lg">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-md p-4 border border-gray-200">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-base text-gray-500 font-medium uppercase tracking-wider">Completed Appointments</p>
            <p className="text-2xl font-bold text-gray-700">
              {appointments ? appointments.filter(item => item.isCompleted).length : 0}
            </p>
          </div>
          <div className="bg-blue-50 p-3 rounded-lg">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsCards;