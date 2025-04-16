import validator from "validator";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointmentModel.js";
import userModel from "../models/userModel.js";
import nodemailer from "nodemailer";

// Set up nodemailer transporter for sending emails
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // Email address from environment variables
    pass: process.env.EMAIL_PASS, // Email password from environment variables
  },
});

// Function to generate a random password for new doctors
const generateRandomPassword = () => {
  const length = 12;
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
  let password = "";
  for (let i = 0; i < length; i++) {
    password += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return password;
};

// Add a new doctor to the system
const addDoctor = async (req, res) => {
  try {
    // Extract doctor details from request body
    const {
      name,
      email,
      speciality,
      degree,
      experience,
      about,
      fee,
      address,
    } = req.body;
    const imageFile = req.file; // Doctor's profile image

    // Check if all required fields are provided
    if (
      !name ||
      !email ||
      !speciality ||
      !degree ||
      !experience ||
      !about ||
      !fee ||
      !address
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Missing Details" });
    }

    // Validate email format
    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Please enter a valid email" });
    }

    // Check if doctor with this email already exists
    const existingDoctor = await doctorModel.findOne({ email });
    if (existingDoctor) {
      return res
        .status(400)
        .json({ success: false, message: "Email already registered" });
    }

    // Generate and hash a random password
    const password = generateRandomPassword();
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Upload doctor's profile image to Cloudinary
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });
    const imageUrl = imageUpload.secure_url;

    // Parse address if it's a string (e.g., from form data)
    const parsedAddress =
      typeof address === "string" ? JSON.parse(address) : address;

    // Create doctor data object
    const doctorData = {
      name,
      email,
      image: imageUrl,
      password: hashedPassword,
      speciality,
      degree,
      experience,
      about,
      fee: Number(fee),
      address: parsedAddress,
      date: Date.now(),
    };

    // Save new doctor to the database
    const newDoctor = new doctorModel(doctorData);
    await newDoctor.save();

    // Prepare email with login credentials
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Welcome to the Doctor Booking System - Your Login Credentials",
      html: `
        <p>Dear ${name},</p>
        <p>Welcome to the <strong>Doctor Booking System</strong>! You have been successfully added as a doctor by the admin. Below are your login credentials:</p>
        <ul>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Password:</strong> ${password}</li>
        </ul>
        <p>You can log in using the following link: <a href="${process.env.ADMIN_DOCTOR}/login">${process.env.ADMIN_DOCTOR}/login</a>.</p>
        <p>For security reasons, we strongly recommend changing your password after your first login.</p>
        <p>Best regards,<br/>The Doctor Booking System Team</p>
      `,
    };

    // Send email with credentials
    await transporter.sendMail(mailOptions);

    // Respond with success message
    res.status(201).json({
      success: true,
      message: "Doctor Added Successfully. Credentials sent to doctor's email.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Admin login function
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if provided credentials match admin credentials
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      // Generate JWT token for admin
      const token = jwt.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
      return res.status(200).json({ success: true, token });
    } else {
      return res
        .status(401)
        .json({ success: false, message: "Invalid Credentials" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all doctors
const allDoctors = async (req, res) => {
  try {
    // Fetch all doctors, excluding passwords
    const doctors = await doctorModel.find({}).select("-password");
    res.json({ success: true, doctors });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all appointments
const appointmentsAdmin = async (req, res) => {
  try {
    // Fetch all appointments
    const appointments = await appointmentModel.find({});
    res.json({ success: true, appointments });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// Cancel an appointment
const appointmentCancel = async (req, res) => {
  try {
    const { appointmentId, cancellationReason } = req.body;

    // Check if cancellation reason is provided
    if (!cancellationReason) {
      return res.json({
        success: false,
        message: "Cancellation reason is required",
      });
    }

    // Find appointment by ID
    const appointmentData = await appointmentModel.findById(appointmentId);
    if (!appointmentData) {
      return res.json({ success: false, message: "Appointment not found" });
    }

    // Update appointment to mark as cancelled
    await appointmentModel.findByIdAndUpdate(appointmentId, {
      cancelled: true,
      cancellationReason,
    });

    // Remove booked slot from doctor's schedule
    const { docId, slotDate, slotTime } = appointmentData;
    const doctorData = await doctorModel.findById(docId);
    let slots_booked = doctorData.slots_booked;
    slots_booked[slotDate] = slots_booked[slotDate].filter(
      (e) => e !== slotTime
    );
    await doctorModel.findByIdAndUpdate(docId, { slots_booked });

    // Respond with success message
    res.json({ success: true, message: "Appointment Cancelled Successfully" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// Get all users
const getAllUsers = async (req, res) => {
  try {
    // Fetch all users, excluding passwords
    const users = await userModel.find({}).select("-password");
    res.json({ success: true, users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get admin dashboard data
const adminDashboard = async (req, res) => {
  try {
    // Fetch all doctors, appointments, and users
    const doctors = await doctorModel.find({});
    const appointments = await appointmentModel.find({});
    const users = await userModel.find({});

    // Prepare dashboard data
    const dashData = {
      doctors: doctors.length,
      appointments: appointments.length,
      patients: users.length,
      latestAppointments: appointments.reverse().slice(0, 5), // Get 5 most recent appointments
    };

    // Respond with dashboard data
    res.json({ success: true, dashData });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// Export all controller functions
export {
  addDoctor,
  loginAdmin,
  allDoctors,
  appointmentsAdmin,
  appointmentCancel,
  getAllUsers,
  adminDashboard,
};