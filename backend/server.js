import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import adminRouter from './routes/adminRoute.js';
import doctorRouter from './routes/doctorRoute.js';
import userRouter from './routes/userRoute.js';
import contentRouter from './routes/contentRoute.js';
import chatbotRouter from './routes/chatbotRoute.js';
import { createServer } from 'http';
import { Server } from 'socket.io';

// App config
const app = express();
const port = process.env.PORT || 4000;
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: [
      process.env.FRONTEND_URL, // http://localhost:5173
      process.env.ADMIN_DOCTOR, // http://localhost:5174
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  },
});

connectDB();
connectCloudinary();

// Middlewares
app.use(express.json());
app.use(cors({
  origin: [
    process.env.FRONTEND_URL,
    process.env.ADMIN_DOCTOR,
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

// API endpoints
app.use('/api/admin', adminRouter);
app.use('/api/doctor', doctorRouter);
app.use('/api/user', userRouter);
app.use('/api/content', contentRouter);
app.use('/api/chat', chatbotRouter);

// Make io accessible in controllers
app.set('io', io);

// WebSocket setup
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('joinRoom', (userId) => {
    socket.join(userId);
    console.log(`User ${userId} joined room`);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

app.get('/', (req, res) => {
  res.send('API WORKING');
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy' });
});

server.listen(port, () => console.log(`Server started on port ${port}`));