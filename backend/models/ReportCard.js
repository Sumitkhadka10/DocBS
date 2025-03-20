import mongoose from "mongoose";

const reportCardSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  appointmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Appointment",
    required: false, // Optional for patient-created reports, required for doctor-created ones
  },
  date: {
    type: String,
    required: true,
  },
  doctorName: {
    type: String,
    required: true,
  },
  appointmentTime: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  page: {
    type: Number,
    required: true,
  },
}, { timestamps: true });

const reportCardModel = mongoose.models.reportCard || mongoose.model("reportCard", reportCardSchema);

export default reportCardModel;