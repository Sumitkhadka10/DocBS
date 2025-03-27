import express from "express";
import {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  bookAppointment,
  listAppointment,
  cancelAppointment,
  saveReportCard,
  getReportCards,
  updateReportCard,
  getNotifications,
  markNotificationRead,
  verifyEmail,
  forgotPassword,
  resetPassword,
  googleLogin, 
} from "../controllers/userController.js";
import authUser from "../middlewares/authUser.js";
import upload from "../middlewares/multer.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/get-profile", authUser, getProfile);
userRouter.post("/update-profile", upload.single("image"), authUser, updateProfile);
userRouter.post("/book-appointment", authUser, bookAppointment);
userRouter.get("/appointments", authUser, listAppointment);
userRouter.post("/cancel-appointment", authUser, cancelAppointment);
userRouter.post("/save-report-card", authUser, saveReportCard);
userRouter.get("/report-cards", authUser, getReportCards);
userRouter.post("/update-report-card", authUser, updateReportCard);
userRouter.get("/notifications", authUser, getNotifications);
userRouter.post("/mark-notification-read", authUser, markNotificationRead);
userRouter.get("/verify-email/:token", verifyEmail);
userRouter.post("/forgot-password", forgotPassword);
userRouter.post("/reset-password/:token", resetPassword);
userRouter.post("/google-login", googleLogin); 

export default userRouter;