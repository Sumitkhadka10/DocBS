import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { usePDF } from "react-to-pdf";

const createIcon = (pathContent, className = "text-indigo-600") => ({ size = 20 }) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>{pathContent}</svg>;
const CalendarIcon = createIcon(<><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></>);
const ChevronLeftIcon = createIcon(<polyline points="15 18 9 12 15 6"></polyline>);
const ChevronRightIcon = createIcon(<polyline points="9 18 15 12 9 6"></polyline>);
const ClockIcon = createIcon(<><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></>);
const UserIcon = createIcon(<><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></>);
const DownloadIcon = createIcon(<><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></>, "text-white");

const MyReportCard = () => {
  const [currentPage, setCurrentPage] = useState(1), [reportCards, setReportCards] = useState([]), [date, setDate] = useState(""), [doctorName, setDoctorName] = useState(""), [appointmentTime, setAppointmentTime] = useState(""), [content, setContent] = useState(""), [loading, setLoading] = useState(false), [error, setError] = useState(""), [isEditing, setIsEditing] = useState(false), [unsavedChanges, setUnsavedChanges] = useState(false), MAX_PAGES = 30;
  
  // Create a ref for the report content to be downloaded
  const reportRef = useRef(null);
  // Initialize the PDF generation hook
  const { toPDF, targetRef } = usePDF({
    filename: `medical-report-page-${currentPage}.pdf`,
    page: { margin: 20 }
  });

  useEffect(() => { fetchReportCards(); }, []);
  useEffect(() => { if (isEditing) setUnsavedChanges(true); }, [date, doctorName, appointmentTime, content, isEditing]);

  const fetchReportCards = async () => { setLoading(true); try { const token = localStorage.getItem("token"); if (!token) throw new Error("No authentication token found"); const response = await axios.get("http://localhost:4000/api/user/report-cards", { headers: { token } }); if (response.data.success) { setReportCards(response.data.reportCards || []); loadPageData(response.data.reportCards || [], currentPage); } else throw new Error(response.data.message || "Failed to fetch report cards"); } catch (err) { setError(err.message || "Failed to fetch report cards"); console.error("Error fetching report cards:", err); toast.error(err.message); } finally { setLoading(false); } };

  const loadPageData = (cards, page) => { const entry = cards.find((card) => card.page === page); if (entry) { setDate(entry.date || ""); setDoctorName(entry.doctorName || ""); setAppointmentTime(entry.appointmentTime || ""); setContent(entry.content || ""); setIsEditing(false); setUnsavedChanges(false); } else { setDate(""); setDoctorName(""); setAppointmentTime(""); setContent(""); setIsEditing(true); setUnsavedChanges(false); } };

  const showUnsavedChangesToast = (direction) => toast.info(<div className="p-2"><p className="font-medium mb-2">You have unsaved changes!</p><div className="flex gap-2"><button onClick={() => { handleNavigation(direction); toast.dismiss(); }} className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">Continue</button><button onClick={() => toast.dismiss()} className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">Cancel</button></div></div>, { position: "top-center", autoClose: false, closeOnClick: false, draggable: false });

  const handleNavigation = (direction) => { let newPage = currentPage; if (direction === "next" && currentPage < MAX_PAGES) newPage = currentPage + 1; else if (direction === "prev" && currentPage > 1) newPage = currentPage - 1; setCurrentPage(newPage); loadPageData(reportCards, newPage); };
  const navigate = (direction) => unsavedChanges ? showUnsavedChangesToast(direction) : handleNavigation(direction);

  const handleSave = async () => { if (!date || !doctorName || !appointmentTime || !content) { setError("All fields are required"); return; } setLoading(true); setError(""); try { const token = localStorage.getItem("token"); const response = await axios.post("http://localhost:4000/api/user/save-report-card", { date, doctorName, appointmentTime, content, page: currentPage }, { headers: { token } }); if (response.data.success) { fetchReportCards(); setIsEditing(false); setUnsavedChanges(false); toast.success("Report saved successfully!"); } else setError(response.data.message); } catch (err) { setError("Failed to save report card"); console.error("Save error:", err); toast.error("Failed to save report card"); } finally { setLoading(false); } };

  const handleEdit = async () => { if (!isEditing) { setIsEditing(true); return; } if (!date || !doctorName || !appointmentTime || !content) { setError("All fields are required"); return; } setLoading(true); setError(""); try { const token = localStorage.getItem("token"); const response = await axios.post("http://localhost:4000/api/user/update-report-card", { date, doctorName, appointmentTime, content, page: currentPage }, { headers: { token } }); if (response.data.success) { fetchReportCards(); setIsEditing(false); setUnsavedChanges(false); toast.success("Changes saved successfully!"); } else setError(response.data.message); } catch (err) { setError("Failed to update report card"); console.error("Update error:", err); toast.error("Failed to update report card"); } finally { setLoading(false); } };

  const handleCancel = () => { loadPageData(reportCards, currentPage); setIsEditing(false); setUnsavedChanges(false); toast.info("Changes discarded"); };

  // Handle PDF download
  const handleDownloadPDF = () => {
    if (!date || !doctorName || !appointmentTime || !content) {
      toast.warning("This page has no content to download");
      return;
    }
    
    // Generate PDF using the react-to-pdf hook
    toPDF();
    toast.success("PDF downloaded successfully");
  };

  const healthQuotes = ["An apple a day keeps the doctor away.", "The greatest wealth is health.", "Take care of your body. It's the only place you have to live.", "Health is not valued until sickness comes.", "Early to bed and early to rise makes a man healthy, wealthy, and wise."];
  const formattedDate = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  const hasPageData = reportCards.some((card) => card.page === currentPage);

  const InputGroup = ({ label, type, value, onChange, icon: Icon, disabled }) => {
    const [inputError, setInputError] = useState("");
    const handleDoctorNameChange = (e) => { const value = e.target.value, sanitizedValue = value.replace(/[^a-zA-Z\s.''-]/g, "").replace(/\s{2,}/g, " "); setInputError(value !== sanitizedValue ? "Only letters, spaces, periods, apostrophes, and hyphens are allowed." : ""); onChange(sanitizedValue); };
    return (<div><label className="block text-sm font-medium text-gray-700 mb-1">{label}</label><div className="relative"><input type={type} className={`w-full px-4 py-3 pl-4 pr-10 border ${inputError ? "border-red-300" : "border-gray-300"} rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-gray-50`} value={value || ""} onChange={label === "Doctor's Name" ? handleDoctorNameChange : (e) => onChange(e.target.value)} disabled={disabled || loading} autoComplete="off"/>{Icon && <div className="absolute right-3 top-3 pointer-events-none"><Icon /></div>}</div>{inputError && <p className="text-red-500 text-xs mt-1">{inputError}</p>}</div>);
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
            {loading && <p className="text-gray-500">Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}
            
            {/* Content that will be captured for PDF */}
            <div ref={targetRef}>
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
                  <InputGroup label="Appointment Date" type="date" value={date} onChange={setDate} icon={CalendarIcon} disabled={!isEditing}/>
                  <InputGroup label="Doctor's Name" type="text" value={doctorName} onChange={setDoctorName} icon={UserIcon} disabled={!isEditing}/>
                  <InputGroup label="Appointment Time" type="time" value={appointmentTime} onChange={setAppointmentTime} icon={ClockIcon} disabled={!isEditing}/>
                </div>
              </div>
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
                  {isEditing ? (
                    <textarea
                      className="w-full p-4 min-h-64 font-sans text-gray-700 rounded-lg bg-transparent outline-none resize-none"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      placeholder="Enter medical notes here..."
                      disabled={loading}
                    />
                  ) : (
                    <div className="w-full p-4 min-h-64 font-sans text-gray-700 rounded-lg bg-transparent">
                      {content}
                    </div>
                  )}
                </div>
              </div>
              <div className="relative bg-gradient-to-r from-blue-50 to-indigo-50 border border-indigo-100 rounded-xl py-5 px-6 mb-6 shadow-sm">
                <div className="absolute top-0 right-0 w-16 h-16 text-indigo-200 opacity-30">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.5 10c-.223 0-.437.034-.65.065.069-.232.14-.468.254-.68.114-.308.292-.575.469-.844.148-.291.409-.488.601-.737.201-.242.475-.403.692-.604.213-.21.492-.315.714-.463.232-.133.434-.28.65-.35.208-.086.39-.16.539-.222.302-.125.474-.197.474-.197L9.758 4.03c0 0-.218.052-.597.144C8.97 4.222 8.737 4.278 8.472 4.345c-.271.05-.56.187-.882.312C7.272 4.799 6.904 4.895 6.562 5.123c-.344.218-.741.4-1.091.692C5.132 6.116 4.723 6.377 4.421 6.76c-.33.358-.656.734-.909 1.162C3.219 8.33 3.02 8.778 2.81 9.221c-.19.443-.343.896-.468 1.336-.237.882-.343 1.72-.384 2.437-.034.718-.014 1.315.028 1.747.015.204.043.402.063.539.017.109.025.168.025.168l.026-.006C2.535 17.474 4.338 19 6.5 19c2.485 0 4.5-2.015 4.5-4.5S8.985 10 6.5 10zM17.5 10c-.223 0-.437.034-.65.065.069-.232.14-.468.254-.68.114-.308.292-.575.469-.844.148-.291.409-.488.601-.737.201-.242.475-.403.692-.604.213-.21.492-.315.714-.463.232-.133.434-.28.65-.35.208-.086.39-.16.539-.222.302-.125.474-.197.474-.197L20.758 4.03c0 0-.218.052-.597.144-.191.048-.424.104-.689.171-.271.05-.56.187-.882.312-.317.143-.686.238-1.028.467-.344.218-.741.4-1.091.692-.339.301-.748.562-1.05.944-.33.358-.656.734-.909 1.162C14.219 8.33 14.02 8.778 13.81 9.221c-.19.443-.343.896-.468 1.336-.237.882-.343 1.72-.384 2.437-.034.718-.014 1.315.028 1.747.015.204.043.402.063.539.017.109.025.168.025.168l.026-.006C13.535 17.474 15.338 19 17.5 19c2.485 0 4.5-2.015 4.5-4.5S19.985 10 17.5 10z" />
                  </svg>
                </div>
                <div className="relative z-10">
                  <p className="italic text-indigo-800 font-serif text-lg">{healthQuotes[(currentPage - 1) % healthQuotes.length]}</p>
                </div>
              </div>
              <div className="flex justify-center mb-4">
                <div className="inline-flex items-center px-4 py-2 bg-indigo-100 text-indigo-800 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                  </svg>
                  <span className="font-medium">Page {currentPage} of {MAX_PAGES}</span>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex justify-center gap-4 mb-6">
              {!isEditing && <button onClick={handleEdit} disabled={loading} className={`px-6 py-2 rounded-lg transition-all duration-200 ${loading ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-yellow-500 text-white hover:bg-yellow-600 shadow-sm hover:shadow"}`}>Edit</button>}
              {isEditing && <>
                <button onClick={hasPageData ? handleEdit : handleSave} disabled={loading} className={`px-6 py-2 rounded-lg transition-all duration-200 ${loading ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-green-500 text-white hover:bg-green-600 shadow-sm hover:shadow"}`}>
                  {hasPageData ? "Save Changes" : "Save"}
                </button>
                <button onClick={handleCancel} disabled={loading} className={`px-6 py-2 rounded-lg transition-all duration-200 ${loading ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-red-100 text-red-600 hover:bg-red-200 border border-red-200"}`}>Cancel</button>
              </>}
              
              {/* PDF Download Button - Only show when there's content and not in edit mode */}
              {!isEditing && hasPageData && (
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

            {/* Navigation controls */}
            <div className="flex items-center justify-between">
              <button onClick={() => navigate("prev")} disabled={currentPage === 1 || loading} className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${currentPage === 1 || loading ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-white text-indigo-600 hover:bg-indigo-50 border border-indigo-200 shadow-sm hover:shadow"}`}>
                <ChevronLeftIcon />
                <span>Previous</span>
              </button>
              <button onClick={() => navigate("next")} disabled={currentPage === MAX_PAGES || loading} className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${currentPage === MAX_PAGES || loading ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm hover:shadow"}`}>
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