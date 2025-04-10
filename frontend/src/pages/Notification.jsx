import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";
import { Calendar, FileText } from "lucide-react";

const Notifications = () => {
  const { backendUrl, token, userData } = useContext(AppContext);
  const [notifications, setNotifications] = useState([]);
  const [socket, setSocket] = useState(null);
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate();

  // Fetch notifications from the backend
  const fetchNotifications = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/notifications`, {
        headers: { token },
      });
      if (data.success) {
        setNotifications(data.notifications);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Failed to fetch notifications");
    }
  };

  // Mark a single notification as read
  const markAsRead = async (notificationId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/mark-notification-read`,
        { notificationId, userId: userData._id }, // Include userId for consistency with backend
        { headers: { token } }
      );
      if (data.success) {
        setNotifications((prev) =>
          prev.map((n) => (n._id === notificationId ? { ...n, isRead: true } : n))
        );
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Failed to mark notification as read");
    }
  };

  // Get appropriate icon based on notification type
  const getNotificationIcon = (type) => {
    switch (type) {
      case "appointment_reminder":
        return (
          <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 hover:bg-green-200/50 transition-colors duration-300">
            <Calendar className="h-5 w-5" />
          </div>
        );
      case "report_card_available":
        return (
          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 hover:bg-blue-200/50 transition-colors duration-300">
            <FileText className="h-5 w-5" />
          </div>
        );
      default:
        return (
          <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200/50 transition-colors duration-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
            </svg>
          </div>
        );
    }
  };

  // Handle clicking a notification: navigate and mark as read
  const handleNotificationClick = async (notification) => {
    if (notification.type === "appointment_reminder") {
      navigate("/my-appointments");
    } else if (notification.type === "report_card_available") {
      navigate("/my-report-card");
    } else {
      console.warn("Unknown notification type:", notification.type);
      navigate("/my-appointments"); // Fallback
    }

    // Mark as read if not already read
    if (!notification.isRead) {
      await markAsRead(notification._id);
    }
  };

  // Setup Socket.IO and fetch initial notifications
  useEffect(() => {
    if (token && userData) {
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
        setNotifications((prev) => [notification, ...prev]);

        // Show toast for new notification
        toast.info(
          <div className="flex items-center">
            <div className="mr-2">{getNotificationIcon(notification.type)}</div>
            <div>
              <p className="font-semibold text-gray-900">
                {notification.type === "appointment_reminder"
                  ? "Appointment Reminder"
                  : notification.type === "report_card_available"
                  ? "Report Card Available"
                  : "New Notification"}
              </p>
              <p className="text-sm text-gray-600">{notification.message}</p>
            </div>
          </div>,
          {
            autoClose: 5000,
            closeOnClick: true,
            pauseOnHover: true,
            className: "bg-white shadow-lg rounded-lg border border-gray-100",
          }
        );
      });

      newSocket.on("notificationRead", (notificationId) => {
        setNotifications((prev) =>
          prev.map((n) => (n._id === notificationId ? { ...n, isRead: true } : n))
        );
      });

      return () => {
        console.log("Disconnecting socket...");
        newSocket.disconnect();
      };
    }
  }, [token, userData, backendUrl]);

  // Filter notifications based on read/unread status
  const filteredNotifications = notifications.filter((notification) => {
    if (filter === "unread") return !notification.isRead;
    if (filter === "read") return notification.isRead;
    return true; // "all" filter
  });

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = now - date;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return `Today at ${date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })}`;
    } else if (diffDays === 1) {
      return `Yesterday at ${date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })}`;
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return date.toLocaleDateString([], {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg max-w-4xl mx-auto my-10 overflow-hidden">
      <div className="bg-primary p-6">
        <h2 className="text-2xl font-bold text-white flex items-center hover:text-white/90 transition-colors duration-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
          Notifications
        </h2>
      </div>

      <div className="p-4 border-b border-gray-100 flex items-center justify-between">
        <div className="flex space-x-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 text-sm rounded-full transition-colors duration-300 ${
              filter === "all"
                ? "bg-primary/10 text-primary font-semibold"
                : "text-gray-600 hover:bg-primary/5 hover:text-primary"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter("unread")}
            className={`px-4 py-2 text-sm rounded-full transition-colors duration-300 ${
              filter === "unread"
                ? "bg-primary/10 text-primary font-semibold"
                : "text-gray-600 hover:bg-primary/5 hover:text-primary"
            }`}
          >
            Unread
          </button>
          <button
            onClick={() => setFilter("read")}
            className={`px-4 py-2 text-sm rounded-full transition-colors duration-300 ${
              filter === "read"
                ? "bg-primary/10 text-primary font-semibold"
                : "text-gray-600 hover:bg-primary/5 hover:text-primary"
            }`}
          >
            Read
          </button>
        </div>
      </div>

      {filteredNotifications.length === 0 ? (
        <div className="text-center py-16 px-4">
          <div className="bg-gray-100 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-1 hover:text-primary transition-colors duration-300">
            No notifications found
          </h3>
          <p className="text-gray-600 text-sm hover:text-gray-700 transition-colors duration-300">
            {filter === "all"
              ? "You don't have any notifications yet."
              : filter === "unread"
              ? "You don't have any unread notifications."
              : "You don't have any read notifications."}
          </p>
        </div>
      ) : (
        <div className="divide-y divide-gray-100 max-h-96 overflow-y-auto">
          {filteredNotifications.map((notification) => (
            <div
              key={notification._id}
              onClick={() => handleNotificationClick(notification)} // Handle navigation and mark as read
              className={`flex p-4 transition-colors duration-300 hover:bg-primary/5 cursor-pointer ${
                !notification.isRead ? "bg-primary/10" : ""
              }`}
            >
              <div className="mr-4 flex-shrink-0">
                {getNotificationIcon(notification.type)}
              </div>
              <div className="flex-grow">
                <div className="flex justify-between items-start">
                  <h4
                    className={`text-sm font-semibold ${
                      notification.isRead
                        ? "text-gray-900 hover:text-primary"
                        : "text-primary hover:text-primary-dark"
                    } transition-colors duration-300`}
                  >
                    {notification.type === "appointment_reminder"
                      ? "Appointment Reminder"
                      : notification.type === "report_card_available"
                      ? "Report Card Available"
                      : "Notification"}
                  </h4>
                  <span className="text-xs text-gray-600 hover:text-gray-700 transition-colors duration-300">
                    {formatDate(notification.createdAt)}
                  </span>
                </div>
                <p
                  className={`text-sm mt-1 ${
                    notification.isRead
                      ? "text-gray-600 hover:text-gray-700"
                      : "text-gray-900 hover:text-primary"
                  } transition-colors duration-300`}
                >
                  {notification.message}
                </p>
                {!notification.isRead && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent triggering navigation when clicking "Mark as read"
                      markAsRead(notification._id);
                    }}
                    className="text-primary hover:text-primary-dark text-xs font-semibold mt-2 transition-colors duration-300"
                  >
                    Mark as read
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notifications;