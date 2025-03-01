import React, { useState } from 'react';

const HealthTips = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const tips = [
    {
      icon: '🥗',
      title: 'Nutrition Guide',
      points: ['Personalized meal plans', 'Vitamin tracking', 'Diet management']
    },
    {
      icon: '🏃',
      title: 'Active Living',
      points: ['Custom workouts', 'Injury prevention', 'Mind-body balance']
    },
    {
      icon: '💤',
      title: 'Sleep Wellness',
      points: ['Sleep analysis', 'Relaxation techniques', 'Environment setup']
    },
    {
      icon: '🩺',
      title: 'Preventive Care',
      points: ['Health screenings', 'Vaccination schedule', 'Checkup reminders']
    },
    {
      icon: '🧠',
      title: 'Mental Health',
      points: ['Stress management', 'Meditation guides', 'Cognitive exercises']
    },
    {
      icon: '💧',
      title: 'Hydration',
      points: ['Water intake tracking', 'Optimal hydration times', 'Infusion recipes']
    },
    {
      icon: '🚴',
      title: 'Cardio Care',
      points: ['Heart health tips', 'Exercise plans', 'BP monitoring']
    },
    {
      icon: '🧘',
      title: 'Stress Relief',
      points: ['Breathing techniques', 'Yoga sequences', 'Mindfulness practices']
    }
  ];

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % tips.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + tips.length) % tips.length);
  };

  return (
    <div className="relative w-full bg-white overflow-hidden py-20">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary to-accent-500 bg-clip-text text-transparent">
              Health & Wellness
            </span>
            <br />
            <span className="text-gray-800">Essentials</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover personalized health strategies for better living
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative overflow-hidden">
          {/* Tips Track */}
          <div 
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${activeIndex * 25}%)` }}
          >
            {tips.map((tip, index) => (
              <div 
                key={index}
                className="w-full flex-shrink-0 p-4 lg:w-1/4 md:w-1/2"
              >
                <div className="group relative bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-primary/20">
                  <div className="mb-4">
                    <div className="text-4xl mb-3 transform group-hover:-translate-y-2 transition-transform">
                      {tip.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      {tip.title}
                    </h3>
                  </div>
                  
                  <ul className="space-y-2.5">
                    {tip.points.map((point, i) => (
                      <li 
                        key={i}
                        className="flex items-start text-gray-600 text-sm"
                      >
                        <svg 
                          className="w-4 h-4 text-primary mt-0.5 mr-2" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth="2" 
                            d="M5 13l4 4L19 7" 
                          />
                        </svg>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center justify-center mt-12 gap-4">
          <button 
            onClick={prevSlide}
            className="p-2 rounded-full bg-primary text-white hover:bg-primary/90 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <div className="flex space-x-2">
            {tips.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === activeIndex ? 'bg-primary' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          <button 
            onClick={nextSlide}
            className="p-2 rounded-full bg-primary text-white hover:bg-primary/90 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HealthTips;