import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  appointmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Appointment",
    required: false, // Made optional since report card notifications may not always link to an appointment
  },
  message: {
    type: String,
    required: true,
  },
  // Added type field to differentiate between notification purposes
  type: {
    type: String,
    enum: ["appointment_reminder", "report_card_available"], // Restrict to valid types
    required: true, // Ensure every notification has a type
  },
  isRead: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const notificationModel = mongoose.models.Notification || mongoose.model("Notification", notificationSchema);

export default notificationModel;