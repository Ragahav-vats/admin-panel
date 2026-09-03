const User = require("../../models/user");
const bcrypt = require("bcrypt");


const createUser = async (request, response) => {
  try {

    const { name, email, mobile, password, profileImage } = request.body;

    // Check required fields
    if (!name || !email || !mobile || !password) {
      return response.status(400).json({
        success: false,
        message: "Name, email, mobile and password are required",
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return response.status(400).json({
        success: false,
        message: "User already exists with this email",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      email,
      mobile,
      password: hashedPassword,
      profileImage: profileImage || "",
    });

    response.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        profileImage: user.profileImage,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });

  } catch (error) {

    response.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

const getUsers = async (request, response) => {
  try {

    const users = await User.find()
      .select("-password")
      .sort({ createdAt: -1 });

    response.status(200).json({
      success: true,
      message: "Users fetched successfully",
      count: users.length,
      users,
    });

  } catch (error) {

    response.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

const getUserById = async (request, response) => {
  try {

    const user = await User.findById(request.params.id)
      .select("-password");

    if (!user) {
      return response.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    response.status(200).json({
      success: true,
      message: "User fetched successfully",
      user,
    });

  } catch (error) {

    response.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

const updateUser = async (request, response) => {
  try {

    const { name, email, mobile, profileImage } = request.body;

    const user = await User.findById(request.params.id);

    if (!user) {
      return response.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (name) {
      user.name = name;
    }

    if (email) {
      user.email = email;
    }

    if (mobile) {
      user.mobile = mobile;
    }

    if (profileImage !== undefined) {
      user.profileImage = profileImage;
    }

    user.updatedAt = new Date();

    await user.save();

    response.status(200).json({
      success: true,
      message: "User updated successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        profileImage: user.profileImage,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });

  } catch (error) {

    response.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

const deleteUser = async (request, response) => {
  try {

    const user = await User.findById(request.params.id);

    if (!user) {
      return response.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    await User.findByIdAndDelete(request.params.id);

    response.status(200).json({
      success: true,
      message: "User deleted successfully",
    });

  } catch (error) {

    response.status(500).json({
      success: false,
      message: error.message,
    });

  }
};


module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};