import React, { useState } from 'react';
import { FaHeartbeat, FaLungs, FaBurn, FaTint, FaBrain, FaAllergies, FaPlus, FaFirstAid, FaBaby, FaSun } from 'react-icons/fa';

const firstAidCategories = {
  'Critical Emergencies': [
    { icon: <FaHeartbeat className="text-red-500" />, title: 'Heart Attack', steps: ['Call emergency number', 'Help person sit down', 'Give aspirin (chew 1 adult tablet)', 'Loosen tight clothing', 'Be ready to do CPR'], note: 'Time is critical - act fast!' },
    { icon: <FaLungs className="text-blue-500" />, title: 'Choking', steps: ['Ask "Can you cough or speak?"', 'Give 5 hard back blows', 'Do 5 quick Heimlich thrusts', 'Repeat until object comes out', 'Start CPR if person faints'], note: 'Never slap back if coughing' }
  ],
  'Trauma Care': [
    { icon: <FaBurn className="text-orange-500" />, title: 'Burns', steps: ['Cool under running water (20 min)', 'Remove jewelry', 'Cover with clean cloth', "Don't pop blisters", 'Seek medical help for severe burns'], note: 'Never use ice' },
    { icon: <FaTint className="text-red-500" />, title: 'Heavy Bleeding', steps: ['Press hard with clean cloth', 'Keep pressing - add more cloth if needed', 'Raise injured part', 'Maintain pressure until help arrives', 'Tie a tight band as last resort'], note: "Don't remove stuck objects" }
  ],
  'Medical Crises': [
    { icon: <FaBrain className="text-purple-500" />, title: 'Stroke', steps: ['FAST: Face drooping?', 'Arm weakness?', 'Speech trouble?', 'Time to call emergency', 'Note symptom start time'], note: 'Act fast!' },
    { icon: <FaAllergies className="text-green-500" />, title: 'Severe Allergy', steps: ['Use epi-pen (thigh)', 'Call emergency', 'Lay person flat, raise legs', 'Stay until help arrives', 'Give second epi-pen if needed'], note: 'Hospital check needed even if better' }
  ],
  'Environmental Injuries': [
    { icon: <FaSun className="text-yellow-500" />, title: 'Heat Stroke', steps: ['Move to cool place', 'Remove clothing', 'Cool with wet cloths', 'Give sips of water', 'Fan while waiting for help'], note: 'Hot, dry skin is dangerous!' },
    { icon: <FaSun className="text-blue-500" />, title: 'Hypothermia', steps: ['Move to warm place', 'Remove wet clothes', 'Warm with blankets', 'Give warm drinks', "Don't rub skin"], note: 'Warm slowly' }
  ],
  'Kids & Babies': [
    { icon: <FaBaby className="text-pink-500" />, title: 'Child CPR', steps: ['Check response', 'Give 30 chest pushes', 'Give 2 gentle breaths', 'Repeat until help arrives', 'Start CPR before calling emergency'], note: 'Push 1/3 deep' },
    { icon: <FaLungs className="text-blue-500" />, title: 'Baby Choking', steps: ['Lay baby face down', 'Give 5 back slaps', 'Turn over, give 5 chest thrusts', 'Repeat until object comes out', "Don't finger sweep"], note: 'Start CPR if baby stops breathing' }
  ]
};

const FirstAidGuide = () => {
  const [selectedCategory, setSelectedCategory] = useState(Object.keys(firstAidCategories)[0]);
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <div className="max-w-5xl mx-auto rounded-xl shadow-lg overflow-hidden">
      <header className="bg-primary text-white p-6">
        <div className="flex items-center justify-center gap-3 mb-2">
          <div className="bg-white rounded-full p-2">
            <FaFirstAid className="text-primary text-2xl" />
          </div>
          <h1 className="text-3xl font-bold">First Aid Made Simple</h1>
        </div>
        <p className="text-center opacity-90 font-light">Easy-to-follow emergency instructions for everyone</p>
      </header>

      <div className="flex overflow-x-auto py-4 px-4 bg-primary bg-opacity-10 sticky top-0 z-10">
        {Object.keys(firstAidCategories).map(category => (
          <button
            key={category}
            className={`whitespace-nowrap px-5 py-2 mx-1 rounded-md text-sm font-medium transition-all ${
              selectedCategory === category 
                ? 'bg-primary text-white shadow-md' 
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
        {firstAidCategories[selectedCategory].map((procedure, index) => {
          const isActive = activeIndex === index;
          
          return (
            <div 
              key={index} 
              className={`rounded-lg transition-all duration-200 border ${
                isActive 
                  ? 'border-primary shadow-md' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <button 
                className="w-full flex items-center p-4 gap-4 text-left" 
                onClick={() => setActiveIndex(isActive ? null : index)}
              >
                <div className="p-3 rounded-full bg-gray-50">
                  {procedure.icon}
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
                    ? 'bg-primary text-white' 
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
                        <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-medium">
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