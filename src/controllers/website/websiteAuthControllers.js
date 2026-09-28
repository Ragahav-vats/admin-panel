const User = require("../../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { OAuth2Client } = require("google-auth-library");

const googleClient = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID
);

const registerUser = async (request, response) => {
  try {

    const {
      name,
      email,
      mobile,
      password
    } = request.body;

    if (!name || !email || !mobile || !password) {
      return response.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return response.status(400).json({
        success: false,
        message: "User already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      mobile,
      password: hashedPassword
    });

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    response.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        profileImage: user.profileImage
      }
    });

  } catch (error) {

    response.status(500).json({
      success: false,
      message: error.message
    });

  }
};

const loginUser = async (request, response) => {
  try {

    const { email, password } = request.body;

    if (!email || !password) {
      return response.status(400).json({
        success: false,
        message: "Email and password are required"
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return response.status(404).json({
        success: false,
        message: "Invalid email or password"
      });
    }

    if (user.isBlocked) {
      return response.status(403).json({
        success: false,
        message: "Your account is blocked"
      });
    }

    const isPasswordMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordMatch) {
      return response.status(401).json({
        success: false,
        message: "Invalid email or password"
      });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    response.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        profileImage: user.profileImage
      }
    });

  } catch (error) {

    response.status(500).json({
      success: false,
      message: error.message
    });

  }
};

const googleLogin = async (request, response) => {
  try {

    const { credential } = request.body;

    if (!credential) {
      return response.status(400).json({
        success: false,
        message: "Google credential is required"
      });
    }

    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID
    });

    const payload = ticket.getPayload();

    const {
      sub,
      name,
      email,
      picture
    } = payload;

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name,
        email,
        mobile: "",
        password: sub,
        profileImage: picture || ""
      });
    }

    if (user.isBlocked) {
      return response.status(403).json({
        success: false,
        message: "Your account is blocked"
      });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    response.status(200).json({
      success: true,
      message: "Google login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        profileImage: user.profileImage
      }
    });

  } catch (error) {

    response.status(401).json({
      success: false,
      message: "Invalid Google credential"
    });

  }
};

module.exports = {
  registerUser,
  loginUser,
  googleLogin
};