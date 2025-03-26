// AppointmentsTable.jsx
import React from "react";

const AppointmentsTable = ({
  activeTab,
  setActiveTab,
  filteredAppointments,
  hoverIndex,
  setHoverIndex,
  cancelAppointment,
  calculateAge,
  slotDateFormat,
  currency,
  openReasonModal
}) => {
  return (
    <>
      <div className="flex space-x-2 mb-2">
        <button
          className={`px-4 py-2 rounded-md text-base font-medium transition-all duration-200 ${activeTab === "all"
            ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-md"
            : "bg-white text-gray-700 hover:bg-blue-50"}`}
          onClick={() => setActiveTab("all")}
        >
          All Appointments
        </button>
        <button
          className={`px-4 py-2 rounded-md text-base font-medium transition-all duration-200 ${activeTab === "active"
            ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-md"
            : "bg-white text-gray-700 hover:bg-blue-50"}`}
          onClick={() => setActiveTab("active")}
        >
          Active
        </button>
        <button
          className={`px-4 py-2 rounded-md text-base font-medium transition-all duration-200 ${activeTab === "cancelled"
            ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-md"
            : "bg-white text-gray-700 hover:bg-blue-50"}`}
          onClick={() => setActiveTab("cancelled")}
        >
          Cancelled
        </button>
        <button
          className={`px-4 py-2 rounded-md text-base font-medium transition-all duration-200 ${activeTab === "completed"
            ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-md"
            : "bg-white text-gray-700 hover:bg-blue-50"}`}
          onClick={() => setActiveTab("completed")}
        >
          Completed
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 text-sm max-h-[80vh] min-h-[60vh] overflow-hidden relative">
        <div className="hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-4 px-6 backdrop-blur-md bg-gradient-to-r from-blue-50/80 via-gray-50/90 to-blue-50/80 border-b border-gray-200 sticky top-0 z-10">
          <p className="text-sm uppercase font-bold tracking-widest text-gray-700">S.N</p>
          <p className="text-sm uppercase font-bold tracking-widest text-gray-700">Patient Name</p>
          <p className="text-sm uppercase font-bold tracking-widest text-gray-700">Age</p>
          <p className="text-sm uppercase font-bold tracking-widest text-gray-700">Date & Time</p>
          <p className="text-sm uppercase font-bold tracking-widest text-gray-700">Doctor's Name</p>
          <p className="text-sm uppercase font-bold tracking-widest text-gray-700">Fees</p>
          <p className="text-sm uppercase font-bold tracking-widest text-gray-700">Actions</p>
        </div>

        <div className="overflow-y-auto max-h-[calc(80vh-56px)]">
          {filteredAppointments && filteredAppointments.length > 0 ? (
            filteredAppointments.reverse().map((item, index) => (
              <div
                className={`flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center py-5 px-6 border-b border-gray-200 transition-all duration-300 ${hoverIndex === index ? "bg-gradient-to-r from-blue-50/80 to-gray-50/80 transform scale-[0.995]" : "bg-white"}`}
                key={index}
                onMouseEnter={() => setHoverIndex(index)}
                onMouseLeave={() => setHoverIndex(null)}
              >
                <p className="max-sm:hidden font-bold text-base text-gray-700">{index + 1}</p>
                <div className="flex items-center gap-3">
                  {item.userData && item.userData.image ? (
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-tr from-blue-400 to-blue-500 rounded-full blur-sm opacity-70 -z-10 scale-90"></div>
                      <img className="w-12 h-12 rounded-full border-2 border-white object-cover shadow-md ring-2 ring-gray-200" src={item.userData.image} alt="" />
                    </div>
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-600 to-blue-500 flex items-center justify-center shadow-md">
                      <span className="text-white font-bold">
                        {item.userData && item.userData.name ? item.userData.name.charAt(0).toUpperCase() : "?"}
                      </span>
                    </div>
                  )}
                  <div>
                    <p className="font-medium text-base text-gray-700">{item.userData ? item.userData.name : "Unknown"}</p>
                    <p className="text-xs text-gray-500 sm:hidden">Age: {item.userData && item.userData.dob ? calculateAge(item.userData.dob) : "N/A"}</p>
                  </div>
                </div>
                <div className="max-sm:hidden">
                  <span className="inline-block py-1 px-3 bg-blue-50 text-gray-700 font-medium text-sm rounded-full">
                    {item.userData && item.userData.dob ? calculateAge(item.userData.dob) : "N/A"}
                  </span>
                </div>
                <div className="text-gray-700">
                  <div className="flex flex-col">
                    <p className="font-medium text-sm text-gray-700">{item.slotDate ? slotDateFormat(item.slotDate) : "N/A"}</p>
                    <div className="flex items-center mt-1">
                      <div className="h-2 w-2 rounded-full bg-blue-500 mr-2"></div>
                      <p className="text-sm font-medium text-gray-500">{item.slotTime || "N/A"}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {item.docData && item.docData.image ? (
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-tr from-blue-400 to-blue-500 rounded-full blur-sm opacity-70 -z-10 scale-90"></div>
                      <img className="w-12 h-12 rounded-full border-2 border-white object-cover shadow-md ring-2 ring-gray-200" src={item.docData.image} alt="" />
                    </div>
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-600 to-blue-500 flex items-center justify-center shadow-md">
                      <span className="text-white font-bold">
                        {item.docData && item.docData.name ? item.docData.name.charAt(0).toUpperCase() : "?"}
                      </span>
                    </div>
                  )}
                  <p className="font-medium text-base text-gray-700">{item.docData ? item.docData.name : "Unknown"}</p>
                </div>
                <div>
                  <span className="font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-500">
                    {currency}{item.amount || 0}
                  </span>
                </div>
                {item.cancelled ? (
                  <div className="flex justify-center">
                    <button
                      onClick={() => openReasonModal(item)}
                      className="px-3 py-1.5 rounded-md bg-red-500 text-white text-xs font-bold inline-flex items-center space-x-1 hover:bg-red-600 transition-colors duration-300"
                    >
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"></path>
                      </svg>
                      <span>Cancelled</span>
                    </button>
                  </div>
                ) : item.isCompleted ? (
                  <div className="flex justify-center">
                    <p className="px-3 py-1.5 rounded-md bg-blue-500 text-white text-xs font-bold inline-flex items-center space-x-1">
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
                      className="px-3 py-1.5 rounded-md bg-red-500 hover:bg-red-600 transition-colors duration-300 shadow-md hover:shadow-lg text-white font-medium text-xs flex items-center gap-1 group"
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
            <div className="flex flex-col justify-center items-center h-64 text-gray-400">
              <div className="relative w-20 h-20 mb-6">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full blur-lg opacity-20"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-12 h-12 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                </div>
              </div>
              <p className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-5
00">
                {activeTab === "all"
                  ? "No appointments found"
                  : activeTab === "active"
                  ? "No active appointments"
                  : activeTab === "cancelled"
                  ? "No cancelled appointments"
                  : "No completed appointments"}
              </p>
              <p className="text-base text-gray-500 mt-2">
                {activeTab === "all"
                  ? "Scheduled appointments will appear here"
                  : activeTab === "active"
                  ? "Active appointments will appear here"
                  : activeTab === "cancelled"
                  ? "Cancelled appointments will appear here"
                  : "Completed appointments will appear here"}
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AppointmentsTable;