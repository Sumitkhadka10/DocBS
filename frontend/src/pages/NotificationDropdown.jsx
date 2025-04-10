import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../context/AppContext.jsx";
import axios from "axios";
import { io } from "socket.io-client";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { Bell, FileText, Calendar } from "lucide-react";

// Notification dropdown component
const NotificationDropdown = ({ isOpen, setIsOpen }) => {
  const { token, userData, backendUrl } = useContext(AppContext);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [socket, setSocket] = useState(null);
  const navigate = useNavigate();

  // Fetch notifications from the backend
  const fetchNotifications = async () => {
    if (!token) return;
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/notifications`, {
        headers: { token },
      });
      if (data.success) {
        setNotifications(data.notifications);
        setUnreadCount(data.notifications.filter((n) => !n.isRead).length);
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
      toast.error(error.message || "Failed to fetch notifications");
    }
  };

  // Mark a notification as read
  const markAsRead = async (notificationId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/mark-notification-read`,
        { notificationId, userId: userData._id },
        { headers: { token } }
      );
      if (data.success) {
        setNotifications((prev) =>
          prev.map((n) => (n._id === notificationId ? { ...n, isRead: true } : n))
        );
        setUnreadCount((prev) => Math.max(prev - 1, 0));
        toast.success("Notification marked as read");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error marking notification as read:", error);
      toast.error(error.message || "Failed to mark notification as read");
    }
  };

  // Format timestamp for display
  const formatTimestamp = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMin = Math.floor(diffMs / 60000);
    const diffHr = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHr / 24);

    if (diffMin < 1) return "Just now";
    if (diffMin < 60) return `${diffMin}m ago`;
    if (diffHr < 24) return `${diffHr}h ago`;
    if (diffDay === 1) return "Yesterday";
    if (diffDay < 7) return `${diffDay}d ago`;
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  // Toast component for report card notifications
  const ReportCardToast = ({ message, appointmentId, closeToast }) => {
    const navigate = useNavigate();
    return (
      <div className="flex items-start space-x-3 p-3 bg-white rounded-lg shadow-md border border-gray-200 max-w-sm">
        <FileText className="w-6 h-6 text-blue-500 flex-shrink-0" />
        <div className="flex-1">
          <p className="text-sm font-semibold text-gray-900">New Report Card Available</p>
          <p className="text-sm text-gray-600 mt-1">{message}</p>
          {appointmentId && (
            <p className="text-xs text-gray-500 mt-1">Appointment ID: {appointmentId}</p>
          )}
          <div className="mt-2 flex space-x-2">
            <button
              onClick={() => {
                navigate("/my-report-card"); // Navigate to report card page
                closeToast();
              }}
              className="text-xs font-medium text-blue-600 hover:text-blue-800 underline transition-colors duration-200"
            >
              View Report
            </button>
            <button
              onClick={closeToast}
              className="text-xs font-medium text-gray-500 hover:text-gray-700 transition-colors duration-200"
            >
              Dismiss
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Toast component for appointment reminders
  const AppointmentReminderToast = ({ message, appointmentId, closeToast }) => {
    const navigate = useNavigate();
    return (
      <div className="flex items-start space-x-3 p-3 bg-white rounded-lg shadow-md border border-gray-200 max-w-sm">
        <Calendar className="w-6 h-6 text-green-500 flex-shrink-0" />
        <div className="flex-1">
          <p className="text-sm font-semibold text-gray-900">Appointment Reminder</p>
          <p className="text-sm text-gray-600 mt-1">{message}</p>
          {appointmentId && (
            <p className="text-xs text-gray-500 mt-1">Appointment ID: {appointmentId}</p>
          )}
          <div className="mt-2 flex space-x-2">
            <button
              onClick={() => {
                navigate("/my-appointments"); // Navigate to appointments page
                closeToast();
              }}
              className="text-xs font-medium text-green-600 hover:text-green-800 underline transition-colors duration-200"
            >
              View Details
            </button>
            <button
              onClick={closeToast}
              className="text-xs font-medium text-gray-500 hover:text-gray-700 transition-colors duration-200"
            >
              Dismiss
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Effect to handle socket connection and notifications
  useEffect(() => {
    if (!token || !userData) {
      setNotifications([]);
      setUnreadCount(0);
      return;
    }

    fetchNotifications();

    const newSocket = io(backendUrl, {
      auth: { token },
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });
    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("Socket connected:", newSocket.id);
      newSocket.emit("joinRoom", userData._id); // Join user-specific room
    });

    newSocket.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
    });

    newSocket.on("newNotification", (notification) => {
      console.log("New notification received:", notification);
      console.log("Notification details:", JSON.stringify(notification, null, 2));
      setNotifications((prev) => [notification, ...prev]);
      setUnreadCount((prev) => prev + 1);

      const toastOptions = {
        position: "top-right",
        autoClose: 7000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        className: "bg-transparent p-0",
        bodyClassName: "flex items-start",
        toastId: notification._id || `fallback-${Date.now()}`,
      };

      // Handle notification type to display appropriate toast
      if (notification.type === "appointment_reminder") {
        toast(
          <AppointmentReminderToast
            message={notification.message || "You have an upcoming appointment!"}
            appointmentId={notification.appointmentId}
          />,
          toastOptions
        );
      } else if (notification.type === "report_card_available") {
        toast(
          <ReportCardToast
            message={notification.message || "A new report card is available!"}
            appointmentId={notification.appointmentId}
          />,
          toastOptions
        );
      } else {
        console.warn("Unknown notification type:", notification.type);
        toast(notification.message || "New notification received", toastOptions); // Fallback for unknown types
      }
    });

    newSocket.on("notificationRead", (notificationId) => {
      setNotifications((prev) =>
        prev.map((n) => (n._id === notificationId ? { ...n, isRead: true } : n))
      );
      setUnreadCount((prev) => Math.max(prev - 1, 0));
    });

    return () => {
      console.log("Disconnecting socket...");
      newSocket.disconnect();
    };
  }, [token, userData, backendUrl]);

  // Refresh notifications when dropdown opens
  useEffect(() => {
    if (isOpen) {
      fetchNotifications();
    }
  }, [isOpen]);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-300 relative"
      >
        <Bell className="h-6 w-6 text-gray-600 hover:text-primary transition-colors duration-300" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 h-4 w-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-100 z-50 max-h-96 overflow-y-auto">
          <div className="p-3 border-b border-gray-100">
            <h3 className="text-xl font-semibold text-gray-900 hover:text-primary transition-colors duration-300">
              Notifications
            </h3>
          </div>

          {notifications.length === 0 ? (
            <div className="p-4 text-center text-gray-600 text-sm hover:text-gray-700 transition-colors duration-300">
              No notifications
            </div>
          ) : (
            notifications
              .slice(0, 5) // Limit to 5 most recent notifications in dropdown
              .map((notification) => (
                <NotificationItem
                  key={notification._id || `fallback-${Date.now()}`}
                  notification={notification}
                  markAsRead={markAsRead}
                  formatTimestamp={formatTimestamp}
                  navigate={navigate}
                />
              ))
          )}

          <div className="p-3 text-center">
            <button
              onClick={() => {
                setIsOpen(false);
                navigate("/notifications"); // Link to full notifications page
              }}
              className="text-sm text-primary hover:text-primary-dark transition-colors duration-300"
            >
              See all notifications
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Individual notification item in the dropdown
const NotificationItem = ({ notification, markAsRead, formatTimestamp, navigate }) => {
  const handleItemClick = async (e) => {
    if (e.target.tagName === "BUTTON") return; // Prevent navigation if clicking "Mark as read" button

    // Navigate based on notification type and mark as read
    if (notification.type === "appointment_reminder") {
      navigate("/my-appointments");
      if (!notification.isRead) {
        await markAsRead(notification._id); // Mark as read after navigation
      }
    } else if (notification.type === "report_card_available") {
      navigate("/my-report-card");
      if (!notification.isRead) {
        await markAsRead(notification._id); // Mark as read after navigation
      }
    } else {
      console.warn("Unknown notification type:", notification.type);
      navigate("/my-appointments"); // Default fallback
      if (!notification.isRead) {
        await markAsRead(notification._id); // Mark as read even for fallback
      }
    }
  };

  return (
    <div
      onClick={handleItemClick}
      className={`flex items-center p-3 border-b border-gray-100 hover:bg-primary/5 transition-colors duration-300 cursor-pointer ${
        !notification.isRead ? "bg-primary/10" : ""
      }`}
    >
      {!notification.isRead && <div className="w-2 h-2 bg-primary rounded-full mr-2" />}
      <div className="flex-1">
        <p
          className={`text-sm ${
            notification.isRead
              ? "text-gray-600 hover:text-gray-700"
              : "text-gray-900 font-semibold hover:text-primary"
          } transition-colors duration-300`}
        >
          {notification.message || "No message provided"}
        </p>
        <p className="text-xs text-gray-600 mt-1 hover:text-gray-700 transition-colors duration-300">
          {formatTimestamp(notification.createdAt || new Date())}
        </p>
      </div>
      {!notification.isRead && (
        <button
          onClick={(e) => {
            e.stopPropagation(); // Prevent triggering handleItemClick
            markAsRead(notification._id);
          }}
          className="ml-2 text-xs text-primary hover:text-primary-dark transition-colors duration-200"
        >
          Mark as read
        </button>
      )}
    </div>
  );
};

export default NotificationDropdown;