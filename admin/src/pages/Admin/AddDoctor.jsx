import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";

const AddDoctor = () => {
  const [docImg, setDocImg] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [experience, setExperience] = useState("1 Year");
  const [fees, setFees] = useState("");
  const [about, setAbout] = useState("");
  const [speciality, setSpeciality] = useState("General physician");
  const [degree, setDegree] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { backendUrl, aToken } = useContext(AdminContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      if (!docImg) {
        toast.error("Image not selected");
        setIsLoading(false);
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        toast.error("Please enter a valid email address");
        setIsLoading(false);
        return;
      }

      const formData = new FormData();
      formData.append("image", docImg);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("experience", experience);
      formData.append("fee", fees);
      formData.append("about", about);
      formData.append("speciality", speciality);
      formData.append("degree", degree);
      formData.append(
        "address",
        JSON.stringify({ line1: address1, line2: address2 })
      );

      const { data } = await axios.post(
        `${backendUrl}/api/admin/add-doctor`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${aToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (data.success) {
        toast.success(data.message);
        setDocImg(false);
        setName("");
        setEmail("");
        setFees("");
        setAbout("");
        setDegree("");
        setAddress1("");
        setAddress2("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error adding doctor:", error);
      toast.error("Failed to add doctor");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="m-5 w-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 relative after:content-[''] after:absolute after:w-20 after:h-1 after:bg-primary after:left-0 after:bottom-[-8px]">
          Add Doctor
        </h2>
        <button
          type="submit"
          disabled={isLoading}
          className={`bg-primary hover:bg-opacity-90 transition-all px-10 py-3 text-white rounded-lg shadow-lg flex items-center gap-2 ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isLoading ? "Adding..." : "Add Doctor"}
          {!isLoading && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          )}
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="bg-gradient-to-r from-primary to-primary bg-opacity-10 p-6 border-b">
          <div className="flex items-center gap-6">
            <label htmlFor="doc-img" className="relative group">
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md">
                <img
                  className="w-full h-full object-cover"
                  src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
                  alt=""
                />
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <input
                onChange={(e) => setDocImg(e.target.files[0])}
                type="file"
                id="doc-img"
                hidden
              />
            </label>
            <div>
              <h3 className="text-lg font-semibold text-gray-700">
                Upload Doctor Photo
              </h3>
              <p className="text-sm text-gray-500">
                Select a professional photo of the doctor
              </p>
            </div>
          </div>
        </div>

        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-700 border-b pb-2">
                Personal Information
              </h3>

              <div className="relative">
                <label className="text-sm font-medium text-gray-600 block mb-1">
                  Doctor Name
                </label>
                <input
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  type="text"
                  placeholder="Enter full name"
                  required
                />
              </div>

              <div className="relative">
                <label className="text-sm font-medium text-gray-600 block mb-1">
                  Email Address
                </label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  type="email"
                  placeholder="doctor@example.com"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  A secure password will be automatically generated and sent to this email.
                </p>
              </div>

              <div className="relative">
                <label className="text-sm font-medium text-gray-600 block mb-1">
                  Experience
                </label>
                <select
                  onChange={(e) => setExperience(e.target.value)}
                  value={experience}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all appearance-none bg-white"
                >
                  {[...Array(10).keys()].map((year) => (
                    <option key={year + 1} value={`${year + 1} Year`}>
                      {year + 1} Year
                    </option>
                  ))}
                </select>
                <div className="absolute right-4 top-[38px] pointer-events-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>

              <div className="relative">
                <label className="text-sm font-medium text-gray-600 block mb-1">
                  Consultation Fee
                </label>
                <input
                  onChange={(e) => setFees(e.target.value)}
                  value={fees}
                  className="w-full border border-gray-300 rounded-lg pl-8 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  type="number"
                  placeholder="Enter consultation fee"
                  required
                />
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-700 border-b pb-2">
                Professional Details
              </h3>

              <div className="relative">
                <label className="text-sm font-medium text-gray-600 block mb-1">
                  Speciality
                </label>
                <select
                  onChange={(e) => setSpeciality(e.target.value)}
                  value={speciality}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all appearance-none bg-white"
                >
                  <option value="General physician">General physician</option>
                  <option value="Gynecologist">Gynecologist</option>
                  <option value="Dermatologist">Dermatologist</option>
                  <option value="Pediatricians">Pediatricians</option>
                  <option value="Neurologist">Neurologist</option>
                  <option value="Gastroenterologist">Gastroenterologist</option>
                </select>
                <div className="absolute right-4 top-[38px] pointer-events-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>

              <div className="relative">
                <label className="text-sm font-medium text-gray-600 block mb-1">
                  Education Qualification
                </label>
                <input
                  onChange={(e) => setDegree(e.target.value)}
                  value={degree}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  type="text"
                  placeholder="MD, MBBS, etc."
                  required
                />
              </div>

              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-600 block">
                  Doctor Address
                </label>
                <input
                  onChange={(e) => setAddress1(e.target.value)}
                  value={address1}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  type="text"
                  placeholder="Address Line 1"
                  required
                />
                <input
                  onChange={(e) => setAddress2(e.target.value)}
                  value={address2}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  type="text"
                  placeholder="Address Line 2"
                  required
                />
              </div>
            </div>
          </div>

          <div className="mt-8">
            <label className="text-sm font-medium text-gray-600 block mb-2">
              About Doctor
            </label>
            <textarea
              onChange={(e) => setAbout(e.target.value)}
              value={about}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              placeholder="Provide detailed information about the doctor's background, expertise, and approach to patient care..."
              rows={6}
              required
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default AddDoctor;