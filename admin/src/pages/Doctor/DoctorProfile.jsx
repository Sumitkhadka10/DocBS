import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const DoctorProfile = () => {
  const { dToken, profileData, setProfileData, getProfileData, backendUrl } = useContext(DoctorContext);
  const { currency } = useContext(AppContext);

  const [isEdit, setIsEdit] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const updateProfile = async () => {
    try {
      const updateData = {
        address: profileData.address,
        fee: profileData.fee,
        available: profileData.available,
      };
      const { data } = await axios.post(
        backendUrl + "/api/doctor/update-profile",
        updateData,
        { headers: { dToken } }
      );
      if (data.success) {
        toast.success(data.message);
        setIsEdit(false);
        getProfileData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  const changePassword = async () => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/doctor/change-password",
        { currentPassword, newPassword, docId: profileData._id },
        { headers: { dToken } }
      );
      if (data.success) {
        toast.success(data.message);
        setCurrentPassword("");
        setNewPassword("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  useEffect(() => {
    if (dToken) {
      getProfileData();
    }
  }, [dToken]);

  return profileData && (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-6">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
        <div className="flex flex-col md:flex-row">
          {/* Left sidebar */}
          <div className="md:w-1/3 bg-indigo-600 text-white p-6">
            <div className="flex flex-col items-center">
              <div className="w-36 h-36 rounded-full bg-white p-1 mb-4">
                <img
                  className="w-full h-full object-cover rounded-full"
                  src={profileData.image}
                  alt={profileData.name}
                />
              </div>

              <h2 className="text-2xl font-semibold text-center text-white">
                {profileData.name}
              </h2>
              <p className="text-gray-200 text-center mb-2 text-sm">
                {profileData.degree}
              </p>
              <p className="text-gray-100 text-center font-medium mb-4 text-sm">
                {profileData.speciality}
              </p>

              <div className="flex items-center justify-center gap-2 mb-6">
                <span className="px-3 py-1 bg-indigo-600/20 rounded-full text-xs font-medium text-white">
                  {profileData.experience}
                </span>
                <span
                  className={`px-3 py-1 ${
                    profileData.available ? "bg-green-600" : "bg-red-600"
                  } rounded-full text-xs font-medium text-white`}
                >
                  {profileData.available ? "Available" : "Unavailable"}
                </span>
              </div>

              <div className="w-full pt-4 border-t border-gray-200">
                <h3 className="text-sm font-semibold uppercase tracking-wider mb-2 text-gray-100">
                  Contact Information
                </h3>
                <p className="text-sm font-medium text-gray-200">
                  {profileData.address.line1}
                </p>
                <p className="text-sm font-medium text-gray-200">
                  {profileData.address.line2}
                </p>
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="md:w-2/3 p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-semibold text-gray-900">
                Doctor Profile
              </h1>
              {isEdit ? (
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsEdit(false)}
                    className="px-4 py-2 border border-gray-200 text-gray-600 rounded hover:bg-indigo-600/20 text-sm font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={updateProfile}
                    className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-600/80 text-sm font-medium"
                  >
                    Save Changes
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsEdit(true)}
                  className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-600/80 text-sm font-medium"
                >
                  Edit Profile
                </button>
              )}
            </div>

            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                  About
                </h2>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {profileData.about}
                </p>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Professional Details
                </h2>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-semibold text-gray-600">
                        Appointment Fee
                      </h3>
                      {isEdit ? (
                        <div className="mt-1 relative w-44">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-gray-500">{currency}</span>
                          </div>
                          <input
                            type="number"
                            className="block w-full pl-8 pr-3 py-2 border border-gray-200 rounded-md text-sm focus:ring-indigo-600 focus:border-indigo-600"
                            onChange={(e) =>
                              setProfileData((prev) => ({
                                ...prev,
                                fee: e.target.value,
                              }))
                            }
                            value={profileData.fee}
                          />
                        </div>
                      ) : (
                        <p className="text-lg font-medium text-gray-900">
                          {currency} {profileData.fee}
                        </p>
                      )}
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold text-gray-600">
                        Availability Status
                      </h3>
                      <div className="flex items-center mt-2">
                        <label className="inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={profileData.available}
                            onChange={() =>
                              isEdit &&
                              setProfileData((prev) => ({
                                ...prev,
                                available: !prev.available,
                              }))
                            }
                            disabled={!isEdit}
                            aria-label="Toggle availability status"
                          />
                          <div
                            className={`relative w-14 h-7 bg-gray-300 rounded-full peer 
                            peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-indigo-600
                            peer-checked:after:translate-x-full peer-checked:after:border-white
                            after:content-[''] after:absolute after:top-0.5 after:left-0.5
                            after:bg-white after:border-gray-200 after:border after:rounded-full
                            after:h-6 after:w-6 after:transition-all dark:border-gray-600
                            ${
                              profileData.available
                                ? "peer-checked:bg-green-600"
                                : "peer-checked:bg-red-600"
                            }
                            ${!isEdit ? "opacity-70" : ""}
                            transition-colors duration-200 ease-in-out`}
                          ></div>
                          <span
                            className={`ml-3 text-sm font-medium ${
                              profileData.available
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            {profileData.available ? "Available" : "Unavailable"}
                          </span>
                        </label>
                      </div>
                      {isEdit && (
                        <p className="text-xs text-gray-500 mt-1">
                          {profileData.available
                            ? "Patients can book appointments with you"
                            : "You won't receive new appointment requests"}
                        </p>
                      )}
                    </div>
                  </div>

                  {isEdit && (
                    <div>
                      <h3 className="text-sm font-semibold text-gray-600 mb-1">
                        Address
                      </h3>
                      <div className="space-y-2">
                        <input
                          type="text"
                          className="block w-full px-3 py-2 border border-gray-200 rounded-md text-sm focus:ring-indigo-600 focus:border-indigo-600"
                          onChange={(e) =>
                            setProfileData((prev) => ({
                              ...prev,
                              address: { ...prev.address, line1: e.target.value },
                            }))
                          }
                          value={profileData.address.line1}
                          placeholder="Address Line 1"
                        />
                        <input
                          type="text"
                          className="block w-full px-3 py-2 border border-gray-200 rounded-md text-sm focus:ring-indigo-600 focus:border-indigo-600"
                          onChange={(e) =>
                            setProfileData((prev) => ({
                              ...prev,
                              address: { ...prev.address, line2: e.target.value },
                            }))
                          }
                          value={profileData.address.line2}
                          placeholder="Address Line 2"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Password Change Section */}
              {isEdit && (
                <div className="border-t border-gray-200 pt-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    Change Password
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-semibold text-gray-600 mb-1">
                        Current Password
                      </h3>
                      <input
                        type="password"
                        className="block w-full px-3 py-2 border border-gray-200 rounded-md text-sm focus:ring-indigo-600 focus:border-indigo-600"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        placeholder="Enter current password"
                      />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-gray-600 mb-1">
                        New Password
                      </h3>
                      <input
                        type="password"
                        className="block w-full px-3 py-2 border border-gray-200 rounded-md text-sm focus:ring-indigo-600 focus:border-indigo-600"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Enter new password"
                      />
                    </div>
                    <button
                      onClick={changePassword}
                      className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-600/80 text-sm font-medium"
                    >
                      Change Password
                    </button>
                  </div>
                </div>
              )}

              <div className="border-t border-gray-200 pt-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Qualifications
                </h2>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-indigo-600/10 text-gray-600 rounded-full text-sm font-medium">
                    {profileData.degree}
                  </span>
                  <span className="px-3 py-1 bg-indigo-600/10 text-gray-600 rounded-full text-sm font-medium">
                    {profileData.speciality}
                  </span>
                  <span className="px-3 py-1 bg-indigo-600/10 text-gray-600 rounded-full text-sm font-medium">
                    {profileData.experience}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;