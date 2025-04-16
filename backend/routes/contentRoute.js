import express from 'express';
import {
  addFirstAid,
  getAllFirstAid,
  updateFirstAid,
  deleteFirstAid,
  addHealthTip,
  getAllHealthTips,
  updateHealthTip,
  deleteHealthTip,
} from '../controllers/contentController.js';
import authAdmin from '../middlewares/authAdmin.js';

const contentRouter = express.Router();

// First Aid Routes
contentRouter.post('/first-aid', authAdmin, addFirstAid);
contentRouter.get('/first-aid', getAllFirstAid); // Public for user side
contentRouter.put('/first-aid/:id', authAdmin, updateFirstAid);
contentRouter.delete('/first-aid/:id', authAdmin, deleteFirstAid);

// Health Tips Routes
contentRouter.post('/health-tips', authAdmin, addHealthTip);
contentRouter.get('/health-tips', getAllHealthTips); // Public for user side
contentRouter.put('/health-tips/:id', authAdmin, updateHealthTip);
contentRouter.delete('/health-tips/:id', authAdmin, deleteHealthTip);

export default contentRouter;