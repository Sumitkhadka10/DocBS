import mongoose from 'mongoose';

const firstAidSchema = new mongoose.Schema({
  category: { type: String, required: true },
  title: { type: String, required: true },
  steps: [{ type: String, required: true }],
  note: { type: String },
  icon: { type: String },
}, { timestamps: true });

export default mongoose.model('FirstAid', firstAidSchema);