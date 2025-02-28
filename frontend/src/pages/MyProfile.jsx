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

  if (!userData) return null;

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

  return (
    userData && (
      <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6 transition-all">
        {isEdit ? (
          <label htmlFor="image">
            <div className="relative cursor-pointer flex justify-center">
              <img
                className="w-36 h-36 rounded-full border-4 border-blue-500 object-cover"
                src={image ? URL.createObjectURL(image) : userData.image}
                alt="Profile"
              />
              {!image && (
                <img
                  className="w-10 absolute bottom-2 right-2 opacity-80"
                  src={assets.upload_icon}
                  alt="Upload"
                />
              )}
            </div>
            <input
              onChange={(e) => setImage(e.target.files[0])}
              type="file"
              id="image"
              hidden
            />
          </label>
        ) : (
          <img
            className="w-36 h-36 rounded-full border-4 border-blue-500 object-cover mx-auto"
            src={userData.image || assets.defaultProfileImage}
            alt="Profile"
          />
        )}

        <div className="text-center mt-4">
          {isEdit ? (
            <input
              className="bg-gray-100 text-xl font-semibold text-center border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500"
              type="text"
              value={userData.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
          ) : (
            <p className="text-2xl font-semibold text-gray-800">
              {userData.name}
            </p>
          )}
        </div>

        <hr className="my-4 border-gray-300" />

        <div className="text-gray-600">
          <p className="text-lg font-semibold">Contact Information</p>
          <div className="mt-3 space-y-2">
            <p className="font-medium">Email:</p>
            <p className="text-blue-500">{userData.email}</p>

            <p className="font-medium">Phone:</p>
            {isEdit ? (
              <input
                className="bg-gray-100 border border-gray-300 rounded-md px-3 py-2 w-full focus:ring-2 focus:ring-blue-500"
                type="text"
                value={userData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
              />
            ) : (
              <p className="text-blue-400">{userData.phone}</p>
            )}

            <p className="font-medium">Address:</p>
            {isEdit ? (
              <>
                <input
                  className="bg-gray-100 border border-gray-300 rounded-md px-3 py-2 w-full mb-2 focus:ring-2 focus:ring-blue-500"
                  type="text"
                  value={userData.address?.line1 || ""}
                  onChange={(e) => handleAddressChange("line1", e.target.value)}
                />
                <input
                  className="bg-gray-100 border border-gray-300 rounded-md px-3 py-2 w-full focus:ring-2 focus:ring-blue-500"
                  type="text"
                  value={userData.address?.line2 || ""}
                  onChange={(e) => handleAddressChange("line2", e.target.value)}
                />
              </>
            ) : (
              <p className="text-gray-500">
                {userData.address?.line1}
                <br />
                {userData.address?.line2}
              </p>
            )}
          </div>
        </div>

        <div className="text-gray-600 mt-5">
          <p className="text-lg font-semibold">Basic Information</p>
          <div className="mt-3 space-y-2">
            <p className="font-medium">Gender:</p>
            {isEdit ? (
              <select
                className="bg-gray-100 border border-gray-300 rounded-md px-3 py-2 w-full focus:ring-2 focus:ring-blue-500"
                value={userData.gender}
                onChange={(e) => handleChange("gender", e.target.value)}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            ) : (
              <p className="text-gray-400">{userData.gender}</p>
            )}

            <p className="font-medium">BirthDate:</p>
            {isEdit ? (
              <input
                className="bg-gray-100 border border-gray-300 rounded-md px-3 py-2 w-full focus:ring-2 focus:ring-blue-500"
                type="date"
                value={userData.dob || ""}
                onChange={(e) => handleChange("dob", e.target.value)}
              />
            ) : (
              <p className="text-gray-400">{userData.dob}</p>
            )}
          </div>
        </div>

        <div className="mt-8 text-center">
          {isEdit ? (
            <button
              className="border-2 border-blue-500 text-blue-500 px-6 py-2 rounded-full hover:bg-blue-500 hover:text-white transition-all"
              onClick={updateUserProfileData}
            >
              Save Information
            </button>
          ) : (
            <button
              className="border-2 border-blue-500 text-blue-500 px-6 py-2 rounded-full hover:bg-blue-500 hover:text-white transition-all"
              onClick={() => setIsEdit(true)}
            >
              Edit
            </button>
          )}
        </div>
      </div>
    )
  );
};

export default MyProfile;
