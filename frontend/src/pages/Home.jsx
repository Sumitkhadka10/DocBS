import React, { useContext } from 'react';
import Header from '../components/Header';
import TopDoctors from '../components/TopDoctors';
import Banner from '../components/Banner';
import HealthTips from '../components/HealthTips';
import Blog from '../components/Blog';
import FirstAid from '../components/FirstAid';
import ChatbotButton from '../components/ChatbotButton';
import { AppContext } from '../context/AppContext.jsx';

const Home = () => {
  const { token, userData } = useContext(AppContext);

  return (
    <div>
      <Header />
      <HealthTips />
      <TopDoctors />
      <Blog />
      <FirstAid />
      <Banner />
      {token && userData && <ChatbotButton />}
    </div>
  );
};

export default Home;