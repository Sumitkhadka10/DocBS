import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import userModel from "../models/userModel.js";
import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";
import reportCardModel from "../models/ReportCard.js";
import notificationModel from "../models/notificationModel.js";
import { scheduleJob } from "node-schedule";
import nodemailer from "nodemailer";
import { OAuth2Client } from "google-auth-library"; // Add Google OAuth2 client

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Google OAuth2 Client
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Register User with Email Verification
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.json({ success: false, message: "Missing Details" });
    }

    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Invalid Email" });
    }

    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Password should be at least 8 characters long",
      });
    }

    // Check if email already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.json({ success: false, message: "Email already registered" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userData = {
      name,
      email,
      password: hashedPassword,
      isVerified: false,
    };

    const newUser = new userModel(userData);
    const user = await newUser.save();

    // Generate verification token
    const verificationToken = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Send verification email
    const verificationLink = `${process.env.FRONTEND_URL}/verify-email/${verificationToken}`;
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Verify Your Email - Doctor Booking System",
      html: `<p>Please verify your email by clicking the link below:</p>
             <a href="${verificationLink}">Verify Email</a>
             <p>This link expires in 24 hours.</p>`,
    });

    res.json({
      success: true,
      message: "Registration successful! Please check your email to verify your account.",
    });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// Verify Email
const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded.id);

    if (!user) {
      return res.json({ success: false, message: "Invalid or expired token" });
    }

    if (user.isVerified) {
      return res.json({ success: false, message: "Email already verified" });
    }

    await userModel.findByIdAndUpdate(decoded.id, { isVerified: true });
    res.json({ success: true, message: "Email verified successfully" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Invalid or expired token" });
  }
};

// Forgot Password
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email || !validator.isEmail(email)) {
      return res.json({ success: false, message: "Please provide a valid email" });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    // Generate reset token
    const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Send reset email
    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset - Doctor Booking System",
      html: `<p>You requested a password reset. Click the link below to reset your password:</p>
             <a href="${resetLink}">Reset Password</a>
             <p>This link expires in 1 hour.</p>`,
    });

    res.json({
      success: true,
      message: "Password reset link sent to your email",
    });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// Reset Password
