import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const MyAppointments = () => {
  const { backendUrl, token, getDoctorsData } = useContext(AppContext);

  const [appointments, setAppointments] = useState([]);
  const months = [
    "",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split("_");
    return dateArray[0] + " " + months[Number(dateArray[1])]+ " " + dateArray[2];
  }

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/appointments", {headers: { token }});
      if (data.success) {
        setAppointments(data.appointments.reverse());
        console.log(data.appointments);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const {data} = await axios.post(backendUrl + "/api/user/cancel-appointment", {appointmentId}, {headers: {token}});
      if (data.success) {
        toast.success(data.message);
        getUserAppointments();
        getDoctorsData();
      } else {
        toast.error(data.message);}

    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  useEffect(() => {
    if (token) {
      getUserAppointments();
    }
  }, [token]);
  
  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl shadow-sm">
      <h2 className="text-2xl font-bold mb-6 text-blue-800 border-b-2 border-blue-300 pb-3 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        My Appointments History
      </h2>
      
      {appointments.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          No appointments found. Book your first appointment now!
        </div>
      ) : (
        <div className="space-y-6">
          {appointments.map((item, index) => {
            // Determine border color based on appointment status
            let borderColor = "border-blue-400";
            let statusBadge = null;
            
            if (item.cancelled) {
              borderColor = "border-red-400";
              statusBadge = (
                <span className="absolute top-4 right-4 bg-red-100 text-red-600 text-xs font-medium px-2 py-1 rounded-full">
                  Cancelled
                </span>
              );
            } else if (item.isCompleted) {
              borderColor = "border-green-400";
              statusBadge = (
                <span className="absolute top-4 right-4 bg-green-100 text-green-600 text-xs font-medium px-2 py-1 rounded-full">
                  Completed
                </span>
              );
            }
            
            return (
              <div
                key={index}
                className={`bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg relative border-l-4 ${borderColor} ${item.cancelled ? 'opacity-75' : ''}`}
              >
                {statusBadge}
                
                <div className="md:flex">
                  <div className="p-4 md:w-1/4 flex justify-center items-start">
                    <div className="relative">
                      <img 
                        className="w-32 h-32 object-cover rounded-full border-4 border-blue-100" 
                        src={item.docData.image} 
                        alt={item.docData.name} 
                      />
                      {item.cancelled && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 rounded-full border-4 border-blue-100">
                          <span className="text-white font-bold text-xs transform rotate-12 px-2 py-1 bg-red-500 rounded">CANCELLED</span>
                        </div>
                      )}
                      {item.isCompleted && (
                        <div className="absolute bottom-0 right-0 bg-green-500 rounded-full p-1">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="p-4 md:w-2/4">
                    <div className="uppercase tracking-wide text-sm text-blue-600 font-semibold">{item.docData.speciality}</div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{item.docData.name}</h3>
                    
                    <div className="flex items-center mb-2 text-gray-700">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <div>
                        <p className="text-sm">{item.docData.address.line1}</p>
                        <p className="text-sm">{item.docData.address.line2}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center text-gray-700">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="text-sm font-medium">{slotDateFormat(item.slotDate)}</span>
                      <span className="mx-2 text-gray-400">|</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-sm font-medium">{item.slotTime}</span>
                    </div>
                  </div>
                  
                  <div className="p-4 md:w-1/4 flex items-center justify-center border-t md:border-t-0 md:border-l border-gray-200">
                    {!item.cancelled && !item.isCompleted && (
                      <button 
                        onClick={() => cancelAppointment(item._id)} 
                        className="w-full py-2 px-4 bg-white border border-red-300 rounded-lg text-red-600 font-medium shadow-sm hover:bg-red-600 hover:text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                      >
                        Cancel Appointment
                      </button>
                    )}
                    {item.cancelled && !item.isCompleted && (
                      <div className="w-full py-2 px-4 bg-red-50 border border-red-300 rounded-lg text-red-600 font-medium text-center">
                        Appointment Cancelled
                      </div>
                    )}
                    {item.isCompleted && (
                      <div className="w-full py-2 px-4 bg-green-50 border border-green-300 rounded-lg text-green-600 font-medium text-center">
                        Completed
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );  
};

export default MyAppointments;