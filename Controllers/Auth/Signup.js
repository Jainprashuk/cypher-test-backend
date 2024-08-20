import createError from '../../Utils/appError.js';
import bcrypt from 'bcrypt';
import User from '../../Models/Users.js';
import generateTokenAndSetCookie from '../../Utils/generateTokens.js';

const Signup = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({
                status: 'error',
                message: 'Email already exists',
            });
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = await User.create({
            ...req.body,
            password: hashedPassword
        });

        // Use the utility function to generate the token and set the cookie
        generateTokenAndSetCookie(newUser._id, res);

        // Respond with a success message
        res.status(201).json({
            status: 'success',
            message: 'User registered successfully'
        });

    } catch (error) {
        next(error);
    }
};

export default Signup;
