import React, { useState, useEffect, useContext } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const DoctorReportCard = ({ appointmentId, patientName, onClose }) => {
  const { getPatientReportCard, saveOrUpdateReportCard, profileData, getProfileData, dToken, backendUrl } = useContext(DoctorContext);
  const [date, setDate] = useState('');
  const [doctorName, setDoctorName] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const [content, setContent] = useState(''); // Fixed typo here
  const [originalContent, setOriginalContent] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [fontFamily, setFontFamily] = useState('Arial');
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);

  const fontOptions = [
    { value: 'Arial', label: 'Arial' },
    { value: 'Times New Roman', label: 'Times New Roman' },
    { value: 'Roboto', label: 'Roboto' },
  ];

  useEffect(() => {
    const initializeReportCard = async () => {
      if (isInitialized) return;

      try {
        if (dToken && !profileData) {
          await getProfileData();
        }

        const appointmentResponse = await axios.get(`${backendUrl}/api/doctor/appointments`, {
          headers: { dToken }
        });

        let appointment;
        if (appointmentResponse.data.success) {
          appointment = appointmentResponse.data.appointments.find(app => app._id === appointmentId);
          if (appointment) {
            setDate(appointment.slotDate);
            setAppointmentTime(appointment.slotTime);
          } else {
            setError('Appointment not found');
            toast.error('Appointment not found');
            return;
          }
        } else {
          setError('Failed to fetch appointment details');
          toast.error('Failed to fetch appointment details');
          return;
        }

        const reportCard = await getPatientReportCard(appointmentId);
        if (reportCard) {
          setDate(reportCard.date || appointment.slotDate);
          setDoctorName(reportCard.doctorName || (profileData ? profileData.name : 'Unknown Doctor'));
          setAppointmentTime(reportCard.appointmentTime || appointment.slotTime);
          setContent(reportCard.content || '');
          setOriginalContent(reportCard.content || '');
          setIsEditing(false);
        } else {
          setDoctorName(profileData ? profileData.name : 'Unknown Doctor');
          setContent('');
          setOriginalContent('');
          setIsEditing(true);
        }

        setIsInitialized(true);
      } catch (error) {
        console.error('Error initializing report card:', error.response ? error.response.data : error.message);
        setError('Failed to initialize report card');
        toast.error('Failed to initialize report card');
      }
    };

    initializeReportCard();
  }, [appointmentId, getPatientReportCard, profileData, getProfileData, dToken, backendUrl]);

  const handleSave = async () => {
    if (!date || !doctorName || !appointmentTime || !content) {
      toast.error('All fields are required');
      return;
    }
    try {
      const reportData = { date, doctorName, appointmentTime, content };
      await saveOrUpdateReportCard(appointmentId, reportData);
      setOriginalContent(content);
      setIsEditing(false);
      toast.success('Report card saved successfully');
    } catch (error) {
      console.error('Error saving report card:', error.response ? error.response.data : error.message);
      toast.error('Failed to save report card');
    }
  };

  const handleCancel = () => {
    setContent(originalContent);
    setIsEditing(false);
    setIsBold(false);
    setIsItalic(false);
    setIsUnderline(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleFontChange = (e) => {
    setFontFamily(e.target.value);
  };

  const toggleBold = () => {
    setIsBold(prev => !prev);
  };

  const toggleItalic = () => {
    setIsItalic(prev => !prev);
  };

  const toggleUnderline = () => {
    setIsUnderline(prev => !prev);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
        <h2 className="text-xl font-bold mb-4">Patient Report Card for {patientName}</h2>
        {error ? (
          <div className="text-red-500 mb-4">{error}</div>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Date</label>
              <input
                type="text"
                value={date}
                disabled={true}
                className="w-full p-2 border rounded bg-gray-100 text-gray-900 font-medium"
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
                type="text"
                value={appointmentTime}
                disabled={true}
                className="w-full p-2 border rounded bg-gray-100 text-gray-900 font-medium"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Content</label>
              {isEditing && (
                <div className="flex gap-2 mb-2">
                  <select
                    value={fontFamily}
                    onChange={handleFontChange}
                    className="p-1 border rounded text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    {fontOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={toggleBold}
                    className={`px-2 py-1 border rounded ${isBold ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`}
                  >
                    B
                  </button>
                  <button
                    onClick={toggleItalic}
                    className={`px-2 py-1 border rounded ${isItalic ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`}
                  >
                    I
                  </button>
                  <button
                    onClick={toggleUnderline}
                    className={`px-2 py-1 border rounded ${isUnderline ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`}
                  >
                    U
                  </button>
                </div>
              )}
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                disabled={!isEditing}
                placeholder="Enter medical notes here..."
                className="w-full p-2 border rounded h-32 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                style={{
                  fontFamily,
                  fontWeight: isBold ? 'bold' : 'normal',
                  fontStyle: isItalic ? 'italic' : 'normal',
                  textDecoration: isUnderline ? 'underline' : 'none',
                }}
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
                    onClick={handleCancel}
                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition-colors"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={handleEdit}
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
        )}
      </div>
    </div>
  );
};

export default DoctorReportCard;