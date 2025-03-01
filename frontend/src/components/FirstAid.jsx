import React, { useState } from 'react';
import { 
  FaHeartbeat, FaLungs, FaBurn, FaTint, FaBrain, 
  FaAllergies, FaPlus, FaFirstAid, FaBaby, FaSun
} from 'react-icons/fa';

const firstAidCategories = {
  'Critical Emergencies': [
    {
      icon: <FaHeartbeat className="text-red-500" />,
      title: 'Heart Attack',
      content: {
        steps: [
          '1. Call emergency number immediately',
          '2. Help person sit down and stay calm',
          '3. Give aspirin if available (chew 1 adult tablet)',
          '4. Loosen tight clothing',
          '5. Be ready to do CPR if they stop breathing'
        ],
        note: 'Time is critical - act fast!'
      }
    },
    {
      icon: <FaLungs className="text-blue-500" />,
      title: 'Choking',
      content: {
        steps: [
          '1. Ask "Can you cough or speak?"',
          '2. Give 5 hard back blows between shoulder blades',
          '3. Do 5 quick upward pushes on stomach (Heimlich)',
          '4. Keep repeating until object comes out',
          '5. If person faints, start CPR'
        ],
        note: 'Never slap someone on the back if theyre coughing'
      }
    },
  ],
  'Trauma Care': [
    {
      icon: <FaBurn className="text-orange-500" />,
      title: 'Burns',
      content: {
        steps: [
          '1. Cool under cool running water for 20 minutes',
          '2. Remove jewelry/watch near burned area',
          '3. Cover with clean cloth or plastic wrap',
          '4. Don\'t pop blisters or apply creams',
          '5. Get medical help for big burns or face/hand burns'
        ],
        note: 'Never use ice on burns'
      }
    },
    {
      icon: <FaTint className="text-red-500" />,
      title: 'Heavy Bleeding',
      content: {
        steps: [
          '1. Press hard on wound with clean cloth',
          '2. Keep pressing - add more cloth if blood soaks through',
          '3. Raise injured part above heart if possible',
          '4. Keep pressure until help arrives',
          '5. If limb is damaged, tie tight band above wound as last resort'
        ],
        note: 'Don\'t remove stuck objects - let doctors do it'
      }
    },
  ],
  'Medical Crises': [
    {
      icon: <FaBrain className="text-purple-500" />,
      title: 'Stroke',
      content: {
        steps: [
          'Remember FAST:',
          'F - Face drooping? Ask to smile',
          'A - Arm weakness? Raise both arms',
          'S - Speech trouble? Repeat simple sentence',
          'T - Time to call emergency immediately!',
          'Note when symptoms started'
        ],
        note: 'Every minute counts - act fast!'
      }
    },
    {
      icon: <FaAllergies className="text-green-500" />,
      title: 'Severe Allergy',
      content: {
        steps: [
          '1. Help use epi-pen if available (thigh injection)',
          '2. Call emergency services',
          '3. Lay person flat, raise legs',
          '4. Stay with them until help comes',
          '5. Give second epi-pen after 5 minutes if needed'
        ],
        note: 'Even if better, hospital check is needed'
      }
    },
  ],
  'Environmental Injuries': [
    {
      icon: <FaSun className="text-yellow-500" />,
      title: 'Heat Stroke',
      content: {
        steps: [
          '1. Move to cool place immediately',
          '2. Remove extra clothing',
          '3. Cool with wet cloths or ice packs (armpits, neck, groin)',
          '4. Give sips of water if conscious',
          '5. Fan while waiting for help'
        ],
        note: 'Skin will feel hot and dry - this is dangerous!'
      }
    },
    {
      icon: <FaSun className="text-blue-500" />,
      title: 'Hypothermia',
      content: {
        steps: [
          '1. Move to warm place',
          '2. Remove wet clothes',
          '3. Warm with blankets (cover head too)',
          '4. Give warm drinks if awake',
          '5. Don\'t rub skin or use hot water'
        ],
        note: 'Warm slowly - too fast can be dangerous'
      }
    },
  ],
  'Kids & Babies': [
    {
      icon: <FaBaby className="text-pink-500" />,
      title: 'Child CPR',
      content: {
        steps: [
          '1. Shout and tap shoulder - no response?',
          '2. Give 30 chest pushes with 2 fingers (baby) or 1 hand (child)',
          '3. Give 2 gentle breaths if trained',
          '4. Repeat until help arrives',
          '5. Start with CPR before calling emergency for babies'
        ],
        note: 'Push chest 1/3 deep - be gentle but firm'
      }
    },
    {
      icon: <FaLungs className="text-blue-500" />,
      title: 'Baby Choking',
      content: {
        steps: [
          '1. Lay baby face down on forearm',
          '2. Give 5 back slaps between shoulders',
          '3. Turn over, give 5 chest thrusts',
          '4. Repeat until object comes out',
          '5. Never finger sweep baby\'s mouth'
        ],
        note: 'If baby stops breathing, start CPR immediately'
      }
    },
  ]
};

