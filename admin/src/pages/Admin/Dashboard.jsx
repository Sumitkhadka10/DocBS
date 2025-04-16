import React, { useContext, useEffect } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const { aToken, getDashData, dashData, appointments, getAllAppointments, cancelAppointment } = useContext(AdminContext);
  const { slotDateFormat } = useContext(AppContext);

  useEffect(() => {
    let isMounted = true;

    if (aToken) {
      Promise.all([getDashData(), getAllAppointments()])
        .then(() => {
          if (!isMounted) return;
          console.log("Data fetched successfully");
        })
        .catch((error) => {
          if (isMounted) console.error("Error fetching data:", error);
        });
    }

    return () => {
      isMounted = false;
    };
  }, [aToken]);

  const barChartData = {
    labels: ['Doctors', 'Appointments', 'Patients'],
    datasets: [{
      label: 'Count',
      data: dashData ? [dashData.doctors || 0, dashData.appointments || 0, dashData.patients || 0] : [0, 0, 0],
      backgroundColor: ['#3b82f6', '#8b5cf6', '#ec4899'],
      borderRadius: 12,
      barThickness: 40,
    }]
  };

  const pieChartData = {
    labels: ['Active', 'Completed', 'Cancelled'],
    datasets: [{
      data: appointments ? [
        appointments.filter(a => !a.cancelled && !a.isCompleted).length,
        appointments.filter(a => a.isCompleted).length,
        appointments.filter(a => a.cancelled).length
      ] : [0, 0, 0],
      backgroundColor: ['#10b981', '#3b82f6', '#f43f5e'],
      borderWidth: 0,
      hoverOffset: 12,
    }]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: { size: 12, family: "'Inter', sans-serif" },
          padding: 10,
          usePointStyle: true,
          pointStyleWidth: 8
        }
      },
      tooltip: {
        backgroundColor: 'rgba(31, 41, 55, 0.8)', // Gray-800
        bodyFont: { size: 12, family: "'Inter', sans-serif" },
        padding: 10,
        cornerRadius: 10,
        boxPadding: 5
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: 'rgba(209, 213, 219, 0.4)' }, // Gray-300
        ticks: { font: { size: 10, family: "'Inter', sans-serif" } }
      },
      x: {
        grid: { display: false },
        ticks: { font: { size: 10, family: "'Inter', sans-serif" } }
      }
    }
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 bg-gray-100">
      {/* Header Section */}
      <div className="rounded-2xl shadow-md p-4 sm:p-6 mb-6 border border-gray-200 bg-white">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-500 text-transparent bg-clip-text">
              Admin Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Empowered control at your fingertips — manage users, doctors, and appointments with ease.
            </p>
          </div>
          <div className="text-xs font-medium flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white px-3 py-2 rounded-md shadow-md">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Last updated: {new Date().toLocaleTimeString()}
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6">
        {[
          { icon: assets.doctor_icon, title: 'All Doctors', value: dashData?.doctors || 0, color: 'from-blue-600 to-blue-500' },
          { icon: assets.appointment_icon, title: 'Total Appointments', value: dashData?.appointments || 0, color: 'from-blue-600 to-blue-500' },
          { icon: assets.patients_icon, title: 'All Patients', value: dashData?.patients || 0, color: 'from-blue-600 to-blue-500' },
          { icon: assets.tick_icon, title: 'Appointments Completed', value: appointments?.filter(a => a.isCompleted).length || 0, color: 'from-blue-600 to-blue-500' },
        ].map((stat, index) => (
          <div key={index} className="rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 bg-white">
            <div className={`bg-gradient-to-r ${stat.color} p-1`}></div>
            <div className="p-4 sm:p-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className={`p-2 sm:p-3 rounded-xl shadow-sm bg-gradient-to-br ${stat.color}`}>
                    <img className="w-6 h-6 sm:w-8 sm:h-8 invert" src={stat.icon} alt={stat.title} />
                  </div>
                  <div>
                    <p className="text-lg sm:text-xl font-bold text-gray-700">{stat.value}</p>
                    <p className="text-xs sm:text-sm text-gray-500 font-medium uppercase tracking-wider">{stat.title}</p>
                  </div>
                </div>
                <div className="text-blue-600">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts and Appointments */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
        {/* Bar Chart */}
        <div className="col-span-1 lg:col-span-5 rounded-2xl shadow-md p-4 sm:p-5 border border-gray-200 bg-white">
          <h2 className="text-sm sm:text-base font-medium text-gray-700 mb-4 pb-2 border-b border-gray-200 flex items-center">
            <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
            </svg>
            System Overview
          </h2>
          <div className="h-64 sm:h-72">
            <Bar data={barChartData} options={chartOptions} />
          </div>
        </div>

        {/* Pie Chart */}
        <div className="col-span-1 lg:col-span-3 rounded-2xl shadow-md p-4 sm:p-5 border border-gray-200 bg-white">
          <h2 className="text-sm sm:text-base font-medium text-gray-700 mb-4 pb-2 border-b border-gray-200 flex items-center">
            <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
            </svg>
            Appointment Status
          </h2>
          <div className="h-56 sm:h-64">
            <Pie data={pieChartData} options={chartOptions} />
          </div>
        </div>

        {/* Latest Appointments */}
        <div className="col-span-1 lg:col-span-4 rounded-2xl shadow-md overflow-hidden border border-gray-200 bg-white">
          <div className="flex items-center justify-between p-4 sm:p-5 border-b border-gray-200 bg-blue-50">
            <div className="flex items-center gap-2">
              <img className="w-4 h-4 sm:w-5 sm:h-5" src={assets.list_icon} alt="List" />
              <h2 className="text-sm sm:text-base font-medium text-gray-700">Latest Appointments</h2>
            </div>
            <span className="text-xs font-medium text-white bg-gradient-to-r from-blue-600 to-blue-500 px-2 sm:px-3 py-1 rounded-md shadow-md">
              {dashData?.latestAppointments?.length || 0} bookings
            </span>
          </div>
          <div className="max-h-[50vh] sm:max-h-[60vh] overflow-y-auto">
            {dashData?.latestAppointments && dashData.latestAppointments.length > 0 ? (
              dashData.latestAppointments.map((item, index) => (
                <div key={index} className="p-3 sm:p-4 hover:bg-blue-50 transition-colors border-b border-gray-200 last:border-b-0">
                  <div className="flex items-center justify-between gap-3 sm:gap-4">
                    <div className="flex items-center gap-3 sm:gap-4 flex-1">
                      <div className="relative flex-shrink-0">
                        <img className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl object-cover border-2 border-gray-200 shadow-sm" src={item.docData.image} alt={item.docData.name} />
                        <span className={`absolute -bottom-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 rounded-full border-2 border-white ${item.cancelled ? 'bg-red-500' : item.isCompleted ? 'bg-blue-500' : 'bg-green-500'}`}></span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm sm:text-base font-medium text-gray-700 truncate">{item.docData.name}</p>
                        <div className="flex items-center gap-1 text-xs sm:text-sm text-gray-500 mt-1">
                          <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {slotDateFormat(item.slotDate)} • {item.slotTime}
                        </div>
                        <p className="text-xs sm:text-sm text-gray-500 mt-1 flex items-center gap-1">
                          <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          Patient: {item.userData?.name || 'Unknown'}
                        </p>
                      </div>
                    </div>
                    {item.cancelled ? (
                      <span className="px-2 sm:px-3 py-1 sm:py-1.5 text-xs font-medium text-white bg-red-500 rounded-md flex items-center gap-1 whitespace-nowrap shadow-md">
                        <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        Cancelled
                      </span>
                    ) : item.isCompleted ? (
                      <span className="px-2 sm:px-3 py-1 sm:py-1.5 text-xs font-medium text-white bg-blue-500 rounded-md flex items-center gap-1 whitespace-nowrap shadow-md">
                        <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        Completed
                      </span>
                    ) : (
                      <button
                        onClick={() => cancelAppointment(item._id)}
                        className="flex items-center gap-1 px-2 sm:px-3 py-1 sm:py-1.5 text-xs font-medium text-white bg-gradient-to-r from-red-500 to-red-600 rounded-md hover:from-red-600 hover:to-red-700 transition-colors shadow-md whitespace-nowrap"
                        aria-label={`Cancel appointment for ${item.docData.name}`}
                      >
                        <img className="w-3 h-3 sm:w-3.5 sm:h-3.5 invert" src={assets.cancel_icon} alt="" />
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="py-8 sm:py-10 text-center">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 mx-auto text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="mt-2 text-xs sm:text-sm text-gray-500 font-medium">No recent appointments found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;