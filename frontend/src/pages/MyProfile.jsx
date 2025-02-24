import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";

const MyProfile = () => {
  const { userData, setUserData } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);

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

  return (
    <div className="max-w-lg flex flex-col gap-4 text-sm">
      <img className="w-36 rounded" src={userData.image} alt="Profile" />

      {isEdit ? (
        <input
          className="bg-gray-50 text-3xl font-medium max-w-60 mt-4"
          type="text"
          value={userData.name}
          onChange={(e) => handleChange("name", e.target.value)}
        />
      ) : (
        <p className="text-3xl font-medium text-neutral-800 mt-4">
          {userData.name}
        </p>
      )}

      <hr className="bg-zinc-400 h-[1px] border-none" />

      <div>
        <p className="text-neutral-500">Contact Information</p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
          <p className="font-medium">Email id:</p>
          <p className="text-blue-500">{userData.email}</p>

          <p className="font-medium">Phone Number:</p>
          {isEdit ? (
            <input
              className="bg-gray-100 max-w-52"
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
                className="bg-gray-50 mb-2"
                type="text"
                value={userData.address?.line1 || ""}
                onChange={(e) => handleAddressChange("line1", e.target.value)}
              />
              <input
                className="bg-gray-50"
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

      <div>
        <p className="text-neutral-500 underline mt-3">Basic Information</p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
          <p className="font-medium">Gender:</p>
          {isEdit ? (
            <select
              className="max-w-20 bg-gray-100"
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
              className="max-w-28 bg-gray-100"
              type="date"
              value={userData.dob}
              onChange={(e) => handleChange("dob", e.target.value)}
            />
          ) : (
            <p className="text-gray-400">{userData.dob}</p>
          )}
        </div>
      </div>

      <div className="mt-10">
        <button
          className="border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all"
          onClick={() => setIsEdit(!isEdit)}
        >
          {isEdit ? "Save Information" : "Edit"}
        </button>
      </div>
    </div>
  );
};

export default MyProfile;
