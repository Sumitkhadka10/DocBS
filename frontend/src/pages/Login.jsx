import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext.jsx'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { backendUrl, token, setToken } = useContext(AppContext)
  const navigate = useNavigate()

  const [isSignUp, setIsSignUp] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsLoading(true)

    try {
      if (isSignUp) {
        const { data } = await axios.post(backendUrl + '/api/user/register', { name, email, password })
        if (data.success) {
          localStorage.setItem('token', data.token)
          setToken(data.token)
          toast.success('Account created successfully!')
        } else {
          toast.error(data.message)
        }
      } else {
        const { data } = await axios.post(backendUrl + '/api/user/login', { email, password })
        if (data.success) {
          localStorage.setItem('token', data.token)
          setToken(data.token)
          toast.success('Login successful!')
        } else {
          toast.error(data.message)
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (token) {
      navigate('/')
    }
  }, [token, navigate])

  return (
    <div className="min-h-[80vh] flex flex-col md:flex-row shadow-2xl rounded-lg overflow-hidden">
      {/* Left side - decorative */}
      <div className="w-full md:w-1/2 bg-primary relative py-16 md:py-0">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -left-16 top-1/4 w-64 h-64 rounded-full bg-white opacity-10 animate-pulse"></div>
          <div className="absolute -right-32 top-3/4 w-96 h-96 rounded-full bg-white opacity-10 animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute left-1/4 bottom-1/4 w-32 h-32 rounded-full bg-white opacity-5 animate-pulse" style={{ animationDelay: '2s' }}></div>
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

      {/* Right side - form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center md:text-left">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              {isSignUp ? 'Create Account' : 'Welcome Back'}
            </h2>
            <p className="text-gray-600">
              {isSignUp 
                ? 'Fill in your details to get started' 
                : 'Enter your credentials to access your account'}
            </p>
          </div>

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

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              {isSignUp 
                ? <>Already have an account? <span onClick={() => setIsSignUp(false)} className="text-primary font-medium cursor-pointer hover:underline transition-all">Sign In</span></>
                : <>Need an account? <span onClick={() => setIsSignUp(true)} className="text-primary font-medium cursor-pointer hover:underline transition-all">Sign Up</span></>
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login;