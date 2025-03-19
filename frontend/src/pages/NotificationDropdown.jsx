import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../context/AppContext.jsx";
import axios from "axios";
import { io } from "socket.io-client";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Bell } from "lucide-react";

const NotificationDropdown = ({ isOpen, setIsOpen }) => {
  const { token, userData, backendUrl } = useContext(AppContext);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [socket, setSocket] = useState(null);
  const navigate = useNavigate();

  const fetchNotifications = async () => {
    if (!token) return;
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/notifications`, {
        headers: { token }
      });
      if (data.success) {
        setNotifications(data.notifications);
        setUnreadCount(data.notifications.filter(n => !n.isRead).length);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const markAsRead = async (notificationId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/mark-notification-read`,
        { notificationId, userId: userData._id },
        { headers: { token } }
      );
      if (data.success) {
        setNotifications(prev => 
          prev.map(n => n._id === notificationId ? { ...n, isRead: true } : n)
        );
        setUnreadCount(prev => prev > 0 ? prev - 1 : 0);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to mark as read");
    }
  };

  useEffect(() => {
    if (!token || !userData) {
      setNotifications([]);
      setUnreadCount(0);
      return;
    }
    
    fetchNotifications();
    const newSocket = io(backendUrl, { auth: { token } });
    setSocket(newSocket);
    
    newSocket.emit("joinRoom", userData._id);
    
    newSocket.on("newNotification", (notification) => {
      setNotifications(prev => [notification, ...prev]);
      setUnreadCount(prev => prev + 1);
      toast.info(notification.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        className: "bg-white shadow-lg rounded-lg border border-gray-200",
      });
    });
    
    newSocket.on("notificationRead", () => {
      setUnreadCount(prev => prev > 0 ? prev - 1 : 0);
    });
    
    return () => newSocket.disconnect();
  }, [token, userData, backendUrl]);

  const formatTimestamp = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMin = Math.floor(diffMs / 60000);
    const diffHr = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHr / 24);

    if (diffMin < 1) return "Just now";
    if (diffMin < 60) return `${diffMin}m`;
    if (diffHr < 24) return `${diffHr}h`;
    if (diffDay === 1) return "Yesterday";
    if (diffDay < 7) return `${diffDay}d`;
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  return (
    <div className="relative">
      {/* Bell Icon with Badge */}
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

      {/* Dropdown Menu */}
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
            notifications.map((notification) => (
              <NotificationItem 
                key={notification._id}
                notification={notification}
                markAsRead={markAsRead}
                formatTimestamp={formatTimestamp}
              />
            ))
          )}
          
          <div className="p-3 text-center">
            <button
              onClick={() => {
                setIsOpen(false);
                navigate("/notifications");
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

// Extracted notification item component
const NotificationItem = ({ notification, markAsRead, formatTimestamp }) => (
  <div
    className={`flex items-center p-3 border-b border-gray-100 hover:bg-primary/5 transition-colors duration-300 ${
      !notification.isRead ? "bg-primary/10" : ""
    }`}
  >
    {!notification.isRead && (
      <div className="w-2 h-2 bg-primary rounded-full mr-2" />
    )}
    <div className="flex-1">
      <p className={`text-sm ${notification.isRead ? "text-gray-600 hover:text-gray-700" : "text-gray-900 font-semibold hover:text-primary"} transition-colors duration-300`}>
        {notification.message}
      </p>
      <p className="text-xs text-gray-600 mt-1 hover:text-gray-700 transition-colors duration-300">
        {formatTimestamp(notification.createdAt)}
      </p>
    </div>
    {!notification.isRead && (
      <button
        onClick={() => markAsRead(notification._id)}
        className="ml-2 text-xs text-primary hover:text-primary-dark transition-colors duration-300"
      >
        Mark as read
      </button>
    )}
  </div>
);

export default NotificationDropdown;