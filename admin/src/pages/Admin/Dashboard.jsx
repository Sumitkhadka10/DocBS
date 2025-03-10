import React from 'react';

const AdminHomepage = () => {
  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      {/* Welcome Banner */}
      <div className="bg-white rounded-lg shadow-md p-4 md:p-6 mb-6 w-full">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-800">Welcome to MediBook Admin</h1>
          <p className="text-gray-600 mt-1">Manage your doctor booking system efficiently</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mb-6 w-full">
        <div className="bg-white rounded-lg shadow p-4 md:p-6">
          <div className="flex items-center">
            <div className="rounded-full bg-blue-100 p-3 mr-4">
              <span className="text-xl md:text-2xl">📅</span>
            </div>
            <div>
              <h3 className="text-gray-500 text-sm">Appointments</h3>
              <p className="text-xl md:text-2xl font-bold">--</p>
            </div>
          </div>
          <button className="mt-4 text-blue-600 text-sm hover:underline w-full text-right">
            Manage Appointments →
          </button>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4 md:p-6">
          <div className="flex items-center">
            <div className="rounded-full bg-green-100 p-3 mr-4">
              <span className="text-xl md:text-2xl">👨‍⚕️</span>
            </div>
            <div>
              <h3 className="text-gray-500 text-sm">Doctors</h3>
              <p className="text-xl md:text-2xl font-bold">--</p>
            </div>
          </div>
          <button className="mt-4 text-blue-600 text-sm hover:underline w-full text-right">
            Manage Doctors →
          </button>
        </div>
      </div>
      
      {/* Recent Activity & Calendar Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-6 w-full">
        {/* Today's Appointments */}
        <div className="bg-white rounded-lg shadow w-full">
          <div className="p-4 border-b flex justify-between items-center">
            <h2 className="text-base md:text-lg font-semibold">Today's Schedule</h2>
            <span className="text-xs md:text-sm text-blue-600">March 10, 2025</span>
          </div>
          <div className="p-4">
            <div className="flex items-center justify-center h-36 md:h-48 border-2 border-dashed border-gray-200 rounded">
              <div className="text-center">
                <p className="text-gray-500 text-sm md:text-base">No appointments scheduled for today</p>
                <button className="mt-2 px-3 py-1 md:px-4 md:py-2 bg-blue-600 text-white rounded-lg text-xs md:text-sm hover:bg-blue-700">
                  Add Appointment
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* System Notifications */}
        <div className="bg-white rounded-lg shadow w-full">
          <div className="p-4 border-b flex justify-between items-center">
            <h2 className="text-base md:text-lg font-semibold">System Notifications</h2>
            <button className="text-xs md:text-sm text-blue-600">Mark All as Read</button>
          </div>
          <div className="p-4">
            <div className="space-y-3 md:space-y-4">
              <div className="flex items-start p-2 md:p-3 rounded-lg bg-blue-50 border border-blue-100">
                <div className="rounded-full bg-blue-100 p-1 md:p-2 mr-2 md:mr-3">
                  <span>🔔</span>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm md:text-base">System Maintenance</p>
                  <p className="text-xs md:text-sm text-gray-500">Scheduled maintenance on March 15, 2025 at 02:00 AM.</p>
                  <p className="text-xs text-gray-400 mt-1">Just now</p>
                </div>
              </div>
              
              <div className="flex items-start p-2 md:p-3 rounded-lg bg-green-50 border border-green-100">
                <div className="rounded-full bg-green-100 p-1 md:p-2 mr-2 md:mr-3">
                  <span>✅</span>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm md:text-base">New Features Available</p>
                  <p className="text-xs md:text-sm text-gray-500">Check out the new appointment scheduling options.</p>
                  <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Recent Appointments */}
      <div className="bg-white rounded-lg shadow mb-6 w-full">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-base md:text-lg font-semibold">Recent Appointments</h2>
          <button className="text-blue-600 text-xs md:text-sm hover:text-blue-800">View All</button>
        </div>
        <div className="overflow-x-auto w-full">
          <table className="w-full table-fixed">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-2 md:py-3 px-2 md:px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/12">ID</th>
                <th className="py-2 md:py-3 px-2 md:px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-2/12">Patient</th>
                <th className="py-2 md:py-3 px-2 md:px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-2/12">Doctor</th>
                <th className="py-2 md:py-3 px-2 md:px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-3/12">Date & Time</th>
                <th className="py-2 md:py-3 px-2 md:px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-2/12">Status</th>
                <th className="py-2 md:py-3 px-2 md:px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-2/12">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td colSpan="6" className="px-2 md:px-4 py-6 md:py-8 text-center text-gray-500 text-sm">
                  No recent appointments to display
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Performance Overview */}
      <div className="bg-white rounded-lg shadow w-full">
        <div className="p-4 border-b">
          <h2 className="text-base md:text-lg font-semibold">Performance Overview</h2>
        </div>
        <div className="p-4 md:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            <div className="text-center p-3 md:p-4 border rounded-lg">
              <h3 className="text-gray-500 text-sm mb-2">Appointment Completion</h3>
              <div className="relative h-20 w-20 md:h-24 md:w-24 mx-auto mb-2">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-lg md:text-xl font-bold">--%</span>
                </div>
                <svg className="w-full h-full" viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r="16" fill="none" stroke="#eaeaea" strokeWidth="3" />
                  <circle cx="18" cy="18" r="16" fill="none" stroke="#3b82f6" strokeWidth="3" strokeDasharray="100" strokeDashoffset="75" strokeLinecap="round" />
                </svg>
              </div>
              <p className="text-xs md:text-sm text-gray-500">Target: 95%</p>
            </div>
            
            <div className="text-center p-3 md:p-4 border rounded-lg">
              <h3 className="text-gray-500 text-sm mb-2">Doctor Availability</h3>
              <div className="relative h-20 w-20 md:h-24 md:w-24 mx-auto mb-2">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-lg md:text-xl font-bold">--%</span>
                </div>
                <svg className="w-full h-full" viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r="16" fill="none" stroke="#eaeaea" strokeWidth="3" />
                  <circle cx="18" cy="18" r="16" fill="none" stroke="#10b981" strokeWidth="3" strokeDasharray="100" strokeDashoffset="30" strokeLinecap="round" />
                </svg>
              </div>
              <p className="text-xs md:text-sm text-gray-500">Target: 85%</p>
            </div>
            
            <div className="text-center p-3 md:p-4 border rounded-lg">
              <h3 className="text-gray-500 text-sm mb-2">Patient Satisfaction</h3>
              <div className="relative h-20 w-20 md:h-24 md:w-24 mx-auto mb-2">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-lg md:text-xl font-bold">--%</span>
                </div>
                <svg className="w-full h-full" viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r="16" fill="none" stroke="#eaeaea" strokeWidth="3" />
                  <circle cx="18" cy="18" r="16" fill="none" stroke="#f59e0b" strokeWidth="3" strokeDasharray="100" strokeDashoffset="15" strokeLinecap="round" />
                </svg>
              </div>
              <p className="text-xs md:text-sm text-gray-500">Target: 90%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHomepage;