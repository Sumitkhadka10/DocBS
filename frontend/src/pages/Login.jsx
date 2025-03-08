import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext.jsx'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { backendUrl, token, setToken } = useContext(AppContext)
  const navigate = useNavigate()

  const [state, setState] = useState('Sign Up')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  const onSubmitHandler = async (event) => {
    event.preventDefault()

    try {
      if (state === 'Sign Up') {
        const { data } = await axios.post(backendUrl + '/api/user/register', { name, email, password })
        if (data.success) {
          localStorage.setItem('token', data.token)
          setToken(data.token)
        } else {
          toast.error(data.message)
        }
      } else {
        const { data } = await axios.post(backendUrl + '/api/user/login', { email, password })
        if (data.success) {
          localStorage.setItem('token', data.token)
          setToken(data.token)
        } else {
          toast.error(data.message)
        }
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (token) {
      navigate('/')
    }
  }, [token])

  return (
    <div className="min-h-[80vh] flex">
      {/* Left side - decorative */}
      <div className="hidden md:block md:w-1/2 bg-primary relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -left-16 top-1/4 w-64 h-64 rounded-full bg-white opacity-10"></div>
          <div className="absolute -right-32 top-3/4 w-96 h-96 rounded-full bg-white opacity-10"></div>
          <div className="absolute left-1/4 bottom-1/4 w-32 h-32 rounded-full bg-white opacity-5"></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center text-white p-12">
          <div>
            <h1 className="text-4xl font-bold mb-6">Welcome to Doctor Booking System</h1>
            <p className="text-lg opacity-80 max-w-md">
              Easily manage your appointments and schedule with our intuitive platform.
            </p>
          </div>
        </div>
      </div>

      {/* Right side - form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              {state === 'Sign Up' ? 'Create Account' : 'Welcome Back'}
            </h2>
            <p className="text-gray-600">
              {state === 'Sign Up' 
                ? 'Fill in your details to get started' 
                : 'Enter your credentials to access your account'}
            </p>
          </div>

          <form onSubmit={onSubmitHandler} className="space-y-6">
            {state === "Sign Up" && (
              <div>
                <label className="block text-gray-700 font-medium mb-1" htmlFor="name">
                  Full Name
                </label>
                <input 
                  id="name"
                  className="w-full px-4 py-3 bg-gray-100 border-2 border-gray-100 rounded-lg focus:bg-white focus:border-primary focus:outline-none transition-colors" 
                  type="text" 
                  placeholder="Enter Your Full Name"
                  onChange={(e) => setName(e.target.value)} 
                  value={name} 
                  required
                />
              </div>
            )}

            <div>
              <label className="block text-gray-700 font-medium mb-1" htmlFor="email">
                Email Address
              </label>
              <input 
                id="email"
                className="w-full px-4 py-3 bg-gray-100 border-2 border-gray-100 rounded-lg focus:bg-white focus:border-primary focus:outline-none transition-colors" 
                type="email" 
                placeholder="your@email.com"
                onChange={(e) => setEmail(e.target.value)} 
                value={email} 
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1" htmlFor="password">
                Password
              </label>
              <input 
                id="password"
                className="w-full px-4 py-3 bg-gray-100 border-2 border-gray-100 rounded-lg focus:bg-white focus:border-primary focus:outline-none transition-colors" 
                type="password" 
                placeholder="••••••••"
                onChange={(e) => setPassword(e.target.value)} 
                value={password} 
                required
              />
            </div>

            <button 
              type="submit" 
              className="w-full bg-primary text-white font-medium rounded-lg py-3 px-4 mt-2 focus:outline-none"
            >
              {state === 'Sign Up' ? "Create Account" : "Login"}
            </button>
          </form>

          <div className="mt-8 text-center">
            {state === 'Sign Up' 
              ? <p className="text-gray-600">Already have an account? <span onClick={() => setState('Login')} className="text-primary font-medium cursor-pointer">Login</span></p>
              : <p className="text-gray-600">Need an account? <span onClick={() => setState('Sign Up')} className="text-primary font-medium cursor-pointer">Sign up</span></p>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login;