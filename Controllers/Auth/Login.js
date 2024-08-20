import User from "../../Models/Users.js";
import bcrypt from 'bcrypt';
import generateTokenAndSetCookie from "../../Utils/generateTokens.js";

const Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({
        message: "Invalid password",
      });
    }

    // Call the utility function to generate the token and set the cookie
    generateTokenAndSetCookie(user._id, res);

    // Respond with user details and success message
    res.status(200).json({
      message: "Login successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });

  } catch (error) {
    console.log("Error in login controller", error.message);
    next(error);
  }
};

export default Login;
