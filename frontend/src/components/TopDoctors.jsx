import React from 'react';
import { doctors } from '../assets/assets';

const TopDoctors = () => {
  return (
    <div className=''>
      <h1>Top Doctors to Book</h1>
      <p>Simply browse through our extensive list of trusted doctors.</p>
      <div>
        {doctors.slice(0, 10).map((item, index) => (
          <div key={index}>
            <img src={item.image} alt={item.name} />
            <div>
              <div>
                <p>Status: </p>
                <p>Available</p>
              </div>
              <p>{item.name}</p>
              <p>{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>
      <button>More</button>
    </div>
  );
};

export default TopDoctors;
