// DoctorContext.jsx
import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const DoctorContext = createContext();

const DoctorContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [dToken, setDToken] = useState(localStorage.getItem("dToken") || "");
  const [appointments, setAppointments] = useState([]);
  const [profileData, setProfileData] = useState(false);
  const [dashData, setDashData] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelAppointmentId, setCancelAppointmentId] = useState(null);
  const [cancellationReason, setCancellationReason] = useState("");

  const getAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/doctor/appointments", {
        headers: { dToken }
      });
      if (data.success) {
        setAppointments(data.appointments);
        console.log(data.appointments);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const completeAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/doctor/complete-appointment",
        { appointmentId },
        { headers: { dToken } }
      );
      if (data.success) {
        toast.success(data.message);
        getAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    setCancelAppointmentId(appointmentId);
    setShowCancelModal(true);
  };

  const handleCancelConfirm = async () => {
    if (!cancellationReason.trim()) {
      toast.error("Cancellation reason is required");
      return;
    }

    try {
      const { data } = await axios.post(
        backendUrl + "/api/doctor/cancel-appointment",
        { appointmentId: cancelAppointmentId, cancellationReason, docId: dToken },
        { headers: { dToken } }
      );
      if (data.success) {
        toast.success(data.message);
        getAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setShowCancelModal(false);
      setCancellationReason("");
      setCancelAppointmentId(null);
    }
  };

  const getProfileData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/doctor/profile", {
        headers: { dToken }
      });
      if (data.success) {
        setProfileData(data.profileData);
        console.log(data.profileData);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const getDashData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/doctor/dashboard", {
        headers: { dToken }
      });
      if (data.success) {
        setDashData(data.dashData);
        console.log(data.dashData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const getPatientReportCard = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/doctor/patient-report-card",
        { appointmentId },
        { headers: { dToken } }
      );
      if (data.success) {
        return data.reportCard;
      } else {
        toast.error(data.message);
        return null;
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      return null;
    }
  };

  const saveOrUpdateReportCard = async (appointmentId, reportData) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/doctor/save-or-update-report-card",
        { appointmentId, ...reportData },
        { headers: { dToken } }
      );
      if (data.success) {
        toast.success(data.message);
        return data.reportCard;
      } else {
        toast.error(data.message);
        return null;
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      return null;
    }
  };

  const value = {
    dToken,
    setDToken,
    backendUrl,
    appointments,
    setAppointments,
    getAppointments,
    completeAppointment,
    cancelAppointment,
    profileData,
    setProfileData,
    getProfileData,
    dashData,
    setDashData,
    getDashData,
    getPatientReportCard,
    saveOrUpdateReportCard,
    showCancelModal,
    setShowCancelModal,
    cancellationReason,
    setCancellationReason,
    handleCancelConfirm,
  };

  return (
    <DoctorContext.Provider value={value}>
      {props.children}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Cancel Appointment</h3>
            <textarea
              className="w-full p-2 border rounded-lg mb-4 resize-none"
              placeholder="Enter reason for cancellation"
              value={cancellationReason}
              onChange={(e) => setCancellationReason(e.target.value)}
              rows="4"
              required
            />
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition-colors"
                onClick={() => setShowCancelModal(false)}
              >
                Close
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                onClick={handleCancelConfirm}
              >
                Confirm Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </DoctorContext.Provider>
  );
};

export default DoctorContextProvider;