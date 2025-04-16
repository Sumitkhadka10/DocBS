import mongoose from 'mongoose';

const healthTipSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  points: [{ type: String, required: true }],
  icon: { type: String },
  colorClass: { type: String },
}, { timestamps: true });

export default mongoose.model('HealthTip', healthTipSchema);