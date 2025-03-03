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
    <div className="max-w-3xl mx-auto p-6 space-y-8">
      {/* Profile Header */}
      <div className="flex flex-col items-center space-y-6">
        {/* Profile Image */}
        {isEdit ? (
          <label htmlFor="image" className="group relative cursor-pointer">
            <div className="w-32 h-32 rounded-full border-4 border-white bg-gray-50 shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
              <img
                className="w-full h-full object-cover"
                src={image ? URL.createObjectURL(image) : userData.image}
                alt="Profile"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
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
          <div className="w-32 h-32 rounded-full border-4 border-white bg-gray-50 shadow-lg overflow-hidden">
            <img
              className="w-full h-full object-cover"
              src={userData.image || assets.defaultProfileImage}
              alt="Profile"
            />
          </div>
        )}

        {/* Name Field */}
        <div className="w-full text-center">
          {isEdit ? (
            <input
              className="text-3xl font-bold text-gray-900 text-center border-b-2 border-gray-200 focus:border-blue-600 focus:outline-none px-4 py-1 max-w-xs bg-transparent"
              type="text"
              value={userData.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
          ) : (
            <h1 className="text-3xl font-bold text-gray-900">{userData.name}</h1>
          )}
        </div>
      </div>

      {/* Information Sections */}
      <div className="space-y-8">
        {/* Contact Information */}
        <div className="bg-white rounded-xl shadow-sm p-8 space-y-6 border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-900 pb-2 border-b border-gray-100">
            Contact Information
          </h3>
          <div className="space-y-6">
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-500">Email Address</label>
              <p className="text-gray-700">{userData.email}</p>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-500">Phone Number</label>
              {isEdit ? (
                <input
                  className="w-full text-gray-700 border-b border-gray-200 focus:border-blue-600 py-2 px-1 focus:outline-none bg-transparent"
                  type="text"
                  value={userData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                />
              ) : (
                <p className="text-gray-700">{userData.phone}</p>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-500">Address</label>
              {isEdit ? (
                <div className="space-y-3">
                  <input
                    className="w-full text-gray-700 border-b border-gray-200 focus:border-blue-600 py-2 px-1 focus:outline-none bg-transparent"
                    type="text"
                    value={userData.address?.line1 || ""}
                    onChange={(e) => handleAddressChange("line1", e.target.value)}
                    placeholder="Street address"
                  />
                  <input
                    className="w-full text-gray-700 border-b border-gray-200 focus:border-blue-600 py-2 px-1 focus:outline-none bg-transparent"
                    type="text"
                    value={userData.address?.line2 || ""}
                    onChange={(e) => handleAddressChange("line2", e.target.value)}
                    placeholder="Apartment, suite, etc."
                  />
                </div>
              ) : (
                <p className="text-gray-700">
                  {[userData.address?.line1, userData.address?.line2].filter(Boolean).join(', ')}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Basic Information */}
        <div className="bg-white rounded-xl shadow-sm p-8 space-y-6 border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-900 pb-2 border-b border-gray-100">
            Basic Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-500">Gender</label>
              {isEdit ? (
                <select
                  className="w-full text-gray-700 border-b border-gray-200 focus:border-blue-600 py-2 px-1 focus:outline-none bg-transparent"
                  value={userData.gender}
                  onChange={(e) => handleChange("gender", e.target.value)}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              ) : (
                <p className="text-gray-700">{userData.gender}</p>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-500">Date of Birth</label>
              {isEdit ? (
                <input
                  className="w-full text-gray-700 border-b border-gray-200 focus:border-blue-600 py-2 px-1 focus:outline-none bg-transparent"
                  type="date"
                  value={userData.dob || ""}
                  onChange={(e) => handleChange("dob", e.target.value)}
                />
              ) : (
                <p className="text-gray-700">{userData.dob}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="flex justify-center mt-10">
        <button
          className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
            isEdit 
              ? "bg-blue-600 text-white hover:bg-blue-700 shadow-lg"
              : "bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-50"
          }`}
          onClick={isEdit ? updateUserProfileData : () => setIsEdit(true)}
        >
          {isEdit ? "Save Changes" : "Edit Profile"}
        </button>
      </div>
    </div>
  );
};

export default MyProfile;