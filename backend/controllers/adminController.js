import validator from 'validator';
import bcrypt from 'bcrypt';
import { v2 as cloudinary } from 'cloudinary';
import doctorModel from '../models/doctorModel.js';
import jwt from 'jsonwebtoken';

// API for adding doctor
const addDoctor = async (req, res) => {
    try {
        const { name, email, password, speciality, degree, experience, about, fee, address } = req.body;
        const imageFile = req.file;

        // Checking for all required data
        if (!name || !email || !password || !speciality || !degree || !experience || !about || !fee || !address) {
            return res.status(400).json({ success: false, message: "Missing Details" });
        }

        // Validate email format
        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Please enter a valid email" });
        }

        // Validate password length
        if (password.length < 8) {
            return res.status(400).json({ success: false, message: "Password should be at least 8 characters" });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Upload image to Cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
        const imageUrl = imageUpload.secure_url;

        // Parse address safely
        const parsedAddress = typeof address === 'string' ? JSON.parse(address) : address;

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
            date: Date.now()
        };

        const newDoctor = new doctorModel(doctorData);
        await newDoctor.save();

        res.status(201).json({ success: true, message: "Doctor Added Successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// API for admin login
const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1d' });
            return res.status(200).json({ success: true, token });
        } else {
            return res.status(401).json({ success: false, message: "Invalid Credentials" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Api to get all doctor list for admin panel

const allDoctors = async (req, res) => {
    try {
        const doctors = await doctorModel.find({}).select('-password')
        res.json({sucess:true,doctors})
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message }); 
    }
}

export { addDoctor, loginAdmin, allDoctors};
