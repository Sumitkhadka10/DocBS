import firstAidModel from '../models/firstAidModel.js';
import healthTipModel from '../models/healthTipModel.js';

// First Aid CRUD
const addFirstAid = async (req, res) => {
  try {
    const { category, title, steps, note, icon } = req.body;
    if (!category || !title || !steps || !Array.isArray(steps)) {
      return res.status(400).json({ success: false, message: 'Missing or invalid required fields' });
    }
    const firstAid = new firstAidModel({ category, title, steps, note, icon });
    await firstAid.save();
    res.status(201).json({ success: true, message: 'First Aid content added successfully', data: firstAid });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const getAllFirstAid = async (req, res) => {
  try {
    const firstAidItems = await firstAidModel.find({});
    res.status(200).json({ success: true, data: firstAidItems });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateFirstAid = async (req, res) => {
  try {
    const { id } = req.params;
    const { category, title, steps, note, icon } = req.body;
    if (!category || !title || !steps || !Array.isArray(steps)) {
      return res.status(400).json({ success: false, message: 'Missing or invalid required fields' });
    }
    const updatedFirstAid = await firstAidModel.findByIdAndUpdate(
      id,
      { category, title, steps, note, icon },
      { new: true }
    );
    if (!updatedFirstAid) {
      return res.status(404).json({ success: false, message: 'First Aid content not found' });
    }
    res.status(200).json({ success: true, message: 'First Aid content updated successfully', data: updatedFirstAid });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteFirstAid = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedFirstAid = await firstAidModel.findByIdAndDelete(id);
    if (!deletedFirstAid) {
      return res.status(404).json({ success: false, message: 'First Aid content not found' });
    }
    res.status(200).json({ success: true, message: 'First Aid content deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Health Tips CRUD
const addHealthTip = async (req, res) => {
  try {
    const { title, description, points, icon, colorClass } = req.body;
    if (!title || !description || !points || !Array.isArray(points)) {
      return res.status(400).json({ success: false, message: 'Missing or invalid required fields' });
    }
    const healthTip = new healthTipModel({ title, description, points, icon, colorClass });
    await healthTip.save();
    res.status(201).json({ success: true, message: 'Health Tip added successfully', data: healthTip });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const getAllHealthTips = async (req, res) => {
  try {
    const healthTips = await healthTipModel.find({});
    res.status(200).json({ success: true, data: healthTips });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateHealthTip = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, points, icon, colorClass } = req.body;
    if (!title || !description || !points || !Array.isArray(points)) {
      return res.status(400).json({ success: false, message: 'Missing or invalid required fields' });
    }
    const updatedHealthTip = await healthTipModel.findByIdAndUpdate(
      id,
      { title, description, points, icon, colorClass },
      { new: true }
    );
    if (!updatedHealthTip) {
      return res.status(404).json({ success: false, message: 'Health Tip not found' });
    }
    res.status(200).json({ success: true, message: 'Health Tip updated successfully', data: updatedHealthTip });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteHealthTip = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedHealthTip = await healthTipModel.findByIdAndDelete(id);
    if (!deletedHealthTip) {
      return res.status(404).json({ success: false, message: 'Health Tip not found' });
    }
    res.status(200).json({ success: true, message: 'Health Tip deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export {
  addFirstAid,
  getAllFirstAid,
  updateFirstAid,
  deleteFirstAid,
  addHealthTip,
  getAllHealthTips,
  updateHealthTip,
  deleteHealthTip,
};