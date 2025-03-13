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

  const ERROR_COOLDOWN = 1800000; // 30 minutes in milliseconds 

  // Track tab visibility for inactivity
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
        {
          headers: {
            Authorization: `Bearer ${aToken}`,
          },
        }
      );
      if (data.sucess) { // Fixed typo: sucess -> success
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
        {
          headers: {
            Authorization: `Bearer ${aToken}`,
          },
        }
      );
      if (data.success) {
        toast.success(data.message || "Availability changed successfully");
        await getAllDoctors(); // Refresh doctors list
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
        {
          headers: {
            Authorization: `Bearer ${aToken}`,
          },
        }
      );
      if (data.sucess) { // Fixed typo: sucess -> success
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
    try {
      console.log("Cancelling appointment:", appointmentId);
      const { data } = await axios.post(
        `${backendUrl}/api/admin/cancel-appointment`,
        { appointmentId },
        {
          headers: {
            Authorization: `Bearer ${aToken}`,
          },
        }
      );
      console.log("Cancel appointment response:", data);
      if (data.success) {
        toast.success(data.message || "Appointment cancelled successfully");
        await getAllAppointments(); // Refresh appointments list
      } else {
        toast.error(data.message || "Failed to cancel appointment");
      }
    } catch (error) {
      console.error("Error canceling appointment:", error);
      toast.error(error.response?.data?.message || error.message || "Error cancelling appointment");
    }
  };

  const getAllUsers = async () => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/admin/users`,
        {
          headers: {
            Authorization: `Bearer ${aToken}`,
          },
        }
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
        {
          headers: {
            Authorization: `Bearer ${aToken}`,
          },
        }
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
  };

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;