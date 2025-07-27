import express from 'express';
import dotenv from 'dotenv';
import {connectDB} from './lib/db.js';
import cookieParser from 'cookie-parser';

import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';
import cors from 'cors'; // Middleware to enable CORS

dotenv.config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT;

app.use(express.json({ limit: '10mb' })); // or higher if needed
app.use(express.urlencoded({ limit: '10mb', extended: true }));
// app.use(express.json()); // Middleware to parse JSON requests


app.use(cookieParser()); // Middleware to parse cookies

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
})); // Middleware to enable CORS


app.use('/api/auth', authRoutes);
app.use('/api/message', messageRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB(); // Connect to MongoDB
});
