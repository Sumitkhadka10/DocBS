import doctorModel from "../models/doctorModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointmentModel.js";
import reportCardModel from "../models/ReportCard.js";
import notificationModel from "../models/notificationModel.js";
import { v2 as cloudinary } from "cloudinary";

const changeAvailability = async (req, res) => {
    try {
        const { docId } = req.body;
        const docData = await doctorModel.findById(docId);
        await doctorModel.findByIdAndUpdate(docId, {
            available: !docData.available,
        });
        res.json({ success: true, message: "Availability changed successfully" });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
};

const doctorList = async (req, res) => {
    try {
        const doctors = await doctorModel.find({}).select(["-password", "-email"]);
        res.json({ success: true, doctors });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
};

const loginDoctor = async (req, res) => {
    try {
        const { email, password } = req.body;
        const doctor = await doctorModel.findOne({ email });

        if (!doctor) {
            return res.json({ success: false, message: "Invalid Credentials" });
        }

        const isMatch = await bcrypt.compare(password, doctor.password);

        if (isMatch) {
            const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET);
            res.json({ success: true, token });
        } else {
            res.json({ success: false, message: "Invalid Credentials" });
        }
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
};

const appointmentsDoctor = async (req, res) => {
    try {
        const { docId } = req.body;
        const appointments = await appointmentModel.find({ docId });
        res.json({ success: true, appointments });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
};

const appointmentComplete = async (req, res) => {
    try {
        const { docId, appointmentId } = req.body;
        const appointmentData = await appointmentModel.findById(appointmentId);
        if (appointmentData && appointmentData.docId == docId) {
            await appointmentModel.findByIdAndUpdate(appointmentId, {
                isCompleted: true,
            });
            return res.json({ success: true, message: "Appointment Completed" });
        } else {
            return res.json({ success: false, message: "Mark Failed" });
        }
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
};

const appointmentCancel = async (req, res) => {
    try {
        const { docId, appointmentId, cancellationReason } = req.body;

        if (!cancellationReason) {
            return res.json({ success: false, message: "Cancellation reason is required" });
        }

        const appointmentData = await appointmentModel.findById(appointmentId);
        if (appointmentData && appointmentData.docId == docId) {
            await appointmentModel.findByIdAndUpdate(appointmentId, {
                cancelled: true,
                cancellationReason,
            });

            const { slotDate, slotTime } = appointmentData;
            const doctorData = await doctorModel.findById(docId);
            let slots_booked = doctorData.slots_booked;
            slots_booked[slotDate] = slots_booked[slotDate].filter((e) => e !== slotTime);
            await doctorModel.findByIdAndUpdate(docId, { slots_booked });

            return res.json({ success: true, message: "Appointment Cancelled" });
        } else {
            return res.json({ success: false, message: "Cancellation Failed" });
        }
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
};

const doctorProfile = async (req, res) => {
    try {
        const { docId } = req.body;
        const profileData = await doctorModel.findById(docId).select("-password");
        res.json({ success: true, profileData });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
};

const updateDoctorProfile = async (req, res) => {
    try {
        const { name, fee, address, available, docId } = req.body;
        const imageFile = req.file;

        const updateData = {};
        if (name) updateData.name = name;
        if (fee) updateData.fee = fee;
        if (address) updateData.address = typeof address === "string" ? JSON.parse(address) : address;
        if (typeof available !== "undefined") updateData.available = available === "true" || available === true;

        if (imageFile) {
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
                resource_type: "image",
            });
            updateData.image = imageUpload.secure_url;
        }

        const updatedDoctor = await doctorModel.findByIdAndUpdate(docId, updateData, { new: true });
        res.json({ success: true, message: "Profile Updated Successfully", profileData: updatedDoctor });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
};

const doctorDashboard = async (req, res) => {
    try {
        const { docId } = req.body;
        const appointments = await appointmentModel.find({ docId });
        let patients = [];
        appointments.map((item) => {
            if (!patients.includes(item.userId)) {
                patients.push(item.userId);
            }
        });
        const dashData = {
            appointments: appointments.length,
            patients: patients.length,
            latestAppointments: appointments.reverse().slice(0, 5),
        };
        res.json({ success: true, dashData });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
};

const getPatientReportCard = async (req, res) => {
    try {
        const { docId, appointmentId } = req.body;
        const appointment = await appointmentModel.findById(appointmentId);

        if (!appointment || appointment.docId.toString() !== docId) {
            return res.json({ success: false, message: "Unauthorized or invalid appointment" });
        }

        const userId = appointment.userId;
        const reportCard = await reportCardModel.findOne({ userId, appointmentId });

        res.json({ success: true, reportCard });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
};

const saveOrUpdatePatientReportCard = async (req, res) => {
    try {
        const { docId, appointmentId, date, doctorName, appointmentTime, content } = req.body;
        const appointment = await appointmentModel.findById(appointmentId);

        if (!appointment || appointment.docId.toString() !== docId) {
            return res.json({ success: false, message: "Unauthorized or invalid appointment" });
        }

        const userId = appointment.userId;
        let reportCard = await reportCardModel.findOne({ userId, appointmentId });

        if (reportCard) {
            reportCard = await reportCardModel.findOneAndUpdate(
                { userId, appointmentId },
                { date, doctorName, appointmentTime, content },
                { new: true }
            );
        } else {
            reportCard = new reportCardModel({
                userId,
                appointmentId,
                date,
                doctorName,
                appointmentTime,
                content,
                page: 1,
            });
            await reportCard.save();
        }

        const notificationMessage = `Your medical report from Dr. ${doctorName} for your appointment on ${date} at ${appointmentTime} is now available.`;
        const notification = new notificationModel({
            userId,
            appointmentId,
            message: notificationMessage,
        });
        await notification.save();

        const io = req.app.get("io");
        io.to(userId).emit("newNotification", {
            _id: notification._id,
            message: notification.message,
            createdAt: notification.createdAt,
            isRead: false,
        });

        res.json({
            success: true,
            message: reportCard ? "Report card updated successfully" : "Report card created successfully",
            reportCard,
        });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
};

const changePassword = async (req, res) => {
    try {
        const { docId, currentPassword, newPassword } = req.body;

        const doctor = await doctorModel.findById(docId);
        if (!doctor) {
            return res.json({ success: false, message: "Doctor not found" });
        }

        const isMatch = await bcrypt.compare(currentPassword, doctor.password);
        if (!isMatch) {
            return res.json({ success: false, message: "Current password is incorrect" });
        }

        if (newPassword.length < 8) {
            return res.json({
                success: false,
                message: "New password must be at least 8 characters long",
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedNewPassword = await bcrypt.hash(newPassword, salt);

        await doctorModel.findByIdAndUpdate(docId, { password: hashedNewPassword });

        res.json({ success: true, message: "Password changed successfully" });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
};

export {
    changeAvailability,
    doctorList,
    loginDoctor,
    appointmentsDoctor,
    appointmentCancel,
    appointmentComplete,
    doctorProfile,
    updateDoctorProfile,
    doctorDashboard,
    getPatientReportCard,
    saveOrUpdatePatientReportCard,
    changePassword,
};