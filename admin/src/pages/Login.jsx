import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets'; 
import { AdminContext } from '../context/AdminContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const [state, setState] = useState('Admin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { setAToken, backendUrl } = useContext(AdminContext);  

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (state === 'Admin') {
        const { data } = await axios.post(backendUrl + '/api/admin/login', { email, password });

        if (data.success) {
          localStorage.setItem('aToken', data.token);
          setAToken(data.token);
        } else {
          toast.error(data.message);
        }
      } else {
        // doctor login
      }
    } catch (error) {
      // Handle error (e.g., show a toast or log the error)
      toast.error('An error occurred');
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center justify-center'>
      <div className='flex flex-col gap-4 p-8 min-w-[340px] sm:min-w-96 border rounded-xl shadow-lg text-gray-600'>
        <p className='text-2xl font-semibold text-center'>
          <span className='text-primary'>{state}</span> Login
        </p>
        <div className='w-full'>
          <p className='font-medium'>Email</p>
          <input
            onChange={(e) => setEmail(e.target.value)} 
            value={email}
            className='border border-gray-300 rounded w-full p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-primary' 
            type='email' 
            required 
          />
        </div>
        <div className='w-full'>
          <p className='font-medium'>Password</p>
          <input
            onChange={(e) => setPassword(e.target.value)} 
            value={password}
            className='border border-gray-300 rounded w-full p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-primary' 
            type='password' 
            required 
          />
        </div>
        <button className='bg-primary text-white w-full py-2 rounded-md text-base hover:bg-opacity-90 transition duration-300'>
          Login
        </button>
        <p className='text-sm text-center'>
          {state === 'Admin' ? (
            <>Doctor Login? <span className='text-primary underline cursor-pointer' onClick={() => setState('Doctor')}>Click Here</span></>
          ) : (
            <>Admin Login? <span className='text-primary underline cursor-pointer' onClick={() => setState('Admin')}>Click Here</span></>
          )}
        </p>
      </div>
    </form>
  );
};

export default Login;
