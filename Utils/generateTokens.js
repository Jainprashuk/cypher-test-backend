// generateTokenAndSetCookie.js
import jwt from 'jsonwebtoken';

const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ _id: userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.cookie('jwt', token, {
    httpOnly: true, // Prevents client-side scripts from accessing the cookie
    secure: process.env.NODE_ENV === 'development', // Ensures cookies are only sent over HTTPS
    sameSite: 'strict', // Prevents cross-site request forgery
    maxAge: 3600000, // 1 hour
  });
};

export default generateTokenAndSetCookie;
