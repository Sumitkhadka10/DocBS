import React, { useContext, useEffect, useState } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { AppContext } from '../../context/AppContext';

const DoctorAppointments = () => {
  const { dToken, appointments, getAppointments, completeAppointment, cancelAppointment } = useContext(DoctorContext);
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => { if (dToken) getAppointments(); }, [dToken, getAppointments]);

  const filteredAppointments = appointments.length ? [...appointments].reverse().filter(item => {
    const statusMatch = filterStatus === 'all' ? true : 
      filterStatus === 'pending' ? (!item.isCompleted && !item.cancelled) :
      filterStatus === 'completed' ? item.isCompleted :
      filterStatus === 'cancelled' ? item.cancelled : true;
    
    const searchMatch = !searchTerm || item.userData.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    return statusMatch && searchMatch;
  }) : [];

  const stats = {
    pending: filteredAppointments.filter(item => !item.isCompleted && !item.cancelled).length,
    completed: filteredAppointments.filter(item => item.isCompleted).length,
    cancelled: filteredAppointments.filter(item => item.cancelled).length
  };

  return (
    <div className="w-full max-w-6xl mx-auto my-6 px-4">
      {/* Stats Dashboard */}
      <div className="grid grid-cols-3 gap-5 mb-6">
        <div className="bg-white p-5 rounded-lg shadow-sm border-l-4 border-l-yellow-500 transition-all hover:shadow-md">
          <p className="text-sm font-medium text-gray-500">Pending</p>
          <p className="text-2xl font-bold text-yellow-500">{stats.pending}</p>
        </div>
        <div className="bg-white p-5 rounded-lg shadow-sm border-l-4 border-l-blue-500 transition-all hover:shadow-md">
          <p className="text-sm font-medium text-gray-500">Completed</p>
          <p className="text-2xl font-bold text-blue-500">{stats.completed}</p>
        </div>
        <div className="bg-white p-5 rounded-lg shadow-sm border-l-4 border-l-red-500 transition-all hover:shadow-md">
          <p className="text-sm font-medium text-gray-500">Cancelled</p>
          <p className="text-2xl font-bold text-red-500">{stats.cancelled}</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-5 rounded-lg shadow-sm mb-6">
        <div className="w-full mb-4">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search patients by name..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 pr-10 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" 
            />
            <svg className="absolute right-3 top-3.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
        <div className="flex flex-wrap gap-3 justify-between">
          <div className="flex flex-wrap gap-2">
            {['all', 'pending', 'completed', 'cancelled'].map(status => (
              <button 
                key={status} 
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  filterStatus === status 
                    ? 'bg-blue-600 text-white shadow-sm' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Appointments Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="hidden sm:grid grid-cols-[0.5fr_2fr_1fr_2fr_1fr_1.5fr] gap-2 py-4 px-6 border-b bg-gray-50 font-medium text-gray-600">
          <span>No.</span>
          <span>Patient</span>
          <span>Age</span>
          <span>Date & Time</span>
          <span>Fees</span>
          <span>Action</span>
        </div>

        <div className="max-h-[70vh] overflow-y-auto">
          {filteredAppointments.length > 0 ? filteredAppointments.map((item, index) => (
            <div key={item._id} className="border-b last:border-b-0">
              <div 
                onClick={() => setExpandedId(expandedId === item._id ? null : item._id)}
                className={`flex flex-wrap sm:grid grid-cols-[0.5fr_2fr_1fr_2fr_1fr_1.5fr] gap-2 items-center py-4 px-6 hover:bg-gray-50 cursor-pointer transition-colors ${expandedId === item._id ? 'bg-blue-50' : ''}`}
              >
                <span className="hidden sm:block text-gray-500">{index + 1}</span>
                <div className="flex items-center gap-3">
                  <img 
                    className="w-10 h-10 rounded-full object-cover border shadow-sm" 
                    src={item.userData.image || 'https://via.placeholder.com/40'} 
                    alt={`${item.userData.name}`} 
                  />
                  <div>
                    <p className="font-medium text-gray-800">{item.userData.name}</p>
                    <p className="text-xs text-gray-500 sm:hidden">Age: {calculateAge(item.userData.dob)}</p>
                  </div>
                </div>
                <span className="hidden sm:block text-gray-700">{calculateAge(item.userData.dob)}</span>
                <div>
                  <p className="text-gray-800 font-medium">{slotDateFormat(item.slotDate)}</p>
                  <p className="text-xs text-gray-500">{item.slotTime}</p>
                </div>
                <span className="text-gray-800 font-medium">{currency} {item.amount}</span>
                <div className="flex items-center gap-2" onClick={e => e.stopPropagation()}>
                  {item.cancelled ? (
                    <span className="px-3 py-1.5 text-xs font-medium rounded-full bg-red-100 text-red-600">Cancelled</span>
                  ) : item.isCompleted ? (
                    <span className="px-3 py-1.5 text-xs font-medium rounded-full bg-blue-100 text-blue-600">Completed</span>
                  ) : (
                    <div className="flex gap-2">
                      <button 
                        onClick={() => completeAppointment(item._id)}
                        className="flex items-center gap-1 px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white rounded-md text-xs font-medium transition-colors shadow-sm"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span>Complete</span>
                      </button>
                      <button 
                        onClick={() => cancelAppointment(item._id)}
                        className="flex items-center gap-1 px-3 py-1.5 bg-white border border-red-500 hover:bg-red-50 text-red-500 rounded-md text-xs font-medium transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                        <span>Cancel</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
              {expandedId === item._id && (
                <div className="px-6 py-4 bg-blue-50 border-t border-blue-100">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-gray-800 mb-3">Patient Details</h4>
                      <div className="space-y-2">
                        <p className="text-sm"><span className="text-gray-500 font-medium">Email:</span> {item.userData.email || 'N/A'}</p>
                        <p className="text-sm"><span className="text-gray-500 font-medium">Phone:</span> {item.userData.phone || 'N/A'}</p>
                        <p className="text-sm"><span className="text-gray-500 font-medium">Gender:</span> {item.userData.gender || 'N/A'}</p>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800 mb-3">Appointment Notes</h4>
                      <p className="text-sm text-gray-700 bg-white p-3 rounded-md border border-blue-100 min-h-[80px]">
                        {item.notes || 'No notes for this appointment.'}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )) : (
            <div className="py-12 text-center text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-16 w-16 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-lg font-medium">No {filterStatus !== 'all' ? filterStatus : ''} appointments found</p>
              <p className="text-sm text-gray-400 mt-1">Try adjusting your filters or search criteria</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorAppointments;