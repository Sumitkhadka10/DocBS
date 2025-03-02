import React, { useState } from 'react';
import { FaAppleAlt, FaBrain, FaRunning, FaHeartbeat, FaMedkit } from 'react-icons/fa';

const articles = [
  { id: 1, category: 'Nutrition', icon: FaAppleAlt, title: 'Essential Nutrients for Everyday Health', content: 'Simple ways to get key nutrients from your daily meals...', fullContent: ['• Include colorful fruits and vegetables', '• Choose whole grains over refined carbs', '• Add nuts and seeds to snacks', '• Drink enough water daily'] },
  { id: 2, category: 'Nutrition', icon: FaAppleAlt, title: 'Healthy Eating Made Simple', content: 'Practical tips for balanced meals without complicated diets...', fullContent: ['→ Fill half your plate with vegetables', '→ Choose lean proteins like fish/chicken', '→ Use healthy oils like olive oil', '→ Limit processed foods'] },
  { id: 3, category: 'Mental Health', icon: FaBrain, title: 'Daily Stress Relief Techniques', content: 'Simple methods to relax and manage everyday stress...', fullContent: ['• Take 5 deep breaths when stressed', '• Write down your thoughts', '• Take short walk breaks', '• Listen to calming music'] },
  { id: 4, category: 'Mental Health', icon: FaBrain, title: 'Better Sleep Habits', content: 'Improve your sleep quality with these easy changes...', fullContent: ['→ Keeping regular bedtimes', '→ Making bedroom dark and quiet', '→ Avoiding screens before bed', '→ Reducing caffeine intake'] },
  { id: 5, category: 'Exercise', icon: FaRunning, title: 'Easy Home Workouts', content: 'Stay active without gym equipment...', fullContent: ['• Bodyweight squats', '• Wall push-ups', '• Stair climbing', '• Stretching breaks'] },
  { id: 6, category: 'Exercise', icon: FaRunning, title: 'Stay Active at Work', content: 'Move more even with desk jobs...', fullContent: ['→ Take standing breaks hourly', '→ Do chair stretches', '→ Walk during calls', '→ Use stairs instead of elevator'] },
  { id: 7, category: 'Prevention', icon: FaHeartbeat, title: 'Heart-Healthy Habits', content: 'Keep your heart strong with daily routines...', fullContent: ['• 30-minute daily walks', '• Eat more vegetables', '• Manage stress levels', '• Regular health checkups'] },
  { id: 8, category: 'Prevention', icon: FaHeartbeat, title: 'Boost Your Immunity', content: 'Strengthen your body’s defenses naturally...', fullContent: ['→ Get enough sleep', '→ Eat vitamin-rich foods', '→ Stay hydrated', '→ Regular exercise'] }
];

const categories = ['All', ...new Set(articles.map(a => a.category))];

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [expandedArticle, setExpandedArticle] = useState(null);
  
  const displayedArticles = articles.filter(a => selectedCategory === 'All' || a.category === selectedCategory).slice(0, 4);

  return (
    <div className="bg-gradient-to-b from-slate-50 to-blue-50 py-20 px-6 max-w-7xl mx-auto">
      <header className="text-center mb-16">
        <div className="inline-block bg-gradient-to-r from-blue-600 to-cyan-500 p-1 rounded-full mb-6">
          <div className="bg-white/90 backdrop-blur-sm rounded-full px-8 py-4">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">Simple Health Guide</h2>
          </div>
        </div>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">Practical health tips for everyday wellness</p>
      </header>

      <div className="flex justify-center gap-3 mb-16 flex-wrap">
        {categories.map(category => (
          <button key={category} onClick={() => setSelectedCategory(category)} className={`px-5 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${selectedCategory === category ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' : 'bg-white/80 text-slate-600 shadow-sm hover:shadow-md hover:-translate-y-0.5'}`}>
            {React.createElement(articles.find(a => a.category === category)?.icon || FaMedkit)}
            {category}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {displayedArticles.map(({ id, icon, title, content, fullContent }) => (
          <div key={id} className="group bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 bg-blue-50 rounded-xl text-blue-600">{React.createElement(icon)}</div>
              <h3 className="text-2xl font-bold text-slate-800 mt-1">{title}</h3>
            </div>
            <div className="space-y-5">
              <div className="text-slate-600 leading-relaxed">
                {expandedArticle === id ? <ul className="list-inside space-y-3">{fullContent.map((item, i) => <li key={i} className="text-slate-700 before:text-blue-500 before:mr-2">{item}</li>)}</ul> : content}
              </div>
              <button onClick={() => setExpandedArticle(expandedArticle === id ? null : id)} className="text-blue-600 font-semibold hover:text-blue-700 flex items-center gap-2">
                {expandedArticle === id ? 'Show Less' : 'Show Tips'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
