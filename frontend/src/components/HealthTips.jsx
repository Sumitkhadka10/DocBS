import React, { useState, useEffect, useContext } from "react";
import { AppContext } from '../context/AppContext';

const LuxuryHealthExperience = () => {
  const { healthTips } = useContext(AppContext);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Define how many items to show at each breakpoint
  const visibleItems = {
    desktop: 4, // Show 4 items on desktop (lg and above)
    tablet: 2,  // Show 2 items on tablet (sm to md)
    mobile: 1,  // Show 1 item on mobile (below sm)
  };

  // Function to determine the number of visible items based on screen size
  const getVisibleCount = () => {
    if (window.innerWidth >= 1024) return visibleItems.desktop; // lg: 1024px and above
    if (window.innerWidth >= 640) return visibleItems.tablet;   // sm: 640px to md
    return visibleItems.mobile;                                  // below sm
  };

  const [visibleCount, setVisibleCount] = useState(getVisibleCount());

  // Update visible count on window resize
  useEffect(() => {
    const handleResize = () => {
      setVisibleCount(getVisibleCount());
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextSlide = () => {
    setActiveIndex((prev) => {
      const newIndex = (prev + 1) % healthTips.length; // Increment by 1 to cycle through all categories
      return newIndex;
    });
  };

  const prevSlide = () => {
    setActiveIndex((prev) => {
      const newIndex = (prev - 1 + healthTips.length) % healthTips.length; // Decrement by 1
      return newIndex;
    });
  };

  const getVisibleIndices = () => {
    const indices = [];
    for (let i = 0; i < visibleCount; i++) {
      const index = (activeIndex + i) % healthTips.length;
      indices.push(index);
    }
    return indices;
  };

  const visibleIndices = getVisibleIndices();

  if (healthTips.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 py-16 px-4 overflow-hidden">
      <div className={`max-w-7xl mx-auto transition-all duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0 transform translate-y-10'}`}>
        <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-r from-purple-500/10 to-indigo-500/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 right-0 w-40 h-40 bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-full blur-3xl"></div>

        <div className="text-center mb-16 relative">
          <span className="inline-block px-4 py-1 text-xs font-semibold tracking-wider text-indigo-600 uppercase bg-indigo-100 rounded-full mb-3 backdrop-blur-sm">
            Doctor Booking System
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 relative">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-700">Health & Wellness</span>
            <span className="text-gray-800"> Excellence</span>
            <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 h-1 w-24 bg-gradient-to-r from-indigo-600 to-violet-700 rounded-full"></div>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mt-6">
            Advanced health strategies personalized to your unique wellness profile
          </p>
        </div>

        {/* Desktop and Tablet View (sm and above) */}
        <div className="hidden sm:block relative">
          <div className="flex justify-between mb-8">
            <h3 className="text-2xl font-bold text-gray-800 relative group cursor-default">
              <span className={`text-transparent bg-clip-text bg-gradient-to-r ${healthTips[activeIndex].colorClass || 'from-blue-500 to-indigo-600'}`}>
                {healthTips[activeIndex].title}
              </span>
              <span className={`absolute -bottom-2 left-0 h-0.5 w-0 bg-gradient-to-r ${healthTips[activeIndex].colorClass || 'from-blue-500 to-indigo-600'} group-hover:w-full transition-all duration-500`}></span>
            </h3>
            <div className="flex items-center gap-4">
              <button 
                onClick={prevSlide} 
                className="p-2.5 rounded-full bg-white shadow hover:shadow-lg transition-all duration-300 hover:scale-110 active:scale-95"
                aria-label="Previous"
              >
                <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button 
                onClick={nextSlide} 
                className="p-2.5 rounded-full bg-white shadow hover:shadow-lg transition-all duration-300 hover:scale-110 active:scale-95"
                aria-label="Next"
              >
                <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {visibleIndices.map((index) => (
              <div 
                key={healthTips[index]._id} 
                className={`transition-all duration-500 ${hoveredIndex === index ? 'transform scale-105 z-10' : 'transform scale-100 z-0'}`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="bg-white rounded-xl overflow-hidden h-full group relative shadow-md hover:shadow-xl transition-all duration-500 border border-gray-100">
                  <div className={`absolute inset-0 bg-gradient-to-r ${healthTips[index].colorClass || 'from-blue-500 to-indigo-600'} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                  <div className={`p-4 bg-gradient-to-r ${healthTips[index].colorClass || 'from-blue-500 to-indigo-600'}`}>
                    <div className="flex justify-between items-center">
                      <div className="w-12 h-12 rounded-full bg-white/25 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                        <span className="text-2xl">{healthTips[index].icon || '🩺'}</span>
                      </div>
                      <span className="text-white/70 text-sm font-medium px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm">
                        Module {index + 1}
                      </span>
                    </div>
                  </div>
                  <div className="p-6 relative overflow-hidden">
                    <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r transition-all duration-500" style={{ backgroundImage: hoveredIndex === index ? `linear-gradient(to right, ${getComputedGradient(healthTips[index].colorClass || 'from-blue-500 to-indigo-600')})` : 'none' }}>
                      {healthTips[index].title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 group-hover:text-gray-800 transition-colors duration-500">
                      {healthTips[index].description}
                    </p>
                    <ul className="space-y-3 relative z-10">
                      {healthTips[index].points.map((point, i) => (
                        <li key={i} className="flex items-start group/item">
                          <svg className="w-5 h-5 mt-0.5 mr-2.5 flex-shrink-0 transition-transform duration-300 group-hover/item:scale-110" style={{ color: getComputedGradient(healthTips[index].colorClass || 'from-blue-500 to-indigo-600').split(', ')[0] }} viewBox="0 0 20 20" fill="none" stroke="currentColor">
                            <circle cx="10" cy="10" r="8" strokeWidth="2" />
                            <path d="M7 10l2 2l4-4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          <span className="text-gray-700 text-sm group-hover/item:text-gray-900 transition-colors duration-300">
                            {point}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <div className="absolute -bottom-2 -right-2 w-12 h-12 rounded-full bg-gradient-to-r from-transparent to-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-gray-200 h-1.5 rounded-full overflow-hidden w-full backdrop-blur-sm">
            <div 
              className={`h-full bg-gradient-to-r ${healthTips[activeIndex].colorClass || 'from-blue-500 to-indigo-600'} transition-all duration-700 ease-in-out`} 
              style={{ width: `${((activeIndex + 1) / healthTips.length) * 100}%` }} 
            />
          </div>
        </div>

        {/* Mobile View (below sm) */}
        <div className="sm:hidden">
          <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100 transform transition-transform duration-500">
            <div className={`p-4 bg-gradient-to-r ${healthTips[activeIndex].colorClass || 'from-blue-500 to-indigo-600'}`}>
              <div className="flex justify-between items-center">
                <div className="w-12 h-12 rounded-full bg-white/25 backdrop-blur-sm flex items-center justify-center">
                  <span className="text-2xl">{healthTips[activeIndex].icon || '🩺'}</span>
                </div>
                <span className="text-white/70 text-sm font-medium px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm">
                  Module {activeIndex + 1}
                </span>
              </div>
            </div>
            <div className="p-6 relative">
              <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r mb-2" style={{ backgroundImage: `linear-gradient(to right, ${getComputedGradient(healthTips[activeIndex].colorClass || 'from-blue-500 to-indigo-600')})` }}>
                {healthTips[activeIndex].title}
              </h3>
              <p className="text-gray-600 text-sm mb-4">{healthTips[activeIndex].description}</p>
              <ul className="space-y-3">
                {healthTips[activeIndex].points.map((point, i) => (
                  <li key={i} className="flex items-start">
                    <svg className="w-5 h-5 mt-0.5 mr-2.5 flex-shrink-0" style={{ color: getComputedGradient(healthTips[activeIndex].colorClass || 'from-blue-500 to-indigo-600').split(', ')[0] }} viewBox="0 0 20 20" fill="none" stroke="currentColor">
                      <circle cx="10" cy="10" r="8" strokeWidth="2" />
                      <path d="M7 10l2 2l4-4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="text-gray-700 text-sm">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex items-center justify-between mt-6">
            <button 
              onClick={prevSlide} 
              className="p-2.5 rounded-full bg-white shadow-md hover:shadow-lg active:scale-95 transition-all duration-300"
            >
              <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <div className="flex space-x-1.5">
              {healthTips.map((tip, index) => (
                <div
                  key={index}
                  className={`transition-all duration-500 cursor-pointer ${
                    activeIndex === index 
                      ? `w-6 h-1.5 bg-gradient-to-r ${tip.colorClass || 'from-blue-500 to-indigo-600'} rounded-full` 
                      : "w-1.5 h-1.5 bg-gray-300 rounded-full"
                  }`}
                  onClick={() => setActiveIndex(index)}
                />
              ))}
            </div>

            <button 
              onClick={nextSlide} 
              className="p-2.5 rounded-full bg-white shadow-md hover:shadow-lg active:scale-95 transition-all duration-300"
            >
              <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

function getComputedGradient(gradientClass) {
  const colorMap = {
    'blue-500': '#3b82f6',
    'indigo-600': '#4f46e5',
    'emerald-500': '#10b981',
    'teal-600': '#0d9488',
    'purple-500': '#a855f7',
    'violet-600': '#7c3aed',
    'amber-500': '#f59e0b',
    'orange-600': '#ea580c',
    'rose-500': '#f43f5e',
    'pink-600': '#db2777',
    'cyan-500': '#06b6d4',
    'red-500': '#ef4444'
  };

  const colors = gradientClass.split(' ').filter(cls => cls !== 'from-' && cls !== 'to-');
  const fromColor = colorMap[colors[0]?.replace('from-', '')] || '#3b82f6';
  const toColor = colorMap[colors[1]?.replace('to-', '')] || '#4f46e5';

  return `${fromColor}, ${toColor}`;
}

export default LuxuryHealthExperience;