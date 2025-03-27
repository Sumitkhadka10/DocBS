import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext.jsx";
import { useContext } from "react";

const ResetPassword = () => {
  const { backendUrl } = useContext(AppContext);
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const { data } = await axios.post(`${backendUrl}/api/user/reset-password/${token}`, {
        password,
      });
      if (data.success) {
        toast.success(data.message);
        navigate("/login");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-8 bg-gray-50">
      <div className="w-full max-w-md bg-white shadow-xl rounded-lg p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">Reset Password</h2>
        <p className="text-gray-600 text-center mb-8">Enter your new password below</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="group">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="password">
              New Password
            </label>
            <div className="relative">
              <input
                id="password"
                className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg focus:bg-white focus:border-primary focus:outline-none transition-colors"
                type="password"
                placeholder="••••••••"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white font-semibold rounded-lg py-3.5 px-4 mt-4 focus:outline-none hover:bg-primary/90 transition-colors flex items-center justify-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
            ) : null}
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;