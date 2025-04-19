import React, { useContext } from 'react';
import Header from '../components/Header';
import TopDoctors from '../components/TopDoctors';
import Banner from '../components/Banner';
import HealthTips from '../components/HealthTips';
import Blog from '../components/Blog';
import FirstAid from '../components/FirstAid';
import { AppContext } from '../context/AppContext.jsx';
import ChatBot from '../components/ChatBot.jsx';

const Home = () => {
  const { token, userData } = useContext(AppContext);

  return (
    <div className="min-h-screen">
      <Header />
      <Banner />
      <HealthTips />
      <TopDoctors />
      <Blog />
      <FirstAid />
      {token && userData && <ChatBot />}
    </div>
  );
};

export default Home;