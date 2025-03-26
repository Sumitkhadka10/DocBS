// CancellationModal.jsx
import React from "react";

const CancellationModal = ({ showReasonModal, selectedAppointment, closeReasonModal, slotDateFormat }) => {
  if (!showReasonModal || !selectedAppointment) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center">
            <svg className="w-5 h-5 mr-2 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            Cancellation Details
          </h3>
          <button onClick={closeReasonModal} className="text-gray-500 hover:text-gray-700">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="space-y-3">
          <div>
            <p className="text-sm font-medium text-gray-500">Patient Name</p>
            <p className="text-base text-gray-700">{selectedAppointment.userData?.name || "Unknown"}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Doctor Name</p>
            <p className="text-base text-gray-700">{selectedAppointment.docData?.name || "Unknown"}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Date & Time</p>
            <p className="text-base text-gray-700">
              {selectedAppointment.slotDate ? slotDateFormat(selectedAppointment.slotDate) : "N/A"} at {selectedAppointment.slotTime || "N/A"}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Cancellation Reason</p>
            <p className="text-base text-gray-700 bg-red-50 p-3 rounded-lg">
              {selectedAppointment.cancellationReason || "No reason provided"}
            </p>
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <button
            onClick={closeReasonModal}
            className="px-4 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors duration-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CancellationModal;