// AllAppointments.jsx
import React, { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../context/AdminContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";

const AllAppointments = () => {
  const { aToken, appointments, getAllAppointments, cancelAppointment } = useContext(AdminContext);
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext);
  const [hoverIndex, setHoverIndex] = useState(null);
  const [activeTab, setActiveTab] = useState("all");
  const [filters, setFilters] = useState({
    date: "",
    patientName: "",
    doctorName: ""
  });
  const [showReasonModal, setShowReasonModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  useEffect(() => {
    if (aToken) {
      getAllAppointments();
    }
  }, [aToken, getAllAppointments]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const openReasonModal = (appointment) => {
    setSelectedAppointment(appointment);
    setShowReasonModal(true);
  };

  const closeReasonModal = () => {
    setShowReasonModal(false);
    setSelectedAppointment(null);
  };

  const filteredAppointments = appointments
    ? appointments.filter((item) => {
        if (activeTab === "active" && (item.cancelled || item.isCompleted)) return false;
        if (activeTab === "cancelled" && !item.cancelled) return false;
        if (activeTab === "completed" && !item.isCompleted) return false;

        if (filters.date && item.slotDate) {
          const formattedDate = slotDateFormat(item.slotDate);
          if (!formattedDate.toLowerCase().includes(filters.date.toLowerCase())) return false;
        }

        if (filters.patientName && item.userData?.name) {
          if (!item.userData.name.toLowerCase().includes(filters.patientName.toLowerCase())) return false;
        }

        if (filters.doctorName && item.docData?.name) {
          if (!item.docData.name.toLowerCase().includes(filters.doctorName.toLowerCase())) return false;
        }

        return true;
      })
    : [];

  return (
    <div className="w-full max-w-6xl m-5">
      {/* Cancellation Reason Modal */}
      {showReasonModal && selectedAppointment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                <svg className="w-5 h-5 mr-2 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                Cancellation Details
              </h3>
              <button onClick={closeReasonModal} className="text-gray-500 hover:text-gray-700">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-gray-500">Patient Name</p>
                <p className="text-base text-gray-700">{selectedAppointment.userData?.name || "Unknown"}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Doctor Name</p>
                <p className="text-base text-gray-700">{selectedAppointment.docData?.name || "Unknown"}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Date & Time</p>
                <p className="text-base text-gray-700">
                  {selectedAppointment.slotDate ? slotDateFormat(selectedAppointment.slotDate) : "N/A"} at {selectedAppointment.slotTime || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Cancellation Reason</p>
                <p className="text-base text-gray-700 bg-red-50 p-3 rounded-lg">
                  {selectedAppointment.cancellationReason || "No reason provided"}
                </p>
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <button
                onClick={closeReasonModal}
                className="px-4 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors duration-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mb-6">
        <div className="flex items-center mb-2">
          <div className="h-10 w-1 bg-gradient-to-b from-blue-600 to-blue-500 mr-3 rounded-full shadow-lg"></div>
          <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-500">
            Appointments Management
          </h2>
        </div>

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

        <div className="bg-white rounded-xl shadow-md p-6 mb-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center">
              <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              Filter Appointments
            </h3>
            <button
              onClick={() => setFilters({ date: "", patientName: "", doctorName: "" })}
              className="text-sm text-blue-600 hover:text-blue-800 transition-colors flex items-center"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
              Clear Filters
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">Appointment Date</label>
              <div className="relative">
                <input
                  type="text"
                  name="date"
                  value={filters.date}
                  onChange={handleFilterChange}
                  placeholder="DD-MM-YYYY"
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                />
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">Patient Name</label>
              <div className="relative">
                <input
                  type="text"
                  name="patientName"
                  value={filters.patientName}
                  onChange={handleFilterChange}
                  placeholder="Enter patient name"
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                />
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </div>
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">Doctor Name</label>
              <div className="relative">
                <input
                  type="text"
                  name="doctorName"
                  value={filters.doctorName}
                  onChange={handleFilterChange}
                  placeholder="Enter doctor name"
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                />
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

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
              <p className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-500">
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
    </div>
  );
};

export default AllAppointments;