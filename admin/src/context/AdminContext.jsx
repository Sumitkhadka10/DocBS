import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
  const [aToken, setAToken] = useState(localStorage.getItem("aToken") || "");
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [users, setUsers] = useState([]);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [dashData, setDashData] = useState(false);
  const [lastErrorTime, setLastErrorTime] = useState({ dash: 0, appts: 0 });
  const [lastActiveTime, setLastActiveTime] = useState(Date.now());
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelAppointmentId, setCancelAppointmentId] = useState(null);
  const [cancellationReason, setCancellationReason] = useState("");

  const ERROR_COOLDOWN = 1800000; // 30 minutes in milliseconds 

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        setLastActiveTime(Date.now());
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  const getAllDoctors = async () => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/admin/all-doctors`,
        {},
        { headers: { Authorization: `Bearer ${aToken}` } }
      );
      if (data.success) {
        setDoctors(data.doctors);
        console.log("Doctors loaded:", data.doctors);
      } else {
        toast.error(data.message || "Failed to fetch doctors");
      }
    } catch (error) {
      console.error("Error fetching doctors:", error);
      toast.error(error.response?.data?.message || error.message || "Error fetching doctors");
    }
  };

  const changeAvailability = async (docId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/admin/change-availability`,
        { docId },
        { headers: { Authorization: `Bearer ${aToken}` } }
      );
      if (data.success) {
        toast.success(data.message || "Availability changed successfully");
        await getAllDoctors();
      } else {
        toast.error(data.message || "Failed to change availability");
      }
    } catch (error) {
      console.error("Error changing availability:", error);
      toast.error(error.response?.data?.message || error.message || "Error changing availability");
    }
  };

  const getAllAppointments = async () => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/admin/appointments`,
        { headers: { Authorization: `Bearer ${aToken}` } }
      );
      if (data.success) {
        setAppointments(data.appointments);
        console.log("Appointments loaded:", data.appointments);
      } else {
        toast.error(data.message || "Failed to fetch appointments");
      }
    } catch (error) {
      const now = Date.now();
      const inactiveTime = now - lastActiveTime;
      if (inactiveTime > ERROR_COOLDOWN && now - lastErrorTime.appts > ERROR_COOLDOWN) {
        console.error("Error fetching appointments:", error);
        toast.error(`Network error after prolonged inactivity: ${error.response?.data?.message || error.message}`);
        setLastErrorTime((prev) => ({ ...prev, appts: now }));
      } else {
        console.log("Suppressed toast for appointments due to short inactivity or recent error");
      }
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

    // Close the modal immediately after clicking "Confirm Cancel"
    setShowCancelModal(false);

    try {
      const { data } = await axios.post(
        `${backendUrl}/api/admin/cancel-appointment`,
        { appointmentId: cancelAppointmentId, cancellationReason },
        { headers: { Authorization: `Bearer ${aToken}` } }
      );
      if (data.success) {
        toast.success(data.message || "Appointment cancelled successfully");
        await getAllAppointments();
      } else {
        toast.error(data.message || "Failed to cancel appointment");
      }
    } catch (error) {
      console.error("Error canceling appointment:", error);
      toast.error(error.response?.data?.message || error.message || "Error cancelling appointment");
    } finally {
      // Reset state after the operation
      setCancellationReason("");
      setCancelAppointmentId(null);
    }
  };

  const getAllUsers = async () => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/admin/users`,
        { headers: { Authorization: `Bearer ${aToken}` } }
      );
      if (data.success) {
        setUsers(data.users);
        console.log("Users loaded:", data.users);
      } else {
        toast.error(data.message || "Failed to fetch users");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error(error.response?.data?.message || error.message || "Error fetching users");
    }
  };

  const getDashData = async () => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/admin/dashboard`,
        { headers: { Authorization: `Bearer ${aToken}` } }
      );
      if (data.success) {
        setDashData(data.dashData);
        console.log("Dashboard data loaded:", data.dashData);
      } else {
        toast.error(data.message || "Failed to fetch dashboard data");
      }
    } catch (error) {
      const now = Date.now();
      const inactiveTime = now - lastActiveTime;
      if (inactiveTime > ERROR_COOLDOWN && now - lastErrorTime.dash > ERROR_COOLDOWN) {
        console.error("Error fetching dashboard data:", error);
        toast.error(`Network error after prolonged inactivity: ${error.response?.data?.message || error.message}`);
        setLastErrorTime((prev) => ({ ...prev, dash: now }));
      } else {
        console.log("Suppressed toast for dashboard due to short inactivity or recent error");
      }
    }
  };

  const value = {
    aToken,
    setAToken,
    backendUrl,
    doctors,
    getAllDoctors,
    changeAvailability,
    appointments,
    setAppointments,
    getAllAppointments,
    cancelAppointment,
    users,
    getAllUsers,
    dashData,
    getDashData,
    showCancelModal,
    setShowCancelModal,
    cancellationReason,
    setCancellationReason,
    handleCancelConfirm,
  };

  return (
    <AdminContext.Provider value={value}>
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
                onClick={() => {
                  setShowCancelModal(false);
                  setCancellationReason("");
                }}
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
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;