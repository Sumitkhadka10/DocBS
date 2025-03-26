import React, { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../context/AdminContext";
import { AppContext } from "../../context/AppContext";
import FilterSection from "./FilterSection";
import StatsCards from "./StatsCards";
import CancellationModal from "./CancellationModal";
import AppointmentsTable from "./AppointmentsTable";

const AllAppointments = () => {
  const { aToken, appointments, getAllAppointments, cancelAppointment } = useContext(AdminContext);
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext);
  const [hoverIndex, setHoverIndex] = useState(null);
  const [activeTab, setActiveTab] = useState("all");
  const [filters, setFilters] = useState({
    date: "",
    patientName: "",
    doctorName: ""
  });
  const [showReasonModal, setShowReasonModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  useEffect(() => {
    if (aToken) {
      getAllAppointments();
    }
  }, [aToken, getAllAppointments]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const openReasonModal = (appointment) => {
    setSelectedAppointment(appointment);
    setShowReasonModal(true);
  };

  const closeReasonModal = () => {
    setShowReasonModal(false);
    setSelectedAppointment(null);
  };

  const filteredAppointments = appointments
    ? appointments.filter((item) => {
        if (activeTab === "active" && (item.cancelled || item.isCompleted)) return false;
        if (activeTab === "cancelled" && !item.cancelled) return false;
        if (activeTab === "completed" && !item.isCompleted) return false;

        if (filters.date && item.slotDate) {
          const formattedDate = slotDateFormat(item.slotDate);
          if (!formattedDate.toLowerCase().includes(filters.date.toLowerCase())) return false;
        }

        if (filters.patientName && item.userData?.name) {
          if (!item.userData.name.toLowerCase().includes(filters.patientName.toLowerCase())) return false;
        }

        if (filters.doctorName && item.docData?.name) {
          if (!item.docData.name.toLowerCase().includes(filters.doctorName.toLowerCase())) return false;
        }

        return true;
      })
    : [];

  return (
    <div className="w-full max-w-6xl m-5">
      <CancellationModal
        showReasonModal={showReasonModal}
        selectedAppointment={selectedAppointment}
        closeReasonModal={closeReasonModal}
        slotDateFormat={slotDateFormat}
      />

      <div className="mb-6">
        <div className="flex items-center mb-2">
          <div className="h-10 w-1 bg-gradient-to-b from-blue-600 to-blue-500 mr-3 rounded-full shadow-lg"></div>
          <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-500">
            Appointments Management
          </h2>
        </div>

        <StatsCards appointments={appointments} />
        <FilterSection filters={filters} handleFilterChange={handleFilterChange} setFilters={setFilters} />
      </div>

      <AppointmentsTable
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        filteredAppointments={filteredAppointments}
        hoverIndex={hoverIndex}
        setHoverIndex={setHoverIndex}
        cancelAppointment={cancelAppointment}
        calculateAge={calculateAge}
        slotDateFormat={slotDateFormat}
        currency={currency}
        openReasonModal={openReasonModal}
      />
    </div>
  );
};

export default AllAppointments;