import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { io } from "socket.io-client";

const Notifications = () => {
  const { backendUrl, token, userData } = useContext(AppContext);
  const [notifications, setNotifications] = useState([]);
  const [socket, setSocket] = useState(null);

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
      toast.error(error.message);
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
        // No need to call fetchNotifications here since WebSocket will update Navbar
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
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
        toast.info(notification.message);
      });

      return () => {
        newSocket.disconnect();
      };
    }
  }, [token, userData]);

  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl shadow-sm max-w-4xl mx-auto my-10">
      <h2 className="text-2xl font-bold mb-6 text-blue-800 border-b-2 border-blue-300 pb-3 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        Notifications
      </h2>

      {notifications.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          No notifications found.
        </div>
      ) : (
        <div className="space-y-4">
          {notifications.map((notification) => (
            <div
              key={notification._id}
              className={`flex items-center justify-between p-4 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg ${
                notification.isRead ? "bg-gray-100" : "bg-white border-l-4 border-blue-400"
              }`}
            >
              <div>
                <p className={`text-sm ${notification.isRead ? "text-gray-600" : "text-gray-800 font-medium"}`}>
                  {notification.message}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(notification.createdAt).toLocaleString()}
                </p>
              </div>
              {!notification.isRead && (
                <button
                  onClick={() => markAsRead(notification._id)}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  Mark as Read
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notifications;