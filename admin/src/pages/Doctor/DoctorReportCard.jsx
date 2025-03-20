import React, { useState, useEffect, useContext } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { toast } from 'react-toastify';

const DoctorReportCard = ({ appointmentId, patientName, onClose }) => {
  const { getPatientReportCard, saveOrUpdateReportCard, profileData, getProfileData, dToken } = useContext(DoctorContext);
  const [date, setDate] = useState('');
  const [doctorName, setDoctorName] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const [content, setContent] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const initializeReportCard = async () => {
      // Fetch profile data if not already available
      if (dToken && !profileData) {
        await getProfileData();
      }

      const reportCard = await getPatientReportCard(appointmentId);
      if (reportCard) {
        setDate(reportCard.date || '');
        setDoctorName(reportCard.doctorName || (profileData ? profileData.name : 'Unknown Doctor'));
        setAppointmentTime(reportCard.appointmentTime || '');
        setContent(reportCard.content || '');
        setIsEditing(false);
      } else {
        setDoctorName(profileData ? profileData.name : 'Unknown Doctor');
        setIsEditing(true);
      }
    };
    initializeReportCard();
  }, [appointmentId, getPatientReportCard, profileData, getProfileData, dToken]);

  const handleSave = async () => {
    if (!date || !doctorName || !appointmentTime || !content) {
      toast.error('All fields are required');
      return;
    }
    const reportData = { date, doctorName, appointmentTime, content };
    await saveOrUpdateReportCard(appointmentId, reportData);
    setIsEditing(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
        <h2 className="text-xl font-bold mb-4">Patient Report Card for {patientName}</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              disabled={!isEditing}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Doctor Name</label>
            <div className="w-full p-2 border rounded bg-gray-100 text-gray-900 font-medium">
              {doctorName}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Appointment Time</label>
            <input
              type="time"
              value={appointmentTime}
              onChange={(e) => setAppointmentTime(e.target.value)}
              disabled={!isEditing}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              disabled={!isEditing}
              className="w-full p-2 border rounded h-32 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="flex gap-4">
            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors"
                >
                  Save
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors"
              >
                Edit
              </button>
            )}
            <button
              onClick={onClose}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorReportCard;