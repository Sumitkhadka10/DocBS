import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets'; 
import { AdminContext } from '../context/AdminContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'; // Added useNavigate

const Login = () => {
  const [state, setState] = useState('Admin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { setAToken, backendUrl } = useContext(AdminContext);  
  const navigate = useNavigate(); // Initialize navigate

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (state === 'Admin') {
        const { data } = await axios.post(backendUrl + '/api/admin/login', { email, password });

        if (data.success) {
          localStorage.setItem('aToken', data.token);
          setAToken(data.token);
          toast.success('Login successful!'); // Optional: Success feedback
          navigate('/admin-dashboard'); // Redirect to root, which will go to dashboard
        } else {
          toast.error(data.message);
        }
      } else {
        // Doctor login (implement if needed)
        toast.info('Doctor login not implemented yet');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Invalid Credentials!');
      console.error('Login error:', error);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center justify-center bg-gray-50'>
      <div className='flex flex-col gap-4 p-6 sm:p-8 min-w-[320px] sm:min-w-96 border rounded-xl shadow-lg bg-white text-gray-600'>
        <p className='text-xl sm:text-2xl font-semibold text-center'>
          <span className='text-primary'>{state}</span> Login
        </p>
        <div className='w-full'>
          <p className='font-medium text-sm sm:text-base'>Email</p>
          <input
            onChange={(e) => setEmail(e.target.value)} 
            value={email}
            className='border border-gray-300 rounded w-full p-2 mt-1 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary transition duration-200' 
            type='email' 
            required 
            placeholder='Enter your email'
          />
        </div>
        <div className='w-full'>
          <p className='font-medium text-sm sm:text-base'>Password</p>
          <input
            onChange={(e) => setPassword(e.target.value)} 
            value={password}
            className='border border-gray-300 rounded w-full p-2 mt-1 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary transition duration-200' 
            type='password' 
            required 
            placeholder='Enter your password'
          />
        </div>
        <button 
          type='submit'
          className='bg-primary text-white w-full py-2 rounded-md text-base hover:bg-opacity-90 transition duration-300 shadow-sm hover:shadow-md'
        >
          Login
        </button>
        <p className='text-xs sm:text-sm text-center'>
          {state === 'Admin' ? (
            <>Doctor Login? <span className='text-primary underline cursor-pointer hover:text-opacity-80 transition duration-200' onClick={() => setState('Doctor')}>Click Here</span></>
          ) : (
            <>Admin Login? <span className='text-primary underline cursor-pointer hover:text-opacity-80 transition duration-200' onClick={() => setState('Admin')}>Click Here</span></>
          )}
        </p>
      </div>
    </form>
  );
};

export default Login;