const FirstAidGuide = () => {
  const [selectedCategory, setSelectedCategory] = useState(Object.keys(firstAidCategories)[0]);
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <div className="max-w-5xl mx-auto p-4 bg-white rounded-xl shadow-lg">
      <header className="text-center mb-8">
        <div className="inline-flex items-center gap-3 mb-4">
          <FaFirstAid className="text-red-600 text-3xl" />
          <h1 className="text-3xl font-bold text-gray-800">First Aid Made Simple</h1>
        </div>
        <p className="text-gray-600">Easy-to-follow emergency instructions for everyone</p>
      </header>

      {/* Category Buttons */}
      <div className="flex flex-wrap gap-2 mb-6 justify-center">
        {Object.keys(firstAidCategories).map((category) => (
          <button
            key={category}
            className={`px-4 py-2 rounded-full text-sm ${
              selectedCategory === category 
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            onClick={() => { setSelectedCategory(category); setActiveIndex(null); }}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Procedures List */}
      <div className="space-y-3">
        {firstAidCategories[selectedCategory].map((procedure, index) => (
          <div key={index} className="border rounded-lg hover:shadow-md">
            <button 
              className="w-full flex items-center p-4 gap-4 text-left"
              onClick={() => setActiveIndex(activeIndex === index ? null : index)}
            >
              {/* Icon */}
              <div className="p-2 rounded-lg bg-opacity-20" 
                   style={{ backgroundColor: `${procedure.icon.props.className.match(/text-(.*?)-/)[1]}20` }}>
                {React.cloneElement(procedure.icon, { className: `${procedure.icon.props.className} text-2xl` })}
              </div>

              {/* Title & Note */}
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800">{procedure.title}</h3>
                {procedure.content.note && (
                  <p className="text-sm text-red-600 mt-1">{procedure.content.note}</p>
                )}
              </div>

              <FaPlus className={`text-gray-500 transition-transform ${
                activeIndex === index ? 'rotate-45' : ''
              }`} />
            </button>

            {/* Steps */}
            {activeIndex === index && (
              <div className="p-4 bg-gray-50 border-t">
                <div className="space-y-3 pl-12">
                  {procedure.content.steps.map((step, stepIndex) => (
                    <div key={stepIndex} className="flex gap-2">
                      <div className="w-5 h-5 bg-blue-100 text-blue-600 rounded-full 
                                   flex items-center justify-center text-sm font-bold">
                        {stepIndex + 1}
                      </div>
                      <p className="text-gray-700">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <footer className="mt-8 p-4 bg-red-50 rounded-lg text-center text-sm text-gray-600">
        <p>❗ This is general advice. Always call emergency services first in serious situations.</p>
      </footer>
    </div>
  );
};

export default FirstAidGuide;