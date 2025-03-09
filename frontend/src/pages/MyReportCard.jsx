import React, { useState, useEffect } from 'react';

// Icon factory function
const createIcon = (pathContent, className = "text-indigo-600") => {
  return ({ size = 20 }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" 
         stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      {pathContent}
    </svg>
  );
};

// Define only the icons we need
const CalendarIcon = createIcon(<>
  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
  <line x1="16" y1="2" x2="16" y2="6"></line>
  <line x1="8" y1="2" x2="8" y2="6"></line>
  <line x1="3" y1="10" x2="21" y2="10"></line>
</>);

const ChevronLeftIcon = createIcon(<polyline points="15 18 9 12 15 6"></polyline>, "");
const ChevronRightIcon = createIcon(<polyline points="9 18 15 12 9 6"></polyline>, "");

const ClockIcon = createIcon(<>
  <circle cx="12" cy="12" r="10"></circle>
  <polyline points="12 6 12 12 16 14"></polyline>
</>);

const UserIcon = createIcon(<>
  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
  <circle cx="12" cy="7" r="4"></circle>
</>);

const MyReportCard = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [reportEntries, setReportEntries] = useState({});
  const [date, setDate] = useState('');
  const [doctorName, setDoctorName] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const [content, setContent] = useState('');
  const MAX_PAGES = 30;

  // Load saved data when page changes
  useEffect(() => {
    if (reportEntries[currentPage]) {
      const entry = reportEntries[currentPage];
      setDate(entry.date || '');
      setDoctorName(entry.doctorName || '');
      setAppointmentTime(entry.appointmentTime || '');
      setContent(entry.content || '');
    } else {
      setDate('');
      setDoctorName('');
      setAppointmentTime('');
      setContent('');
    }
  }, [currentPage, reportEntries]);

  // Condensed health quotes
  const healthQuotes = [
    "An apple a day keeps the doctor away.",
    "The greatest wealth is health.",
    "Take care of your body. It's the only place you have to live.",
    "Health is not valued until sickness comes.",
    "Early to bed and early to rise makes a man healthy, wealthy, and wise."
  ];

  // Save current page and navigate functions
  const saveCurrentPage = () => {
    setReportEntries({...reportEntries, [currentPage]: { date, doctorName, appointmentTime, content }});
  };

  const navigate = (direction) => {
    saveCurrentPage();
    if (direction === 'next' && currentPage < MAX_PAGES) {
      setCurrentPage(p => p + 1);
    } else if (direction === 'prev' && currentPage > 1) {
      setCurrentPage(p => p - 1);
    }
  };

  const formattedDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric'
  });

  // Reusable input group component
  const InputGroup = ({ label, type, value, onChange, icon: Icon }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div className="relative">
        <input
          type={type}
          className="w-full px-4 py-3 pl-4 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-gray-50"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        {Icon && <div className="absolute right-3 top-3 pointer-events-none"><Icon /></div>}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-white p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-indigo-900 text-white p-3 rounded-t-xl flex justify-between items-center">
          <div className="text-lg font-bold">Doctor Booking System</div>
          <div className="text-indigo-200 text-sm">{formattedDate}</div>
        </div>

        {/* Card */}
        <div className="bg-white rounded-b-xl shadow-2xl overflow-hidden border-x border-b border-indigo-100">
          {/* Main Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-blue-600 p-6 text-white relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full opacity-5 -mt-20 -mr-20"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white rounded-full opacity-5 -mb-10 -ml-10"></div>
            <h1 className="text-3xl font-bold tracking-tight">Medical Report Card</h1>
          </div>
        
          {/* Main Content */}
          <div className="p-6">
            {/* Appointment Details */}
            <div className="bg-white p-6 rounded-xl border border-indigo-100 shadow-sm mb-6">
              <h2 className="text-lg font-semibold text-indigo-800 mb-4 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-500 mr-2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
                Appointment Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <InputGroup label="Appointment Date" type="date" value={date} onChange={setDate} icon={CalendarIcon} />
                <InputGroup label="Doctor's Name" type="text" value={doctorName} onChange={setDoctorName} icon={UserIcon} />
                <InputGroup label="Appointment Time" type="time" value={appointmentTime} onChange={setAppointmentTime} icon={ClockIcon} />
              </div>
            </div>

            {/* Medical Notes */}
            <div className="bg-white p-6 rounded-xl border border-indigo-100 shadow-sm mb-6">
              <h2 className="text-lg font-semibold text-indigo-800 mb-4 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-500 mr-2">
                  <line x1="22" y1="12" x2="2" y2="12"></line>
                  <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path>
                  <line x1="6" y1="16" x2="6.01" y2="16"></line>
                  <line x1="10" y1="16" x2="10.01" y2="16"></line>
                </svg>
                Medical Notes
              </h2>
              <div className="border border-gray-200 rounded-lg shadow-inner bg-gray-50">
                <textarea
                  className="w-full p-4 min-h-64 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none font-sans text-gray-700 rounded-lg bg-transparent transition-all"
                  placeholder="Enter detailed medical notes, observations, and recommendations..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                ></textarea>
              </div>
            </div>

            {/* Health quote */}
            <div className="relative bg-gradient-to-r from-blue-50 to-indigo-50 border border-indigo-100 rounded-xl py-5 px-6 my-6 shadow-sm">
              <div className="absolute top-0 right-0 w-16 h-16 text-indigo-200 opacity-30">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.5 10c-.223 0-.437.034-.65.065.069-.232.14-.468.254-.68.114-.308.292-.575.469-.844.148-.291.409-.488.601-.737.201-.242.475-.403.692-.604.213-.21.492-.315.714-.463.232-.133.434-.28.65-.35.208-.086.39-.16.539-.222.302-.125.474-.197.474-.197L9.758 4.03c0 0-.218.052-.597.144C8.97 4.222 8.737 4.278 8.472 4.345c-.271.05-.56.187-.882.312C7.272 4.799 6.904 4.895 6.562 5.123c-.344.218-.741.4-1.091.692C5.132 6.116 4.723 6.377 4.421 6.76c-.33.358-.656.734-.909 1.162C3.219 8.33 3.02 8.778 2.81 9.221c-.19.443-.343.896-.468 1.336-.237.882-.343 1.72-.384 2.437-.034.718-.014 1.315.028 1.747.015.204.043.402.063.539.017.109.025.168.025.168l.026-.006C2.535 17.474 4.338 19 6.5 19c2.485 0 4.5-2.015 4.5-4.5S8.985 10 6.5 10zM17.5 10c-.223 0-.437.034-.65.065.069-.232.14-.468.254-.68.114-.308.292-.575.469-.844.148-.291.409-.488.601-.737.201-.242.475-.403.692-.604.213-.21.492-.315.714-.463.232-.133.434-.28.65-.35.208-.086.39-.16.539-.222.302-.125.474-.197.474-.197L20.758 4.03c0 0-.218.052-.597.144-.191.048-.424.104-.689.171-.271.05-.56.187-.882.312-.317.143-.686.238-1.028.467-.344.218-.741.4-1.091.692-.339.301-.748.562-1.05.944-.33.358-.656.734-.909 1.162C14.219 8.33 14.02 8.778 13.81 9.221c-.19.443-.343.896-.468 1.336-.237.882-.343 1.72-.384 2.437-.034.718-.014 1.315.028 1.747.015.204.043.402.063.539.017.109.025.168.025.168l.026-.006C13.535 17.474 15.338 19 17.5 19c2.485 0 4.5-2.015 4.5-4.5S19.985 10 17.5 10z" />
                </svg>
              </div>
              <div className="relative z-10">
                <p className="italic text-indigo-800 font-serif text-lg">{healthQuotes[(currentPage - 1) % healthQuotes.length]}</p>
              </div>
            </div>

            {/* Page indicator */}
            <div className="flex justify-center mb-4">
              <div className="inline-flex items-center px-4 py-2 bg-indigo-100 text-indigo-800 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                </svg>
                <span className="font-medium">Page {currentPage} of {MAX_PAGES}</span>
              </div>
            </div>

            {/* Navigation buttons */}
            <div className="flex items-center justify-between">
              <button
                onClick={() => navigate('prev')}
                disabled={currentPage === 1}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-indigo-600 hover:bg-indigo-50 border border-indigo-200 shadow-sm hover:shadow'
                }`}
              >
                <ChevronLeftIcon />
                <span>Previous</span>
              </button>
              
              <button
                onClick={() => navigate('next')}
                disabled={currentPage === MAX_PAGES}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  currentPage === MAX_PAGES ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm hover:shadow'
                }`}
              >
                <span>Next</span>
                <ChevronRightIcon />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyReportCard;