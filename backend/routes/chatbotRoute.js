import express from 'express';
import { askQuestion } from '../controllers/chatbotController.js';
import authUser from '../middlewares/authUser.js';

const chatbotRouter = express.Router();

chatbotRouter.post('/ask', authUser, askQuestion);

export default chatbotRouter;