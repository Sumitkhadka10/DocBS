// appointmentModel.js
import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  docId: { type: String, required: true },
  slotDate: { type: String, required: true },
  slotTime: { type: String, required: true },
  userData: { type: Object, required: true },
  docData: { type: Object, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  cancelled: { type: Boolean, default: false },
  payment: { type: Boolean, default: false },
  isCompleted: { type: Boolean, default: false },
  cancellationReason: { type: String, default: "" } // New field for cancellation reason
});

const appointmentModel = mongoose.models.Appointment || mongoose.model("Appointment", appointmentSchema);

export default appointmentModel;