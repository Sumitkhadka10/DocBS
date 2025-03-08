import React, { useContext, useState } from "react";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets.js";
import { toast } from "react-toastify";

const MyProfile = () => {
  const { userData, setUserData, token, backendUrl, loadUserProfileData } =
    useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false);

  const handleChange = (field, value) => {
    setUserData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddressChange = (line, value) => {
    setUserData((prev) => ({
      ...prev,
      address: {
        ...prev.address,
        [line]: value,
      },
    }));
  };

  const updateUserProfileData = async () => {
    try {
      const formData = new FormData();
      formData.append("name", userData.name);
      formData.append("phone", userData.phone);
      formData.append("address", JSON.stringify(userData.address));
      formData.append("gender", userData.gender);
      formData.append("dob", userData.dob);
      image && formData.append("image", image);

      const { data } = await axios.post(
        backendUrl + "/api/user/update-profile",
        formData,
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        await loadUserProfileData();
        setIsEdit(false);
        setImage(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  if (!userData) return null;

  return (
    <div className="max-w-4xl mx-auto bg-gray-50 rounded-3xl overflow-hidden shadow-xl">
      {/* Banner */}
      <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-600 relative">
        {/* Edit Button */}
        <div className="absolute top-6 right-6">
          <button
            className={`px-6 py-2 rounded-full font-medium text-sm transition-all duration-300 ${
              isEdit 
                ? "bg-green-500 text-white hover:bg-green-600 shadow-lg"
                : "bg-white text-purple-700 hover:bg-indigo-50 shadow"
            }`}
            onClick={isEdit ? updateUserProfileData : () => setIsEdit(true)}
          >
            {isEdit ? "Save Changes" : "Edit Profile"}
          </button>
        </div>
      </div>

      {/* Profile Section */}
      <div className="px-8 pt-0 pb-8">
        <div className="flex flex-col items-start space-y-4 mb-10 relative">
          {/* Profile Image - Positioned to not be covered by banner */}
          <div className="flex items-end space-x-6 relative -mt-24">
            {isEdit ? (
              <label htmlFor="image" className="group relative cursor-pointer">
                <div className="w-36 h-36 rounded-full border-4 border-white bg-white shadow-lg overflow-hidden transition-all duration-300 hover:shadow-indigo-200">
                  <img
                    className="w-full h-full object-cover"
                    src={image ? URL.createObjectURL(image) : userData.image}
                    alt="Profile"
                  />
                  <div className="absolute inset-0 bg-blue-600/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <img
                      className="w-8 h-8 invert opacity-80"
                      src={assets.upload_icon}
                      alt="Upload"
                    />
                  </div>
                </div>
                <input
                  onChange={(e) => setImage(e.target.files[0])}
                  type="file"
                  id="image"
                  className="hidden"
                />
              </label>
            ) : (
              <div className="w-36 h-36 rounded-full border-4 border-white bg-white shadow-lg overflow-hidden">
                <img
                  className="w-full h-full object-cover"
                  src={userData.image || assets.defaultProfileImage}
                  alt="Profile"
                />
              </div>
            )}
            
            {/* Name Field */}
            <div className="mt-4">
              {isEdit ? (
                <input
                  className="text-2xl md:text-3xl font-bold text-gray-800 border-b-2 border-purple-200 focus:border-purple-600 focus:outline-none px-2 py-1 bg-transparent"
                  type="text"
                  value={userData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                />
              ) : (
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800">{userData.name}</h1>
              )}
            </div>
          </div>
        </div>

        {/* Profile Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {/* Account Overview */}
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-purple-800 mb-4">
              Account Overview
            </h3>
            <ul className="space-y-4">
              <li className="flex items-center text-gray-600 py-1">
                <span className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </span>
                <span className="text-md">{userData.email}</span>
              </li>
              <li className="flex items-center text-gray-600 py-1">
                <span className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </span>
                <span className="text-md">{userData.gender || "Not specified"}</span>
              </li>
              <li className="flex items-center text-gray-600 py-1">
                <span className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </span>
                <span className="text-md">{userData.dob || "Not specified"}</span>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-purple-800 mb-4 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Contact Information
            </h3>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-blue-400">Phone Number</label>
                {isEdit ? (
                  <input
                    className="w-full text-gray-700 border-b border-purple-200 focus:border-purple-600 py-2 px-1 focus:outline-none bg-transparent"
                    type="text"
                    value={userData.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                  />
                ) : (
                  <p className="text-gray-700 font-medium">{userData.phone || "Not provided"}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-blue-400">Address</label>
                {isEdit ? (
                  <div className="space-y-3">
                    <input
                      className="w-full text-gray-700 border-b border-purple-200 focus:border-purple-600 py-2 px-1 focus:outline-none bg-transparent"
                      type="text"
                      value={userData.address?.line1 || ""}
                      onChange={(e) => handleAddressChange("line1", e.target.value)}
                      placeholder="Street address"
                    />
                    <input
                      className="w-full text-gray-700 border-b border-purple-200 focus:border-purple-600 py-2 px-1 focus:outline-none bg-transparent"
                      type="text"
                      value={userData.address?.line2 || ""}
                      onChange={(e) => handleAddressChange("line2", e.target.value)}
                      placeholder="Apartment, suite, etc."
                    />
                  </div>
                ) : (
                  <p className="text-gray-700 font-medium">
                    {[userData.address?.line1, userData.address?.line2].filter(Boolean).join(', ') || "Not provided"}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Basic Information */}
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 md:col-span-2">
            <h3 className="text-lg font-semibold text-purple-800 mb-4 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Basic Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-blue-400">Gender</label>
                {isEdit ? (
                  <select
                    className="w-full text-gray-700 border-b border-purple-200 focus:border-purple-600 py-2 px-1 focus:outline-none bg-transparent"
                    value={userData.gender}
                    onChange={(e) => handleChange("gender", e.target.value)}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                ) : (
                  <p className="text-gray-700 font-medium">{userData.gender || "Not provided"}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-blue-400">Date of Birth</label>
                {isEdit ? (
                  <input
                    className="w-full text-gray-700 border-b border-purple-200 focus:border-purple-600 py-2 px-1 focus:outline-none bg-transparent"
                    type="date"
                    value={userData.dob || ""}
                    onChange={(e) => handleChange("dob", e.target.value)}
                  />
                ) : (
                  <p className="text-gray-700 font-medium">{userData.dob || "Not provided"}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;