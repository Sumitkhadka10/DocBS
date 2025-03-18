// backend/server.js
import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import adminRouter from './routes/adminRoute.js';
import doctorRouter from './routes/doctorRoute.js';
import userRouter from './routes/userRoute.js';
import { createServer } from 'http';
import { Server } from 'socket.io';

// App config
const app = express();
const port = process.env.PORT || 4000;
const server = createServer(app); // Create HTTP server for WebSocket
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Replace with your frontend URL (e.g., Vite default)
    methods: ["GET", "POST"],
  },
});

connectDB();
connectCloudinary();

// Middlewares
app.use(express.json());
app.use(cors());

// API endpoints
app.use('/api/admin', adminRouter);
app.use('/api/doctor', doctorRouter);
app.use('/api/user', userRouter);

// Make io accessible in controllers
app.set("io", io);

// WebSocket setup
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // Join a room based on userId (passed via auth token)
  socket.on("joinRoom", (userId) => {
    socket.join(userId);
    console.log(`User ${userId} joined room`);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

app.get('/', (req, res) => {
  res.send('API WORKING');
});

// Start server
server.listen(port, () => console.log("Server Started on port", port));