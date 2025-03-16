import React, { useContext, useEffect, useState } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'

const AllAppointments = () => {
  const { aToken, appointments, getAllAppointments, cancelAppointment } = useContext(AdminContext)
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext)
  const [hoverIndex, setHoverIndex] = useState(null)
  const [activeTab, setActiveTab] = useState('all')
  
  useEffect(() => {
    if (aToken) {
      getAllAppointments();
    }
  }, [aToken])

  // Filter appointments based on active tab
  const filteredAppointments = appointments ? appointments.filter(item => {
    if (activeTab === 'all') return true;
    if (activeTab === 'active') return !item.cancelled && !item.isCompleted;
    if (activeTab === 'cancelled') return item.cancelled;
    if (activeTab === 'completed') return item.isCompleted;
    return true;
  }) : [];

  return (
    <div className="w-full max-w-6xl m-5">
      {/* Enhanced Header with Stats */}
      <div className="mb-6">
        <div className="flex items-center mb-2">
          <div className="h-10 w-1 bg-gradient-to-b from-purple-600 to-indigo-600 mr-3 rounded-full shadow-lg"></div>
          <h2 className='text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600'>
            Appointments Management
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-md p-4 border border-purple-100">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500 text-xs font-medium uppercase tracking-wider">Total Appointments</p>
                <p className="text-2xl font-bold text-gray-800">{appointments ? appointments.length : 0}</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-lg">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-4 border border-green-100">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500 text-xs font-medium uppercase tracking-wider">Active Appointments</p>
                <p className="text-2xl font-bold text-gray-800">
                  {appointments ? appointments.filter(item => !item.cancelled && !item.isCompleted).length : 0}
                </p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-4 border border-red-100">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500 text-xs font-medium uppercase tracking-wider">Cancelled Appointments</p>
                <p className="text-2xl font-bold text-gray-800">
                  {appointments ? appointments.filter(item => item.cancelled).length : 0}
                </p>
              </div>
              <div className="bg-red-100 p-3 rounded-lg">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-4 border border-blue-100">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500 text-xs font-medium uppercase tracking-wider">Completed Appointments</p>
                <p className="text-2xl font-bold text-gray-800">
                  {appointments ? appointments.filter(item => item.isCompleted).length : 0}
                </p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
        
        {/* Custom Tab Navigation */}
        <div className="flex space-x-2 mb-2">
          <button 
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${activeTab === 'all' 
              ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md' 
              : 'bg-white text-gray-600 hover:bg-gray-100'}`}
            onClick={() => setActiveTab('all')}
          >
            All Appointments
          </button>
          <button 
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${activeTab === 'active' 
              ? 'bg-gradient-to-r from-green-600 to-teal-600 text-white shadow-md' 
              : 'bg-white text-gray-600 hover:bg-gray-100'}`}
            onClick={() => setActiveTab('active')}
          >
            Active
          </button>
          <button 
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${activeTab === 'cancelled' 
              ? 'bg-gradient-to-r from-red-600 to-pink-600 text-white shadow-md' 
              : 'bg-white text-gray-600 hover:bg-gray-100'}`}
            onClick={() => setActiveTab('cancelled')}
          >
            Cancelled
          </button>
          <button 
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${activeTab === 'completed' 
              ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-md' 
              : 'bg-white text-gray-600 hover:bg-gray-100'}`}
            onClick={() => setActiveTab('completed')}
          >
            Completed
          </button>
        </div>
      </div>
      
      <div className='bg-white rounded-2xl shadow-xl border border-purple-100 text-sm max-h-[80vh] min-h-[60vh] overflow-hidden relative'>
        <div className='hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-4 px-6 backdrop-blur-md bg-gradient-to-r from-purple-100/80 via-indigo-50/90 to-purple-100/80 border-b border-purple-200 sticky top-0 z-10'>
          <p className="text-xs uppercase font-bold tracking-widest text-purple-800">S.N</p>
          <p className="text-xs uppercase font-bold tracking-widest text-purple-800">Patient Name</p>
          <p className="text-xs uppercase font-bold tracking-widest text-purple-800">Age</p>
          <p className="text-xs uppercase font-bold tracking-widest text-purple-800">Date & Time</p>
          <p className="text-xs uppercase font-bold tracking-widest text-purple-800">Doctor's Name</p>
          <p className="text-xs uppercase font-bold tracking-widest text-purple-800">Fees</p>
          <p className="text-xs uppercase font-bold tracking-widest text-purple-800">Actions</p>
        </div>
        
        <div className="overflow-y-auto max-h-[calc(80vh-56px)]">
          {filteredAppointments && filteredAppointments.length > 0 ? (
            filteredAppointments.reverse().map((item, index) => (
              <div 
                className={`flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center py-5 px-6 border-b border-purple-50 transition-all duration-300 ${hoverIndex === index ? 'bg-gradient-to-r from-purple-50/80 to-indigo-50/80 transform scale-[0.995]' : 'bg-white'}`}
                key={index}
                onMouseEnter={() => setHoverIndex(index)}
                onMouseLeave={() => setHoverIndex(null)}
              >
                <p className='max-sm:hidden font-bold text-lg text-purple-800'>{index+1}</p>
                <div className='flex items-center gap-3'>
                  {item.userData && item.userData.image ? (
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-tr from-purple-400 to-indigo-400 rounded-full blur-sm opacity-70 -z-10 scale-90"></div>
                      <img className='w-12 h-12 rounded-full border-2 border-white object-cover shadow-md ring-2 ring-purple-200' src={item.userData.image} alt="" />
                    </div>
                  ) : (
                    <div className='w-12 h-12 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-500 flex items-center justify-center shadow-md'>
                      <span className="text-white font-bold">
                        {item.userData && item.userData.name ? item.userData.name.charAt(0).toUpperCase() : '?'}
                      </span>
                    </div>
                  )}
                  <div>
                    <p className="font-semibold text-gray-800">{item.userData ? item.userData.name : 'Unknown'}</p>
                    <p className="text-xs text-gray-500 sm:hidden">Age: {item.userData && item.userData.dob ? calculateAge(item.userData.dob) : 'N/A'}</p>
                  </div>
                </div>
                <div className="max-sm:hidden">
                  <span className="inline-block py-1 px-3 bg-purple-100 text-purple-800 font-medium rounded-full">
                    {item.userData && item.userData.dob ? calculateAge(item.userData.dob) : 'N/A'}
                  </span>
                </div>
                <div className="text-gray-700">
                  <div className="flex flex-col">
                    <p className="font-medium text-gray-900">{item.slotDate ? slotDateFormat(item.slotDate) : 'N/A'}</p>
                    <div className="flex items-center mt-1">
                      <div className="h-2 w-2 rounded-full bg-indigo-500 mr-2"></div>
                      <p className="text-xs font-medium text-indigo-700">{item.slotTime || 'N/A'}</p>
                    </div>
                  </div>
                </div>
                <div className='flex items-center gap-3'>
                  {item.docData && item.docData.image ? (
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-tr from-indigo-400 to-purple-400 rounded-full blur-sm opacity-70 -z-10 scale-90"></div>
                      <img className='w-12 h-12 rounded-full border-2 border-white object-cover shadow-md ring-2 ring-indigo-200' src={item.docData.image} alt="" />
                    </div>
                  ) : (
                    <div className='w-12 h-12 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center shadow-md'>
                      <span className="text-white font-bold">
                        {item.docData && item.docData.name ? item.docData.name.charAt(0).toUpperCase() : '?'}
                      </span>
                    </div>
                  )}
                  <p className="font-semibold text-gray-800">{item.docData ? item.docData.name : 'Unknown'}</p>
                </div>
                <div>
                  <span className="font-bold text-lg text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
                    {currency}{item.amount || 0}
                  </span>
                </div>
                {item.cancelled ? (
                  <div className="flex justify-center">
                    <p className='px-3 py-1.5 rounded-full bg-red-100 text-red-600 text-xs font-bold inline-flex items-center space-x-1'>
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"></path>
                      </svg>
                      <span>Cancelled</span>
                    </p>
                  </div>
                ) : item.isCompleted ? (
                  <div className="flex justify-center">
                    <p className='px-3 py-1.5 rounded-full bg-blue-100 text-blue-600 text-xs font-bold inline-flex items-center space-x-1'>
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span>Completed</span>
                    </p>
                  </div>
                ) : (
                  <div className="flex justify-center">
                    <button 
                      onClick={() => cancelAppointment(item._id)} 
                      className='px-3 py-1.5 rounded-full bg-red-500 hover:bg-red-600 transition-colors duration-300 shadow-md hover:shadow-lg text-white font-medium text-xs flex items-center gap-1 group'
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      <span className="group-hover:translate-x-0.5 transition-transform">Cancel</span>
                    </button>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className='flex flex-col justify-center items-center h-64 text-gray-400'>
              <div className="relative w-20 h-20 mb-6">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-full blur-lg opacity-20"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-12 h-12 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                </div>
              </div>
              <p className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
                {activeTab === 'all' 
                  ? 'No appointments found' 
                  : activeTab === 'active' 
                    ? 'No active appointments' 
                    : activeTab === 'cancelled' 
                      ? 'No cancelled appointments'
                      : 'No completed appointments'}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                {activeTab === 'all' 
                  ? 'Scheduled appointments will appear here' 
                  : activeTab === 'active' 
                    ? 'Active appointments will appear here' 
                    : activeTab === 'cancelled'
                      ? 'Cancelled appointments will appear here'
                      : 'Completed appointments will appear here'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AllAppointments