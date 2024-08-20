import express from 'express';
import mongoose from 'mongoose';
// import './Utils/UploadQuestion.js'
import cors from 'cors';
import 'dotenv/config';
import './Db/connectdb.js';
import authrouter from './Routes/AuthRoutes.js';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken'; // Ensure you import jwt if you use it
import User from './Models/Users.js';
import router from './Routes/QuizRoutes.js';
import './cronjobs.js'
import GetQuestion from './Routes/GetQuestions.js';

const PORT = process.env.PORT || 3000;

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser()); // Cookie-parser middleware should be before the routes
app.use(cors({
    origin: 'http://localhost:5173', // Your frontend URL
    credentials: true, // Allow cookies and other credentials
  }));



// Define routes
app.use('/auth', authrouter);
app.use(router)
app.use(GetQuestion)

app.get('/api/check', async (req, res) => {
    const token = req.cookies.jwt;
    console.log(token)
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized, token missing' });
    }
  
    try {
      const verified = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(verified._id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      // If user exists, return user data
      return res.status(200).json({ user });
    } catch (err) {
      // Handle token verification error or other issues
      return res.status(401).json({ message: 'Unauthorized, invalid token' });
    }
  });

// app.get('/test-cookie', (req, res) => {
//     const token = req.cookies.token;
//     console.log('Token:', token);
//     res.send(`Token: ${token}`);
// });


app.get('/', (req, res) => {
    console.log('Hello World');
    res.send("dfhdh");
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
