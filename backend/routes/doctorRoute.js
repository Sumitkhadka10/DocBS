import express from 'express';
import { doctorList, loginDoctor, appointmentsDoctor, appointmentComplete, appointmentCancel, doctorProfile, updateDoctorProfile, doctorDashboard, getPatientReportCard, saveOrUpdatePatientReportCard } from '../controllers/doctorController.js';
import authDoctor from '../middlewares/authDoctor.js';

const doctorRouter = express.Router();

doctorRouter.get('/list', doctorList);
doctorRouter.post('/login', loginDoctor);
doctorRouter.get('/appointments', authDoctor, appointmentsDoctor);
doctorRouter.post('/complete-appointment', authDoctor, appointmentComplete);
doctorRouter.post('/cancel-appointment', authDoctor, appointmentCancel);
doctorRouter.get('/profile', authDoctor, doctorProfile);
doctorRouter.post('/update-profile', authDoctor, updateDoctorProfile);
doctorRouter.get('/dashboard', authDoctor, doctorDashboard);
doctorRouter.post('/patient-report-card', authDoctor, getPatientReportCard);
doctorRouter.post('/save-or-update-report-card', authDoctor, saveOrUpdatePatientReportCard);

export default doctorRouter;