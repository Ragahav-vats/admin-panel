const Admin = require("../../models/admin");
const bcrypt = require("bcryptjs");
const generateToken = require("../../utils/generateToken");

const createAdmin = async (request, response) => {
  try {

    const { name, email, password, profileImage } = request.body;

    // Check all required fields
    if (!name || !email || !password) {
      return response.status(400).json({
        success: false,
        message: "Name, email and password are required",
      });
    }

    // Check admin already exists
    const existingAdmin = await Admin.findOne({ email });

    if (existingAdmin) {
      return response.status(400).json({
        success: false,
        message: "Admin already exists",
      });
    }

    // Create Admin
    const hashedPassword = await bcrypt.hash(password, 10);

        const admin = await Admin.create({
        name,
        email,
        password: hashedPassword,
        profileImage,
        });

    response.status(201).json({
      success: true,
      message: "Admin created successfully",
      admin,
    });

  } catch (error) {

    response.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

const loginAdmin = async (request, response) => {
  try {

    const { email, password } = request.body;

    if (!email || !password) {
      return response.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // Find admin by email
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return response.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    // Compare password
    const isPasswordCorrect = await bcrypt.compare(
      password,
      admin.password
    );

    if (!isPasswordCorrect) {
      return response.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = generateToken(admin._id);

    response.status(200).json({
      success: true,
      message: "Admin login successful",
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        profileImage: admin.profileImage,
      },
    });

  } catch (error) {

    response.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

const updateAdminProfile = async (request, response) => {
  try {

    const { name, email, profileImage } = request.body;

    const admin = await Admin.findById(request.params.id);

    if (!admin) {
      return response.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    // Update only the fields which are provided
    if (name) {
      admin.name = name;
    }

    if (email) {
      admin.email = email;
    }

    if (profileImage !== undefined) {
      admin.profileImage = profileImage;
    }

    admin.updatedAt = new Date();

    await admin.save();

    response.status(200).json({
      success: true,
      message: "Admin profile updated successfully",
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        profileImage: admin.profileImage,
        createdAt: admin.createdAt,
        updatedAt: admin.updatedAt,
      },
    });

  } catch (error) {

    response.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// admin password update
const changeAdminPassword = async (request, response) => {
  try {

    const { oldPassword, newPassword, confirmPassword } = request.body;

    // Check required fields
    if (!oldPassword || !newPassword || !confirmPassword) {
      return response.status(400).json({
        success: false,
        message: "Old password, new password and confirm password are required",
      });
    }

    // Check new password and confirm password
    if (newPassword !== confirmPassword) {
      return response.status(400).json({
        success: false,
        message: "New password and confirm password do not match",
      });
    }

    // Find admin
    const admin = await Admin.findById(request.params.id);

    if (!admin) {
      return response.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    // Check old password
    const isPasswordCorrect = await bcrypt.compare(
      oldPassword,
      admin.password
    );

    if (!isPasswordCorrect) {
      return response.status(401).json({
        success: false,
        message: "Old password is incorrect",
      });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password
    admin.password = hashedPassword;
    admin.updatedAt = new Date();

    await admin.save();

    response.status(200).json({
      success: true,
      message: "Password changed successfully",
    });

  } catch (error) {

    response.status(500).json({
      success: false,
      message: error.message,
    });

  }
};
// Get Admin Profile
const getAdminProfile = async (request, response) => {
  try {

   const admin = await Admin.findById(request.params.id).select("-password");

    if (!admin) {
      return response.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    response.status(200).json({
      success: true,
      message: "Admin profile fetched successfully",
      admin,
    });

  } catch (error) {

    response.status(500).json({
      success: false,
      message: error.message,
    });

  }
};


module.exports = {
    createAdmin,
  getAdminProfile,
  loginAdmin,
  updateAdminProfile,
  changeAdminPassword,
};