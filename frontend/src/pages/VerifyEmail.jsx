import React, { useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext.jsx";
import { useContext } from "react";

const VerifyEmail = () => {
  const { backendUrl } = useContext(AppContext);
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const { data } = await axios.get(`${backendUrl}/api/user/verify-email/${token}`);
        if (data.success) {
          toast.success(data.message);
          navigate("/login");
        } else {
          toast.error(data.message);
          navigate("/login");
        }
      } catch (error) {
        toast.error(error.response?.data?.message || error.message);
        navigate("/login");
      }
    };

    verifyEmail();
  }, [backendUrl, token, navigate]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-8 bg-gray-50">
      <div className="w-full max-w-md bg-white shadow-xl rounded-lg p-8 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Verifying Email</h2>
        <p className="text-gray-600">Please wait while we verify your email...</p>
      </div>
    </div>
  );
};

export default VerifyEmail;