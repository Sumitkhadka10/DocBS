import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const RelatedDoctors = ({ speciality, docId }) => {
  const { doctors } = useContext(AppContext);
  const navigate = useNavigate();

  const [relDoc, setRelDoc] = useState([]);

  useEffect(() => {
    if (doctors.length > 0 && speciality) {
      const doctorsData = doctors.filter(
        (doc) => doc.speciality === speciality && doc._id !== docId
      );
      setRelDoc(doctorsData);
    }
  }, [doctors, speciality, docId]);

  return (
    <div className='flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10'>
      <h1 className='text-3xl font-medium'>Top Doctors to Book</h1>
      <p className='sm:w-1/3 text-center text-sm'>
        Simply browse through our extensive list of trusted doctors.
      </p>
      <div className='w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-5 gap-y-6 px-3 sm:px-0'>
        {relDoc.length > 0 ? (
          relDoc.slice(0, 5).map((item) => (
            <div
              onClick={() => {navigate(`/appointment/${item._id}`); scrollTo(0,0)}}
              className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:-translate-y-2 transition-all duration-500'
              key={item._id}
            >
              <img
                className='bg-blue-50'
                src={item.image || '/path/to/default/image.jpg'}
                alt={item.name || 'Doctor'}
              />
              <div className='p-4'>
                <div className='flex items-center gap-2 text-sm'>
                  <span className={`w-2 h-2 rounded-full animate-pulse ${
                    item.available ? 'bg-emerald-500' : 'bg-red-500'
                  }`}></span>
                  <span className={`${
                    item.available ? 'text-emerald-600' : 'text-red-600'
                  }`}>
                    {item.available ? 'Available Now' : 'Not Available'}
                  </span>
                </div>
                <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
                <p className='text-gray-600 text-sm'>{item.speciality}</p>
              </div>
            </div>
          ))
        ) : (
          <p className='text-gray-600'>No doctors available at the moment.</p>
        )}
      </div>
      <button
        onClick={() => {
          navigate('/doctors');
          window.scrollTo(0, 0);
        }}
        className='bg-blue-50 text-gray-600 px-12 py-3 rounded-full mt-10'
      >
        More
      </button>
    </div>
  );
};

export default RelatedDoctors;