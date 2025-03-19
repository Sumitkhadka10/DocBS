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

// API to register user
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

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userData = {
      name,
      email,
      password: hashedPassword,
    };

    const newUser = new userModel(userData);
    const user = await newUser.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.json({ success: true, token });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// API for user login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid Credentials" });
    }
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// API to get user profile data
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

// API to update user profile data
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

// Function to create and schedule notifications with WebSocket
const createNotification = async (req, userId, appointmentId, slotDate, slotTime, docName) => {
  const [day, month, year] = slotDate.split('_');
  const appointmentDateTime = new Date(`${year}-${month}-${day} ${slotTime}`);
  const now = new Date();
  const minutesDiff = (appointmentDateTime - now) / (1000 * 60);

  let notificationTime;
  if (minutesDiff <= 10) {
    notificationTime = new Date(); // Immediate notification
  } else {
    notificationTime = new Date(appointmentDateTime - 15 * 60 * 1000); // 15 minutes before
  }

  // Immediate confirmation notification
  const message = `Reminder: Your appointment with Dr. ${docName} is scheduled for ${slotTime} on ${day}/${month}/${year}.`;
  const notification = new notificationModel({
    userId,
    appointmentId,
    message,
  });
  await notification.save();

  // Schedule the reminder notification
  const io = req.app.get("io"); // Access Socket.IO instance
  scheduleJob(notificationTime, async () => {
    const reminderMessage = `Upcoming: Your appointment with Dr. ${docName} is in 15 minutes at ${slotTime} on ${day}/${month}/${year}.`;
    const reminderNotification = new notificationModel({
      userId,
      appointmentId,
      message: reminderMessage,
    });
    await reminderNotification.save();

    // Emit the reminder to the user's WebSocket room
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

// API to book appointment
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

    // Creating notification with WebSocket support
    await createNotification(req, userId, newAppointment._id, slotDate, slotTime, docData.name);

    res.json({ success: true, message: "Appointment Booked Successfully" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// API to get user appointments
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

// API to cancel appointment
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

// API to save report card
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

// API to update report card
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

// API to get all report cards for a user
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

// API to get user notifications
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

// API to mark notification as read
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

    // Emit WebSocket event to update unread count
    const io = req.app.get("io");
    io.to(userId).emit("notificationRead");

    res.json({ success: true, message: "Notification marked as read" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

export { 
  registerUser, loginUser, getProfile, updateProfile, bookAppointment, 
  listAppointment, cancelAppointment, saveReportCard, getReportCards, 
  updateReportCard, getNotifications, markNotificationRead 
};