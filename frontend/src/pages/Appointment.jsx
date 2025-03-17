import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import RelatedDoctors from "../components/RelatedDoctors";
import axios from "axios";

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol, backendUrl, token, getDoctorsData } =
    useContext(AppContext);
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const navigate = useNavigate();

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");

  // Fetch doctor info
  useEffect(() => {
    const fetchDocInfo = () => {
      const doctor = doctors.find((doc) => doc._id === docId);
      setDocInfo(doctor || null);
    };
    fetchDocInfo();
  }, [doctors, docId]);

  // Generate available slots
  useEffect(() => {
    if (!docInfo) return;

    const getAvailableSlots = () => {
      const slots = [];
      const today = new Date();

      for (let i = 0; i < 7; i++) {
        const currentDate = new Date(today);
        currentDate.setDate(today.getDate() + i);

        const endTime = new Date(currentDate);
        endTime.setHours(21, 0, 0, 0); // End time is 9:00 PM

        if (i === 0) {
          // Start from the next 30-minute slot for today
          const now = new Date();
          currentDate.setHours(now.getHours());
          currentDate.setMinutes(now.getMinutes() > 30 ? 60 : 30);

          if (currentDate < now) {
            currentDate.setHours(currentDate.getHours() + 1);
            currentDate.setMinutes(0);
          }

          if (currentDate >= endTime) {
            slots.push([]);
            continue;
          }
        } else {
          currentDate.setHours(10);
          currentDate.setMinutes(0);
        }

        const timeSlots = [];
        while (currentDate < endTime) {
          const formattedTime = currentDate.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          });

          let day = currentDate.getDate();
          let month = currentDate.getMonth() + 1;
          let year = currentDate.getFullYear();

          const slotDate = day + "_" + month + "_" + year;
          const slotTime = formattedTime;

          const isSlotAvailable =
            docInfo.slots_booked[slotDate] &&
            docInfo.slots_booked[slotDate].includes(slotTime)
              ? false
              : true;

          if (isSlotAvailable) {
            timeSlots.push({
              datetime: new Date(currentDate),
              time: formattedTime,
            });
          }

          currentDate.setMinutes(currentDate.getMinutes() + 30);
        }

        slots.push(timeSlots);
      }

      setDocSlots(slots);
    };

    getAvailableSlots();
  }, [docInfo]);

  // Handle appointment booking
  const bookAppointment = async () => {
    if (!token) {
      toast.warn("Please login to book an appointment");
      navigate("/login");
      return;
    }
    try {
      const date = docSlots[slotIndex][0].datetime;

      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();

      const slotDate = day + "_" + month + "_" + year;

      const { data } = await axios.post(
        backendUrl + "/api/user/book-appointment",
        { docId, slotDate, slotTime },
        { headers: { token } }
      );
      if (data.success) {
        toast.success(data.message);
        getDoctorsData();
        navigate("/my-appointments");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    docInfo && (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {/* Doctor Profile Section */}
        <div className="flex flex-col lg:flex-row gap-10 items-start">
          {/* Enhanced Image Section */}
          <div className="w-full lg:w-1/3 relative group">
            <div className="relative overflow-hidden rounded-[2rem] shadow-2xl transform transition-transform duration-300 hover:shadow-3xl">
              <img
                className="w-full h-96 object-cover transform transition-transform duration-500 group-hover:scale-105"
                src={docInfo.image}
                alt={docInfo.name}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white space-y-1">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl p-2">
                    <img
                      src={assets.verified_icon}
                      className="w-full h-full object-contain"
                      alt="Verified"
                    />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{docInfo.name}</p>
                    <p className="text-sm font-medium text-white/90">
                      {docInfo.degree}
                    </p>
                  </div>
                </div>
                <span className="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-sm">
                  {docInfo.speciality}
                </span>
              </div>
            </div>
          </div>

          {/* Doctor Info Section */}
          <div className="flex-1 bg-white rounded-3xl shadow-2xl p-8 lg:p-10 w-full">
            <div className="space-y-8">
              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-5">
                <div className="col-span-2 sm:col-span-1 p-5 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl">
                  <p className="text-sm text-primary font-medium hover:text-primary/90 transition-colors">
                    Experience
                  </p>
                  <p className="text-3xl font-bold text-gray-900 mt-1 hover:text-primary transition-colors">
                    {docInfo.experience}+
                    <span className="text-lg text-gray-600 ml-1 hover:text-gray-700 transition-colors">Experience</span>
                  </p>
                </div>

                <div className="col-span-2 sm:col-span-1 p-5 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl">
                  <p className="text-sm text-primary font-medium hover:text-primary/90 transition-colors">Fee</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1 hover:text-primary transition-colors">
                    {currencySymbol}
                    {docInfo.fee}
                    <span className="text-lg text-gray-600 ml-1 hover:text-gray-700 transition-colors">/session</span>
                  </p>
                </div>
              </div>

              {/* Professional Bio */}
              <div className="space-y-5">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center">
                    <img
                      src={assets.info_icon}
                      className="w-5 h-5"
                      alt="Info"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 hover:text-primary transition-colors">
                    About Doctor
                  </h3>
                </div>
                <p className="text-gray-600 leading-relaxed text-lg hover:text-gray-700 transition-colors">
                  {docInfo.about}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Booking Section */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-12">
          <div className="max-w-4xl mx-auto">
            {/* Calendar Header */}
            <div className="text-center mb-14">
              <h2 className="text-3xl font-bold text-gray-900 mb-3 hover:text-primary transition-colors">
                Schedule Your Visit
              </h2>
              <p className="text-gray-600 max-w-lg mx-auto hover:text-gray-700 transition-colors">
                Select preferred date and time for your consultation
              </p>
            </div>

            {/* Date Selection */}
            <div className="mb-12">
              <div className="grid grid-cols-3 md:grid-cols-7 gap-2">
                {docSlots.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => setSlotIndex(index)}
                    className={`flex flex-col items-center p-3 rounded-xl cursor-pointer transition-all border-2 ${
                      slotIndex === index
                        ? "border-primary bg-primary text-white shadow-lg"
                        : "border-gray-200 hover:border-primary/30 bg-white text-gray-900 hover:text-primary"
                    }`}
                  >
                    <span className="block text-xs font-semibold uppercase tracking-wider">
                      {item?.[0]?.datetime &&
                        daysOfWeek[item[0].datetime.getDay()]}
                    </span>
                    <span className="block text-2xl font-bold mt-1.5">
                      {item?.[0]?.datetime && item[0].datetime.getDate()}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Time Selection */}
            <div className="mb-12">
              <h3 className="text-lg font-semibold text-gray-900 text-center mb-8 hover:text-primary transition-colors">
                Available Time Slots
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                {docSlots[slotIndex]?.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => setSlotTime(item.time)}
                    className={`p-4 text-base font-medium rounded-xl transition-all ${
                      item.time === slotTime
                        ? "bg-primary text-white shadow-lg"
                        : "bg-gray-50 hover:bg-primary/10 text-gray-600 hover:text-primary"
                    }`}
                  >
                    {item.time.toLowerCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* CTA Section */}
            <div className="text-center mt-10">
              <button
                onClick={bookAppointment}
                className="relative overflow-hidden bg-primary hover:bg-primary/90 text-white text-lg font-semibold py-5 px-20 rounded-2xl transition-all transform hover:scale-[1.02] shadow-xl hover:shadow-2xl"
              >
                <span className="relative z-10">Confirm Appointment</span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80 opacity-50 blur-lg transition-opacity hover:opacity-60" />
              </button>
              <p className="text-sm text-gray-500 mt-4 hover:text-gray-600 transition-colors">
                Please note that the appointment is subject to availability
              </p>
            </div>
          </div>
        </div>

        {/* Related Doctors */}
        <div className="mt-16">
          <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
        </div>
      </div>
    )
  );
};

export default Appointment;