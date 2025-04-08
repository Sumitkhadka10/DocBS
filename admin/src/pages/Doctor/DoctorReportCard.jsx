import React, { useState, useEffect, useContext } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const DoctorReportCard = ({ appointmentId, patientName, onClose }) => {
  const { getPatientReportCard, saveOrUpdateReportCard, profileData, getProfileData, dToken, backendUrl } =
    useContext(DoctorContext);
  const [date, setDate] = useState('');
  const [doctorName, setDoctorName] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const [content, setContent] = useState('');
  const [originalContent, setOriginalContent] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [fontFamily, setFontFamily] = useState('Arial');
  const [isSaving, setIsSaving] = useState(false);

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
          headers: { dToken },
        });

        let appointment;
        if (appointmentResponse.data.success) {
          appointment = appointmentResponse.data.appointments.find((app) => app._id === appointmentId);
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
  }, [appointmentId, getPatientReportCard, profileData, getProfileData, dToken, backendUrl, isInitialized]);

  const handleSave = async () => {
    if (!date || !doctorName || !appointmentTime || !content) {
      toast.error('All fields are required');
      return;
    }
    setIsSaving(true);
    try {
      const reportData = { date, doctorName, appointmentTime, content };
      await saveOrUpdateReportCard(appointmentId, reportData);
      setOriginalContent(content);
      setIsEditing(false);
      toast.success('Report card saved successfully');
    } catch (error) {
      console.error('Error saving report card:', error.response ? error.response.data : error.message);
      toast.error('Failed to save report card');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setContent(originalContent);
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleFontChange = (e) => {
    setFontFamily(e.target.value);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Patient Report Card for {patientName}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {error ? (
          <div className="text-red-500 mb-4">{error}</div>
        ) : (
          <div className="space-y-6">
            {/* Patient and Appointment Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                <label className="block text-sm font-medium text-gray-700">Appointment Time</label>
                <input
                  type="text"
                  value={appointmentTime}
                  disabled={true}
                  className="w-full p-2 border rounded bg-gray-100 text-gray-900 font-medium"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Doctor Name</label>
              <div className="w-full p-2 border rounded bg-gray-100 text-gray-900 font-medium">
                {doctorName}
              </div>
            </div>

            {/* Medical Notes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Medical Notes</label>
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
                </div>
              )}
              {isEditing ? (
                <div className="border rounded-lg overflow-hidden shadow-sm">
                  <CKEditor
                    editor={ClassicEditor}
                    data={content}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      setContent(data);
                    }}
                    config={{
                      toolbar: [
                        'heading',
                        '|',
                        'bold',
                        'italic',
                        'underline',
                        'strikethrough',
                        '|',
                        'bulletedList',
                        'numberedList',
                        '|',
                        'blockQuote',
                        'insertTable',
                        '|',
                        'undo',
                        'redo',
                      ],
                      heading: {
                        options: [
                          { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
                          { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
                          { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
                          { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' },
                        ],
                      },
                      table: {
                        contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells'],
                      },
                      fontFamily: {
                        options: fontOptions.map((option) => option.value),
                        supportAllValues: true,
                      },
                      // Set a larger height for the editor
                      height: '400px', // Increased from default (~200px) to 400px
                    }}
                    disabled={!isEditing}
                    onReady={(editor) => {
                      // Ensure the editor's editable area has a minimum height
                      editor.editing.view.change((writer) => {
                        writer.setStyle('min-height', '400px', editor.editing.view.document.getRoot());
                      });
                    }}
                  />
                </div>
              ) : (
                <div
                  className="w-full p-4 border rounded bg-gray-50 text-gray-900 min-h-[400px]" // Match height for consistency
                  style={{ fontFamily }}
                  dangerouslySetInnerHTML={{ __html: content || 'No notes available' }}
                />
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 justify-end">
              {isEditing ? (
                <>
                  <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      isSaving
                        ? 'bg-indigo-400 text-white cursor-not-allowed'
                        : 'bg-indigo-600 text-white hover:bg-indigo-700'
                    }`}
                  >
                    {isSaving ? 'Saving...' : 'Save'}
                  </button>
                  <button
                    onClick={handleCancel}
                    className="px-4 py-2 bg-gray-300 text-gray-900 rounded-md text-sm font-medium hover:bg-gray-400 transition-colors"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={handleEdit}
                  className="px-4 py-2 bg-yellow-500 text-white rounded-md text-sm font-medium hover:bg-yellow-600 transition-colors"
                >
                  Edit
                </button>
              )}
              <button
                onClick={onClose}
                className="px-4 py-2 bg-red-500 text-white rounded-md text-sm font-medium hover:bg-red-600 transition-colors"
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