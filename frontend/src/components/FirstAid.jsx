import React, { useState, useEffect, useContext } from 'react';
import { FaPlus, FaFirstAid, FaHeartbeat, FaLungs, FaBurn, FaTint, FaBrain, FaAllergies, FaSun, FaBaby } from 'react-icons/fa';
import { AppContext } from '../context/AppContext';

const FirstAidGuide = () => {
  const { firstAidItems } = useContext(AppContext);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [activeIndex, setActiveIndex] = useState(null);

  // Guard clause for invalid firstAidItems
  if (!firstAidItems || !Array.isArray(firstAidItems)) {
    return <div>Loading...</div>;
  }

  // Group first aid items by category
  const categories = [...new Set(firstAidItems.map(item => item.category).filter(category => category))];
  const firstAidCategories = categories.reduce((acc, category) => {
    acc[category] = firstAidItems.filter(item => item.category === category);
    return acc;
  }, {});

  // Set default category
  useEffect(() => {
    if (categories.length > 0 && !selectedCategory) {
      setSelectedCategory(categories[0]);
    }
  }, [categories]);

  // Map icon strings to React components
  const iconMap = {
    FaHeartbeat: <FaHeartbeat className="text-red-500" />,
    FaLungs: <FaLungs className="text-blue-500" />,
    FaBurn: <FaBurn className="text-orange-500" />,
    FaTint: <FaTint className="text-red-500" />,
    FaBrain: <FaBrain className="text-purple-500" />,
    FaAllergies: <FaAllergies className="text-green-500" />,
    FaSun: <FaSun className="text-yellow-500" />,
    FaSunBlue: <FaSun className="text-blue-500" />,
    FaBaby: <FaBaby className="text-pink-500" />,
  };

  if (!selectedCategory) {
    return <div>No categories available</div>;
  }

  return (
    <div className="max-w-5xl mx-auto rounded-xl shadow-lg overflow-hidden">
      <header className="bg-blue-600 text-white p-6">
        <div className="flex items-center justify-center gap-3 mb-2">
          <div className="bg-white rounded-full p-2">
            <FaFirstAid className="text-blue-600 text-2xl" />
          </div>
          <h1 className="text-3xl font-bold">First Aid Made Simple</h1>
        </div>
        <p className="text-center opacity-90 font-light">Easy-to-follow emergency instructions for everyone</p>
      </header>

      <div className="flex overflow-x-auto py-4 px-4 bg-blue-600 bg-opacity-10 sticky top-0 z-10">
        {categories.map(category => (
          <button
            key={category}
            className={`whitespace-nowrap px-5 py-2 mx-1 rounded-md text-sm font-medium transition-all ${
              selectedCategory === category 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
            }`}
            onClick={() => {
              setSelectedCategory(category);
              setActiveIndex(null);
            }}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="p-6 space-y-4">
        {firstAidCategories[selectedCategory]?.map((procedure, index) => {
          const isActive = activeIndex === index;
          
          return (
            <div 
              key={procedure._id} 
              className={`rounded-lg transition-all duration-200 border ${
                isActive 
                  ? 'border-blue-600 shadow-md' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <button 
                className="w-full flex items-center p-4 gap-4 text-left" 
                onClick={() => setActiveIndex(isActive ? null : index)}
              >
                <div className="p-3 rounded-full bg-gray-50">
                  {iconMap[procedure.icon] || <FaFirstAid className="text-gray-500" />}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800">{procedure.title}</h3>
                  {procedure.note && (
                    <div className="mt-1">
                      <span className="inline-block text-red-600 text-sm font-medium">
                        ⚠️ {procedure.note}
                      </span>
                    </div>
                  )}
                </div>
                <div className={`w-7 h-7 flex items-center justify-center rounded-full ${
                  isActive 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-50 text-gray-500'
                }`}>
                  <FaPlus className={`transition-transform ${isActive ? 'rotate-45' : ''}`} />
                </div>
              </button>

              {isActive && (
                <div className="p-4 border-t border-gray-200">
                  <div className="space-y-3">
                    {procedure.steps.map((step, stepIndex) => (
                      <div key={stepIndex} className="flex items-start gap-3 p-2">
                        <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                          {stepIndex + 1}
                        </div>
                        <p className="text-gray-700 pt-0.5">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <footer className="mt-8 p-4 border-t border-gray-200 text-center text-sm text-gray-600">
        <p>❗ This is general advice. Always call emergency services first in serious situations.</p>
      </footer>
    </div>
  );
};

export default FirstAidGuide;