const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    if (!password || password.length < 8) {
      return res.json({
        success: false,
        message: "Password must be at least 8 characters long",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded.id);

    if (!user) {
      return res.json({ success: false, message: "Invalid or expired token" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await userModel.findByIdAndUpdate(decoded.id, { password: hashedPassword });
    res.json({ success: true, message: "Password reset successfully" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Invalid or expired token" });
  }
};

// Login User with Email Verification Check
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    if (!user.isVerified) {
      return res.json({
        success: false,
        message: "Please verify your email before logging in",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid Credentials" });
    }
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// Google Login/Signup
const googleLogin = async (req, res) => {
  try {
    const { token } = req.body; // Google ID token from frontend

    // Verify Google token
    const ticket = await googleClient.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();

    const { email, name, sub: googleId } = payload; // sub is Google's unique user ID

    // Check if user already exists
    let user = await userModel.findOne({ email });
    if (user) {
      // User exists, log them in
      if (!user.isVerified) {
        await userModel.findByIdAndUpdate(user._id, { isVerified: true }); // Auto-verify Google users
      }
      const jwtToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
      return res.json({ success: true, token: jwtToken, message: "Logged in with Google" });
    }

    // User doesn't exist, sign them up
    const userData = {
      name,
      email,
      password: "", // No password for Google users
      isVerified: true, // Google users are auto-verified
      googleId, // Store Google ID
    };

    const newUser = new userModel(userData);
    user = await newUser.save();

    const jwtToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({ success: true, token: jwtToken, message: "Signed up with Google" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Google authentication failed" });
  }
};

// Remaining functions remain unchanged
const getProfile = async (req, res) => {
  try {
    const { userId } = req.body;
    const userData = await userModel.findById(userId).select("-password");
    res.json({ success: true, userData });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { userId, name, phone, address, dob, gender } = req.body;
    const imageFile = req.file;

    if (!name || !phone || !dob || !gender) {
      return res.json({ success: false, message: "Please fill all fields" });
    }

    await userModel.findByIdAndUpdate(userId, {
      name,
      phone,
      address: JSON.parse(address),
      dob,
      gender,
    });

    if (imageFile) {
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });
      const imageURL = imageUpload.secure_url;
      await userModel.findByIdAndUpdate(userId, { image: imageURL });
    }

    res.json({ success: true, message: "Profile Updated Successfully" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

const createNotification = async (req, userId, appointmentId, slotDate, slotTime, docName) => {
  const [day, month, year] = slotDate.split('_');
  const appointmentDateTime = new Date(`${year}-${month}-${day} ${slotTime}`);
  const now = new Date();
  const minutesDiff = (appointmentDateTime - now) / (1000 * 60);

  let notificationTime;
  if (minutesDiff <= 10) {
    notificationTime = new Date();
  } else {
    notificationTime = new Date(appointmentDateTime - 15 * 60 * 1000);
  }

  const message = `Reminder: Your appointment with  ${docName} is scheduled for ${slotTime} on ${day}/${month}/${year}.`;
  const notification = new notificationModel({
    userId,
    appointmentId,
    message,
  });
  await notification.save();

  const io = req.app.get("io");
  scheduleJob(notificationTime, async () => {
    const reminderMessage = `Upcoming: Your appointment with  ${docName} is in 15 minutes at ${slotTime} on ${day}/${month}/${year}.`;
    const reminderNotification = new notificationModel({
      userId,
      appointmentId,
      message: reminderMessage,
    });
    await reminderNotification.save();

    io.to(userId).emit("newNotification", {
      _id: reminderNotification._id,
      message: reminderNotification.message,
      createdAt: reminderNotification.createdAt,
      isRead: false,
    });
    console.log(`Reminder notification emitted to user ${userId}: ${reminderMessage}`);
  });

  return notification;
};

const bookAppointment = async (req, res) => {
  try {
    const { userId, docId, slotDate, slotTime } = req.body;
    const docData = await doctorModel.findById(docId).select("-password");

    if (!docData || !docData.available) {
      return res.json({ success: false, message: "Doctor not available" });
    }

    let slotsBooked = docData.slots_booked || {};

    if (slotsBooked[slotDate] && slotsBooked[slotDate].includes(slotTime)) {
      return res.json({ success: false, message: "Slot already booked" });
    }

    if (!slotsBooked[slotDate]) {
      slotsBooked[slotDate] = [];
    }
    slotsBooked[slotDate].push(slotTime);

    const userData = await userModel.findById(userId).select("-password");

    const appointmentData = {
      userId,
      docId,
      userData,
      docData,
      amount: docData.fee,
      slotTime,
      slotDate,
      date: new Date(),
    };

    const newAppointment = new appointmentModel(appointmentData);
    await newAppointment.save();

    await doctorModel.findByIdAndUpdate(docId, { slots_booked: slotsBooked });

    await createNotification(req, userId, newAppointment._id, slotDate, slotTime, docData.name);

    res.json({ success: true, message: "Appointment Booked Successfully" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

const listAppointment = async (req, res) => {
  try {
    const { userId } = req.body;
    const appointments = await appointmentModel.find({ userId });
    res.json({ success: true, appointments });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

const cancelAppointment = async (req, res) => {
  try {
    const { userId, appointmentId } = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId);

    if (appointmentData.userId !== userId) {
      return res.json({ success: false, message: "Unauthorized Action" });
    }

    await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });

    const { docId, slotDate, slotTime } = appointmentData;
    const doctorData = await doctorModel.findById(docId);
    let slots_booked = doctorData.slots_booked;
    slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime);
    await doctorModel.findByIdAndUpdate(docId, { slots_booked });

    res.json({ success: true, message: "Appointment Cancelled Successfully" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

const saveReportCard = async (req, res) => {
  try {
    const { userId, date, doctorName, appointmentTime, content, page } = req.body;

    if (!date || !doctorName || !appointmentTime || !content || !page) {
      return res.json({ success: false, message: "All fields are required" });
    }

    const existingReport = await reportCardModel.findOne({ userId, page });
    if (existingReport) {
      return res.json({ success: false, message: "Report card already exists for this page. Use edit instead." });
    }

    const reportCard = new reportCardModel({
      userId,
      date,
      doctorName,
      appointmentTime,
      content,
      page,
    });

    await reportCard.save();
    res.json({ success: true, message: "Report card saved successfully" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

const updateReportCard = async (req, res) => {
  try {
    const { userId, date, doctorName, appointmentTime, content, page } = req.body;

    if (!date || !doctorName || !appointmentTime || !content || !page) {
      return res.json({ success: false, message: "All fields are required" });
    }

    const reportCard = await reportCardModel.findOneAndUpdate(
      { userId, page },
      { date, doctorName, appointmentTime, content },
      { new: true, upsert: false }
    );

    if (!reportCard) {
      return res.json({ success: false, message: "Report card not found for this page" });
    }

    res.json({ success: true, message: "Report card updated successfully", reportCard });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

const getReportCards = async (req, res) => {
  try {
    const { userId } = req.body;
    const reportCards = await reportCardModel.find({ userId }).sort({ page: 1 });
    res.json({ success: true, reportCards });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

const getNotifications = async (req, res) => {
  try {
    const { userId } = req.body;
    const notifications = await notificationModel
      .find({ userId })
      .sort({ createdAt: -1 })
      .populate('appointmentId', 'slotDate slotTime');
    res.json({ success: true, notifications });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

const markNotificationRead = async (req, res) => {
  try {
    const { userId, notificationId } = req.body;
    const notification = await notificationModel.findOneAndUpdate(
      { _id: notificationId, userId },
      { isRead: true },
      { new: true }
    );
    if (!notification) {
      return res.json({ success: false, message: "Notification not found" });
    }

    const io = req.app.get("io");
    io.to(userId).emit("notificationRead");

    res.json({ success: true, message: "Notification marked as read" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

const markAllAsRead = async (req, res) => {
  try {
    const { userId } = req.body;
    await notificationModel.updateMany(
      { userId, isRead: false },
      { isRead: true }
    );
    const io = req.app.get("io");
    io.to(userId).emit("notificationRead");
    res.json({ success: true, message: "All notifications marked as read" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

export {
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
  markAllAsRead,
  verifyEmail,
  forgotPassword,
  resetPassword,
  googleLogin, 
};