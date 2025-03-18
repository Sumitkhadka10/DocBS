import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { io } from "socket.io-client";

const Notifications = () => {
  const { backendUrl, token, userData } = useContext(AppContext);
  const [notifications, setNotifications] = useState([]);
  const [socket, setSocket] = useState(null);
  const [filter, setFilter] = useState("all"); // "all", "unread", "read"

  const fetchNotifications = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/notifications", {
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

  const markAsRead = async (notificationId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/mark-notification-read",
        { notificationId },
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

  const markAllAsRead = async () => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/mark-all-notifications-read",
        {},
        { headers: { token } }
      );
      if (data.success) {
        setNotifications((prev) =>
          prev.map((n) => ({ ...n, isRead: true }))
        );
        toast.success("All notifications marked as read");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Failed to mark all notifications as read");
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case "message":
        return (
          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
            </svg>
          </div>
        );
      case "alert":
        return (
          <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center text-red-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
        );
      case "success":
        return (
          <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
        );
      default:
        return (
          <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
            </svg>
          </div>
        );
    }
  };

  useEffect(() => {
    if (token && userData) {
      fetchNotifications();

      const newSocket = io(backendUrl, {
        auth: { token },
      });
      setSocket(newSocket);

      newSocket.emit("joinRoom", userData._id);

      newSocket.on("newNotification", (notification) => {
        setNotifications((prev) => [notification, ...prev]);
        
        // Show toast notification with custom styling
        toast.info(
          <div className="flex items-center">
            <div className="mr-2">
              {getNotificationIcon(notification.type)}
            </div>
            <div>
              <p className="font-medium">{notification.title || "New Notification"}</p>
              <p className="text-sm">{notification.message}</p>
            </div>
          </div>,
          {
            autoClose: 5000,
            closeOnClick: true,
            pauseOnHover: true,
          }
        );
      });

      return () => {
        newSocket.disconnect();
      };
    }
  }, [token, userData]);

  // Filter notifications based on selected filter
  const filteredNotifications = notifications.filter(notification => {
    if (filter === "unread") return !notification.isRead;
    if (filter === "read") return notification.isRead;
    return true; // "all" filter
  });

  // Helper function to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = now - date;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      // Today - show time
      return `Today at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else if (diffDays === 1) {
      // Yesterday
      return `Yesterday at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else if (diffDays < 7) {
      // This week
      return `${diffDays} days ago`;
    } else {
      // More than a week ago
      return date.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' });
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg max-w-4xl mx-auto my-10 overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
        <h2 className="text-2xl font-bold text-white flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          Notifications
        </h2>
      </div>

      <div className="p-4 border-b flex items-center justify-between">
        <div className="flex space-x-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 text-sm rounded-full ${
              filter === "all" 
                ? "bg-blue-100 text-blue-800 font-medium" 
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter("unread")}
            className={`px-4 py-2 text-sm rounded-full ${
              filter === "unread" 
                ? "bg-blue-100 text-blue-800 font-medium" 
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            Unread
          </button>
          <button
            onClick={() => setFilter("read")}
            className={`px-4 py-2 text-sm rounded-full ${
              filter === "read" 
                ? "bg-blue-100 text-blue-800 font-medium" 
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            Read
          </button>
        </div>
        
        {notifications.some(n => !n.isRead) && (
          <button
            onClick={markAllAsRead}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            Mark all as read
          </button>
        )}
      </div>

      {filteredNotifications.length === 0 ? (
        <div className="text-center py-16 px-4">
          <div className="bg-gray-100 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">No notifications found</h3>
          <p className="text-gray-500">
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
              className={`flex p-4 transition-all duration-300 hover:bg-gray-50 ${
                !notification.isRead ? "bg-blue-50" : ""
              }`}
            >
              <div className="mr-4 flex-shrink-0">
                {getNotificationIcon(notification.type || "default")}
              </div>
              <div className="flex-grow">
                <div className="flex justify-between items-start">
                  <h4 className={`text-sm font-medium ${notification.isRead ? "text-gray-800" : "text-blue-800"}`}>
                    {notification.title || "Notification"}
                  </h4>
                  <span className="text-xs text-gray-500">
                    {formatDate(notification.createdAt)}
                  </span>
                </div>
                <p className={`text-sm mt-1 ${notification.isRead ? "text-gray-600" : "text-gray-800"}`}>
                  {notification.message}
                </p>
                {!notification.isRead && (
                  <button
                    onClick={() => markAsRead(notification._id)}
                    className="text-blue-600 hover:text-blue-800 text-xs font-medium mt-2"
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