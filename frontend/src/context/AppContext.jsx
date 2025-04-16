import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

// Create a context to share data across the app (like a shared storage for components)
export const AppContext = createContext();

const AppContextProvider = (props) => {
  // Currency symbol for displaying prices (set to "Rs")
  const currencySymbol = "Rs";
  
  // The URL of our backend server, pulled from environment variables
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  
  // State to store lists of doctors, first aid items, and health tips
  const [doctors, setDoctors] = useState([]); // List of doctors from the backend
  const [firstAidItems, setFirstAidItems] = useState([]); // List of first aid items
  const [healthTips, setHealthTips] = useState([]); // List of health tips (used in LuxuryHealthExperience.jsx)
  
  // State to manage user login token (checks if user is logged in)
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : false // Get token from localStorage, or set to false if not logged in
  );
  
  // State to store user profile data (like name, email, etc.) when logged in
  const [userData, setUserData] = useState(false); // False if not logged in, user data if logged in

  // Function to fetch the list of doctors from the backend
  const getDoctorsData = async () => {
    try {
      // Make a GET request to the backend to get the list of doctors
      const { data } = await axios.get(backendUrl + "/api/doctor/list");
      if (data.success) {
        // If the request is successful, save the doctors list
        setDoctors(data.doctors);
      } else {
        // If the backend sends an error message, show it to the user
        toast.error(data.message);
        setDoctors([]); // Reset the list to empty if there's an error
      }
    } catch (error) {
      // If something goes wrong (like network error), log it and show the error
      console.log(error);
      toast.error(error.message);
      setDoctors([]); // Reset the list to empty if there's an error
    }
  };

  // Function to fetch first aid items from the backend
  const getFirstAidData = async () => {
    try {
      // Make a GET request to the backend to get first aid items
      const { data } = await axios.get(backendUrl + "/api/content/first-aid");
      if (data.success) {
        // If successful, save the first aid items
        setFirstAidItems(data.data);
      } else {
        // Show error message if the backend fails
        toast.error(data.message);
        setFirstAidItems([]); // Reset the list to empty on error
      }
    } catch (error) {
      // Log and show any errors (like network issues)
      console.log(error);
      toast.error(error.message);
      setFirstAidItems([]); // Reset the list to empty on error
    }
  };

  // Function to fetch health tips from the backend (used in LuxuryHealthExperience.jsx)
  const getHealthTipsData = async () => {
    try {
      // Make a GET request to the backend to get health tips
      const { data } = await axios.get(backendUrl + "/api/content/health-tips");
      if (data.success) {
        // Log the fetched health tips to help debug gradient issues (check colorClass values)
        console.log('Fetched health tips:', data.data);
        
        // Temporary fix: Assign the correct colorClass based on the title of each health tip
        // This ensures the gradients in LuxuryHealthExperience.jsx match the desired design
        // TODO: Remove this once the backend data is updated with correct colorClass values using ManageHealthTips.jsx
        const updatedHealthTips = data.data.map(tip => {
          let colorClass;
          switch (tip.title) {
            case "Nutrition Guide":
              colorClass = "from-blue-500 to-indigo-600"; // Blue to indigo gradient
              break;
            case "Active Living":
              colorClass = "from-emerald-500 to-teal-600"; // Green to teal gradient
              break;
            case "Sleep Wellness":
              colorClass = "from-purple-500 to-violet-600"; // Purple to violet gradient
              break;
            case "Preventive Care":
              colorClass = "from-amber-500 to-orange-600"; // Yellow to orange gradient
              break;
            case "Mental Health":
              colorClass = "from-rose-500 to-pink-600"; // Red to pink gradient
              break;
            case "Hydration Tips":
              colorClass = "from-cyan-500 to-blue-500"; // Cyan to blue gradient
              break;
            case "Stress Management":
              colorClass = "from-purple-500 to-indigo-600"; // Purple to indigo gradient
              break;
            case "Fitness Goals":
              colorClass = "from-red-500 to-amber-500"; // Red to yellow gradient
              break;
            default:
              colorClass = "from-blue-500 to-indigo-600"; // Default if title doesn't match
          }
          return {
            ...tip,
            colorClass: colorClass, // Override the colorClass to fix gradients
          };
        });
        setHealthTips(updatedHealthTips); // Save the updated health tips
      } else {
        // Show error message if the backend fails
        toast.error(data.message);
        setHealthTips([]); // Reset to empty so LuxuryHealthExperience.jsx shows "Loading..."
      }
    } catch (error) {
      // Log and show any errors (like network issues)
      console.log(error);
      toast.error(error.message);
      setHealthTips([]); // Reset to empty on error
    }
  };

  // Function to fetch user profile data (only if the user is logged in)
  const loadUserProfileData = async () => {
    try {
      // Make a GET request to the backend to get user profile, include the token for authentication
      const { data } = await axios.get(backendUrl + "/api/user/get-profile", {
        headers: { token },
      });
      if (data.success) {
        // If successful, save the user data (like name, email)
        setUserData(data.userData);
      } else {
        // Show error message if the backend fails
        toast.error(data.message);
        setUserData(false); // Reset to false on error
      }
    } catch (error) {
      // Log and show any errors (like network issues or invalid token)
      console.log(error);
      toast.error(error.message);
      setUserData(false); // Reset to false on error
    }
  };

  // Function to calculate a user's age based on their date of birth (dob)
  const calculateAge = (dob) => {
    const today = new Date(); // Today's date
    const birthDate = new Date(dob); // User's birth date
    let age = today.getFullYear() - birthDate.getFullYear(); // Calculate the difference in years
    return age; // Return the age
  };

  // List of months for formatting dates (used in slotDateFormat)
  const months = [
    "", // Empty first item because months are 1-12
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];

  // Function to format a date string (e.g., "15_6_2023" to "15 Jun 2023")
  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split("_"); // Split the date string into day, month, year
    return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]; // Format as "day month year"
  };

  // All the data and functions we want to share with other components via context
  const value = {
    doctors,
    getDoctorsData,
    firstAidItems,
    getFirstAidData,
    healthTips,
    getHealthTipsData,
    currencySymbol,
    token,
    setToken,
    backendUrl,
    userData,
    setUserData,
    loadUserProfileData,
    calculateAge,
    slotDateFormat,
  };

  // Fetch initial data (doctors, first aid, health tips) when the component loads
  useEffect(() => {
    getDoctorsData(); // Fetch doctors
    getFirstAidData(); // Fetch first aid items
    getHealthTipsData(); // Fetch health tips for LuxuryHealthExperience.jsx
  }, []); // Empty array means this runs only once when the component loads

  // Load user profile data whenever the token changes (e.g., user logs in or out)
  useEffect(() => {
    if (token) {
      loadUserProfileData(); // Fetch user profile if token exists (user is logged in)
    } else {
      setUserData(false); // Clear user data if token is false (user is not logged in)
    }
  }, [token]); // Runs whenever the token changes

  // Provide all the shared data to the app via context
  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;