import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext.jsx";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

const Login = () => {
  const { backendUrl, token, setToken } = useContext(AppContext);
  const navigate = useNavigate();

  const [isSignUp, setIsSignUp] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      if (isSignUp) {
        const { data } = await axios.post(backendUrl + "/api/user/register", {
          name,
          email,
          password,
        });
        if (data.success) {
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + "/api/user/login", {
          email,
          password,
        });
        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
          toast.success("Login successful!");
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const { data } = await axios.post(backendUrl + "/api/user/forgot-password", { email });
      if (data.success) {
        toast.success(data.message);
        setShowForgotPassword(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSuccess = async (response) => {
    setIsLoading(true);
    try {
      const { data } = await axios.post(backendUrl + "/api/user/google-login", {
        token: response.credential,
      });
      if (data.success) {
        localStorage.setItem("token", data.token);
        setToken(data.token);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleFailure = (error) => {
    toast.error("Google login failed");
    console.error(error);
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}> {/* Updated line */}
      <div className="min-h-[80vh] flex flex-col md:flex-row shadow-2xl rounded-lg overflow-hidden">
        <div className="w-full md:w-1/2 bg-primary relative py-16 md:py-0">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -left-16 top-1/4 w-64 h-64 rounded-full bg-white opacity-10 animate-pulse"></div>
            <div className="absolute -right-32 top-3/4 w-96 h-96 rounded-full bg-white opacity-10 animate-pulse" style={{ animationDelay: "1s" }}></div>
            <div className="absolute left-1/4 bottom-1/4 w-32 h-32 rounded-full bg-white opacity-5 animate-pulse" style={{ animationDelay: "2s" }}></div>
          </div>
          <div className="relative flex items-center justify-center text-white h-full p-12">
            <div className="text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Doctor Booking System</h1>
              <p className="text-lg opacity-80 max-w-md">
                Easily manage your appointments and connect with healthcare professionals.
              </p>
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-white">
          <div className="w-full max-w-md">
            <div className="mb-8 text-center md:text-left">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                {isSignUp ? "Create Account" : showForgotPassword ? "Forgot Password" : "Welcome Back"}
              </h2>
              <p className="text-gray-600">
                {isSignUp
                  ? "Fill in your details to get started"
                  : showForgotPassword
                  ? "Enter your email to reset your password"
                  : "Enter your credentials to access your account"}
              </p>
            </div>

            {showForgotPassword ? (
              <form onSubmit={handleForgotPassword} className="space-y-5">
                <div className="group">
                  <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      id="email"
                      className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg focus:bg-white focus:border-primary focus:outline-none transition-colors"
                      type="email"
                      placeholder="you@doctorbooking.com"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
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
                  Send Reset Link
                </button>

                <div className="mt-8 text-center">
                  <p className="text-gray-600">
                    Back to{" "}
                    <span
                      onClick={() => setShowForgotPassword(false)}
                      className="text-primary font-medium cursor-pointer hover:underline transition-all"
                    >
                      Sign In
                    </span>
                  </p>
                </div>
              </form>
            ) : (
              <>
                <form onSubmit={handleSubmit} className="space-y-5">
                  {isSignUp && (
                    <div className="group">
                      <label className="block text-gray-700 font-medium mb-2" htmlFor="name">
                        Full Name
                      </label>
                      <div className="relative">
                        <input
                          id="name"
                          className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg focus:bg-white focus:border-primary focus:outline-none transition-colors"
                          type="text"
                          placeholder="Enter Your Full Name"
                          onChange={(e) => setName(e.target.value)}
                          value={name}
                          required
                        />
                      </div>
                    </div>
                  )}

                  <div className="group">
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
                      Email Address
                    </label>
                    <div className="relative">
                      <input
                        id="email"
                        className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg focus:bg-white focus:border-primary focus:outline-none transition-colors"
                        type="email"
                        placeholder="you@doctorbooking.com"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        required
                      />
                    </div>
                  </div>

                  <div className="group">
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="password">
                      Password
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

                  {!isSignUp && (
                    <div className="text-right">
                      <span
                        onClick={() => setShowForgotPassword(true)}
                        className="text-primary font-medium cursor-pointer hover:underline transition-all"
                      >
                        Forgot Password?
                      </span>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full bg-primary text-white font-semibold rounded-lg py-3.5 px-4 mt-4 focus:outline-none hover:bg-primary/90 transition-colors flex items-center justify-center"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                    ) : null}
                    {isSignUp ? "Create Account" : "Sign In"}
                  </button>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-gray-600 mb-4">Or continue with</p>
                  <GoogleLogin
                    onSuccess={handleGoogleSuccess}
                    onError={handleGoogleFailure}
                    render={(renderProps) => (
                      <button
                        onClick={renderProps.onClick}
                        disabled={renderProps.disabled || isLoading}
                        className="w-full bg-white text-gray-700 font-semibold rounded-lg py-3.5 px-4 border-2 border-gray-200 hover:bg-gray-100 transition-colors flex items-center justify-center"
                      >
                        {isLoading ? (
                          <span className="inline-block w-5 h-5 border-2 border-gray-500 border-t-transparent rounded-full animate-spin mr-2"></span>
                        ) : (
                          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                            <path
                              fill="#4285F4"
                              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            />
                            <path
                              fill="#34A853"
                              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-1.04.69-2.36 1.09-3.71 1.09-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C4.01 20.07 7.77 23 12 23z"
                            />
                            <path
                              fill="#FBBC05"
                              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.66-2.84z"
                            />
                            <path
                              fill="#EA4335"
                              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.77 1 4.01 3.93 2.18 7.07L5.84 9.91c.87-2.6 3.3-4.53 6.16-4.53z"
                            />
                          </svg>
                        )}
                        Continue with Google
                      </button>
                    )}
                  />
                </div>
              </>
            )}

            {!showForgotPassword && (
              <div className="mt-8 text-center">
                <p className="text-gray-600">
                  {isSignUp ? (
                    <>
                      Already have an account?{" "}
                      <span
                        onClick={() => setIsSignUp(false)}
                        className="text-primary font-medium cursor-pointer hover:underline transition-all"
                      >
                        Sign In
                      </span>
                    </>
                  ) : (
                    <>
                      Need an account?{" "}
                      <span
                        onClick={() => setIsSignUp(true)}
                        className="text-primary font-medium cursor-pointer hover:underline transition-all"
                      >
                        Sign Up
                      </span>
                    </>
                  )}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Login;