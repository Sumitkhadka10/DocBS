import React, { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { usePDF } from "react-to-pdf";
import { AppContext } from '../context/AppContext';
import { assets } from "../assets/assets";
import "./MyReportCard.css";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const createIcon = (pathContent, className = "text-indigo-600") => ({ size = 20 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    {pathContent}
  </svg>
);
const CalendarIcon = createIcon(<><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></>);
const ChevronLeftIcon = createIcon(<polyline points="15 18 9 12 15 6"></polyline>);
const ChevronRightIcon = createIcon(<polyline points="9 18 15 12 9 6"></polyline>);
const ClockIcon = createIcon(<><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></>);
const UserIcon = createIcon(<><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></>);
const DownloadIcon = createIcon(<><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></>, "text-white");

const MyReportCard = () => {
  const { backendUrl, userData } = useContext(AppContext);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [reportCards, setReportCards] = useState([]);
  const [filteredReportCards, setFilteredReportCards] = useState([]);
  const [date, setDate] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [isDoctorGenerated, setIsDoctorGenerated] = useState(false);
  const [filters, setFilters] = useState({
    date: '',
    doctorName: ''
  });

  const reportRef = useRef(null);
  const { toPDF, targetRef } = usePDF({
    filename: `medical-report-${currentIndex + 1}.pdf`,
    page: { 
      margin: { top: 20, right: 20, bottom: 40, left: 20 },
      format: "A4",
    },
    options: {
      unit: "mm",
      format: [210, 297],
    }
  });

  useEffect(() => {
    fetchReportCards();
  }, []);

  useEffect(() => {
    if (isEditing) setUnsavedChanges(true);
  }, [date, appointmentTime, content, isEditing]);

  useEffect(() => {
    const filtered = reportCards.filter(report => {
      if (filters.date && report.date) {
        if (!report.date.toLowerCase().includes(filters.date.toLowerCase())) return false;
      }
      if (filters.doctorName && report.doctorName) {
        if (!report.doctorName.toLowerCase().includes(filters.doctorName.toLowerCase())) return false;
      }
      return true;
    });

    setFilteredReportCards(filtered);
    setCurrentIndex(0);
    loadReportData(filtered, 0);
  }, [reportCards, filters]);

  const fetchReportCards = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No authentication token found");
      const response = await axios.get(`${backendUrl}/api/user/report-cards`, { headers: { token } });
      if (response.data.success) {
        const reports = response.data.reportCards || [];
        console.log("Fetched Report Cards:", reports);
        const sortedReports = reports.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setReportCards(sortedReports);
      } else throw new Error(response.data.message || "Failed to fetch report cards");
    } catch (err) {
      setError(err.message || "Failed to fetch report cards");
      console.error("Error fetching report cards:", err);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const parseCustomDate = (dateStr) => {
    if (typeof dateStr === "string" && dateStr.includes("_")) {
      const [day, month, year] = dateStr.split("_").map(Number);
      const dateObj = new Date(Date.UTC(year, month - 1, day));
      if (!isNaN(dateObj.getTime())) {
        return dateObj.toISOString().split("T")[0];
      }
    }
    const dateObj = new Date(dateStr);
    if (!isNaN(dateObj.getTime())) {
      return dateObj.toISOString().split("T")[0];
    }
    console.error("Unparseable date value:", dateStr);
    return dateStr;
  };

  const loadReportData = (reports, index) => {
    if (reports.length > 0 && index >= 0 && index < reports.length) {
      const report = reports[index];
      const normalizedDate = report.date ? parseCustomDate(report.date) : "";
      const normalizedTime = report.appointmentTime ? report.appointmentTime.padStart(5, "0") : "";
      
      setDate(normalizedDate);
      setDoctorName(report.doctorName || "Unknown Doctor");
      setAppointmentTime(normalizedTime);
      setContent(report.content || "No notes available");
      setIsEditing(false);
      setUnsavedChanges(false);
      setIsDoctorGenerated(!!report.appointmentId);
    } else {
      setDate("");
      setDoctorName("");
      setAppointmentTime("");
      setContent("");
      setIsEditing(true);
      setUnsavedChanges(false);
      setIsDoctorGenerated(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const showUnsavedChangesToast = (direction) => toast.info(
    <div className="p-2">
      <p className="font-medium mb-2">You have unsaved changes!</p>
      <div className="flex gap-2">
        <button onClick={() => { handleNavigation(direction); toast.dismiss(); }} className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">Continue</button>
        <button onClick={() => toast.dismiss()} className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">Cancel</button>
      </div>
    </div>,
    { position: "top-center", autoClose: false, closeOnClick: false, draggable: false }
  );

  const handleNavigation = (direction) => {
    let newIndex = currentIndex;
    if (direction === "next" && currentIndex < filteredReportCards.length - 1) {
      newIndex = currentIndex + 1;
    } else if (direction === "prev" && currentIndex > 0) {
      newIndex = currentIndex - 1;
    }
    setCurrentIndex(newIndex);
    loadReportData(filteredReportCards, newIndex);
  };

  const navigate = (direction) => {
    if (unsavedChanges) {
      showUnsavedChangesToast(direction);
    } else {
      handleNavigation(direction);
    }
  };

  const handleSave = async () => {
    if (!date || !appointmentTime || !content) {
      setError("Date, Time, and Notes are required");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(`${backendUrl}/api/user/save-report-card`, 
        { date, doctorName, appointmentTime, content, page: reportCards.length + 1 }, 
        { headers: { token } }
      );
      if (response.data.success) {
        await fetchReportCards();
        setIsEditing(false);
        setUnsavedChanges(false);
        toast.success("Report saved successfully!");
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError("Failed to save report card");
      console.error("Save error:", err);
      toast.error("Failed to save report card");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async () => {
    if (!isEditing) {
      setIsEditing(true);
      return;
    }
    if (!date || !appointmentTime || !content) {
      setError("Date, Time, and Notes are required");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(`${backendUrl}/api/user/update-report-card`, 
        { date, doctorName, appointmentTime, content, page: filteredReportCards[currentIndex].page }, 
        { headers: { token } }
      );
      if (response.data.success) {
        await fetchReportCards();
        setIsEditing(false);
        setUnsavedChanges(false);
        toast.success("Changes saved successfully!");
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError("Failed to update report card");
      console.error("Update error:", err);
      toast.error("Failed to update report card");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    loadReportData(filteredReportCards, currentIndex);
    setIsEditing(false);
    setUnsavedChanges(false);
    toast.info("Changes discarded");
  };

  const handleDownloadPDF = () => {
    if (!date || !doctorName || !appointmentTime || !content) {
      toast.warning("This report has no content to download");
      return;
    }
    toPDF();
    toast.success("PDF downloaded successfully");
  };

  const healthQuotes = [
    "An apple a day keeps the doctor away.",
    "The greatest wealth is health.",
    "Take care of your body. It's the only place you have to live.",
    "Health is not valued until sickness comes.",
    "Early to bed and early to rise makes a man healthy, wealthy, and wise."
  ];
  const formattedDate = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  const hasData = filteredReportCards.length > 0 && currentIndex < filteredReportCards.length;

  const InputGroup = ({ label, type, value, onChange, icon: Icon, disabled }) => {
    const [inputError, setInputError] = useState("");

    return (
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <div className="relative">
          {type && !disabled ? (
            <input
              type={type}
              className={`w-full px-4 py-3 pl-4 pr-10 border ${inputError ? "border-red-300" : "border-gray-300"} rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-gray-50`}
              value={value || ""}
              onChange={(e) => onChange(e.target.value)}
              disabled={disabled || loading}
              autoComplete="off"
            />
          ) : (
            <div className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-900 font-medium">
              {value || "Not specified"}
            </div>
          )}
          {Icon && <div className="absolute right-3 top-3 pointer-events-none"><Icon /></div>}
        </div>
        {inputError && <p className="text-red-500 text-xs mt-1">{inputError}</p>}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-white p-4 md:p-6">
      <ToastContainer />
      <div className="max-w-4xl mx-auto">
        <div className="bg-indigo-900 text-white p-3 rounded-t-xl flex justify-between items-center">
          <div className="text-lg font-bold">Doctor Booking System</div>
          <div className="text-indigo-200 text-sm">{formattedDate}</div>
        </div>
        <div className="bg-white rounded-b-xl shadow-2xl overflow-hidden border-x border-b border-indigo-100">
          <div className="bg-gradient-to-r from-indigo-600 to-blue-600 p-6 text-white relative">
            <h1 className="text-3xl font-bold tracking-tight">Digital Medical Report Card</h1>
          </div>
          <div className="p-6">
            {/* Filter Section */}
            <div className="bg-gray-50 rounded-xl shadow-md p-6 mb-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                  </svg>
                  Filter Report Cards
                </h3>
                <button
                  onClick={() => setFilters({ date: '', doctorName: '' })}
                  className="text-sm text-indigo-600 hover:text-indigo-800 transition-colors flex items-center"
                >
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Clear Filters
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <div className="relative">
                    <input
                      type="text"
                      name="date"
                      value={filters.date}
                      onChange={handleFilterChange}
                      placeholder="YYYY-MM-DD"
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                    />
                    <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Doctor Name</label>
                  <div className="relative">
                    <input
                      type="text"
                      name="doctorName"
                      value={filters.doctorName}
                      onChange={handleFilterChange}
                      placeholder="Enter doctor name"
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                    />
                    <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {loading && <p className="text-gray-500">Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}
            
            {filteredReportCards.length === 0 && !isEditing && !loading && (
              <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                <div className="relative w-20 h-20 mb-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-blue-500 rounded-full blur-lg opacity-20"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg className="w-12 h-12 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                </div>
                <p className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500">
                  No report cards found
                </p>
                <p className="text-base text-gray-500 mt-2">
                  {filters.date || filters.doctorName
                    ? "No report cards match your filters. Try adjusting the filters."
                    : "You have no report cards. Create a new one by clicking 'Next'."}
                </p>
              </div>
            )}

            {(filteredReportCards.length > 0 || isEditing) && (
              <div ref={targetRef} className="pdf-content">
                <div className="pdf-header flex justify-between items-center mb-6">
                  <div className="flex items-center">
                    <img 
                      className="w-36 cursor-pointer hover:opacity-80 transition-opacity" 
                      src={assets.logo} 
                      alt="Logo" 
                    />
                  </div>
                  <div className="text-sm text-gray-600">Generated on: {formattedDate}</div>
                </div>

                <div className="p-6 border border-gray-200 rounded-lg mb-6">
                  <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <UserIcon size={18} className="text-indigo-500 mr-2" />
                    Patient Information
                  </h2>
                  <div className="text-gray-700">
                    <span className="font-medium">Patient Name: </span>{userData ? userData.name : "Loading..."}
                  </div>
                </div>
                <hr className="my-6 border-gray-200" />

                <div className="p-6 border border-gray-200 rounded-lg mb-6">
                  <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
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
                    <InputGroup 
                      label="Appointment Date" 
                      type="date" 
                      value={date} 
                      onChange={setDate} 
                      icon={CalendarIcon} 
                      disabled={!isEditing || isDoctorGenerated} 
                    />
                    <InputGroup 
                      label="Doctor's Name" 
                      value={doctorName} 
                      icon={UserIcon} 
                      disabled={true} 
                    />
                    <InputGroup 
                      label="Appointment Time" 
                      type="time" 
                      value={appointmentTime} 
                      onChange={setAppointmentTime} 
                      icon={ClockIcon} 
                      disabled={!isEditing || isDoctorGenerated} 
                    />
                  </div>
                </div>
                <hr className="my-6 border-gray-200" />

                <div className="p-6 border border-gray-200 rounded-lg mb-6">
                  <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-500 mr-2">
                      <line x1="22" y1="12" x2="2" y2="12"></line>
                      <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path>
                      <line x1="6" y1="16" x2="6.01" y2="16"></line>
                      <line x1="10" y1="16" x2="10.01" y2="16"></line>
                    </svg>
                    Medical Notes
                  </h2>
                  <div className="border border-gray-200 rounded-lg bg-gray-50 p-4">
                    {isEditing && !isDoctorGenerated ? (
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
                            height: '400px', // Match DoctorReportCard height
                          }}
                          disabled={loading}
                          onReady={(editor) => {
                            editor.editing.view.change((writer) => {
                              writer.setStyle('min-height', '400px', editor.editing.view.document.getRoot());
                            });
                          }}
                        />
                      </div>
                    ) : (
                      <div
                        className="w-full min-h-[400px] font-sans text-gray-700 p-2"
                        dangerouslySetInnerHTML={{ __html: content || 'No notes available' }}
                      />
                    )}
                  </div>
                </div>
                <hr className="my-6 border-gray-200" />

                <div className="p-6 border border-gray-200 rounded-lg mb-6">
                  <p className="italic text-gray-700 text-base">{healthQuotes[currentIndex % healthQuotes.length]}</p>
                </div>

                <div className="pdf-footer text-center text-gray-600 text-sm mt-8">
                  This is an electronic report card generated from: Doctor Booking System | Report {currentIndex + 1} of {filteredReportCards.length || 1}
                </div>
              </div>
            )}

            {(filteredReportCards.length > 0 || isEditing) && (
              <div className="no-print">
                <div className="flex justify-center gap-4 mb-6">
                  {!isEditing && !isDoctorGenerated && (
                    <button 
                      onClick={handleEdit} 
                      disabled={loading} 
                      className={`px-6 py-2 rounded-lg transition-all duration-200 ${loading ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-yellow-500 text-white hover:bg-yellow-600 shadow-sm hover:shadow"}`}
                    >
                      Edit
                    </button>
                  )}
                  {isEditing && !isDoctorGenerated && (
                    <>
                      <button 
                        onClick={hasData ? handleEdit : handleSave} 
                        disabled={loading} 
                        className={`px-6 py-2 rounded-lg transition-all duration-200 ${loading ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-green-500 text-white hover:bg-green-600 shadow-sm hover:shadow"}`}
                      >
                        {hasData ? "Save Changes" : "Save"}
                      </button>
                      <button 
                        onClick={handleCancel} 
                        disabled={loading} 
                        className={`px-6 py-2 rounded-lg transition-all duration-200 ${loading ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-red-100 text-red-600 hover:bg-red-200 border border-red-200"}`}
                      >
                        Cancel
                      </button>
                    </>
                  )}
                  {hasData && (
                    <button 
                      onClick={handleDownloadPDF} 
                      disabled={loading} 
                      className={`flex items-center gap-2 px-6 py-2 rounded-lg transition-all duration-200 ${loading ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700 shadow-sm hover:shadow"}`}
                    >
                      <DownloadIcon size={18} />
                      <span>Download PDF</span>
                    </button>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <button 
                    onClick={() => navigate("prev")} 
                    disabled={currentIndex === 0 || loading} 
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${currentIndex === 0 || loading ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-white text-indigo-600 hover:bg-indigo-50 border border-indigo-200 shadow-sm hover:shadow"}`}
                  >
                    <ChevronLeftIcon />
                    <span>Previous</span>
                  </button>
                  <button 
                    onClick={() => navigate("next")} 
                    disabled={loading || (currentIndex === filteredReportCards.length - 1 && !isEditing)} 
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${(loading || (currentIndex === filteredReportCards.length - 1 && !isEditing)) ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm hover:shadow"}`}
                  >
                    <span>Next</span>
                    <ChevronRightIcon />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyReportCard;