import jwt from 'jsonwebtoken';

const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ _id: userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.cookie('jwt', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'None',
    maxAge: 3600000,
  });
};

export default generateTokenAndSetCookie;
