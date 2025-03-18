import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  appointmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Appointment",
    required: true,
  },
  message: {
    type: String,
    required: true,
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