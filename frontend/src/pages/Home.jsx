import React from 'react';
import Header from '../components/Header';
import SpecialityMenu from '../components/SpecialityMenu';
import TopDoctors from '../components/TopDoctors';
import Banner from '../components/Banner';
import HealthTips from '../components/HealthTips';
import Blog from '../components/Blog';
import FirstAid from '../components/FirstAid'

const Home = () => {
  return (
    <div>
      <Header />
      <HealthTips />
      <TopDoctors />
      <Blog />
      <FirstAid />
      <Banner />
    </div>
  );
};

export default Home;
