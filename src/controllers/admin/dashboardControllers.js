const User = require("../../models/user");
const Course = require("../../models/course");
const Internship = require("../../models/internship");

// Get Admin Dashboard Data
const getDashboard = async (request, response) => {
    try {
    // Total Counts
    const totalUsers = await User.countDocuments();

    const totalCourses = await Course.countDocuments();

    const totalInternships = await Internship.countDocuments();

    // Active Counts
    const activeCourses = await Course.countDocuments({
      status: "active",
    });

    const activeInternships = await Internship.countDocuments({
      status: "active",
    });

    // Recent Users
    const recentUsers = await User.find()
      .select("-password")
      .sort({ createdAt: -1 })
      .limit(5);

    // Recent Courses
    const recentCourses = await Course.find()
      .sort({ createdAt: -1 })
      .limit(5);

    // Recent Internships
    const recentInternships = await Internship.find()
      .sort({ createdAt: -1 })
      .limit(5);

    // Response
    response.status(200).json({
      success: true,
      message: "Dashboard data fetched successfully",
      dashboard: {
        totalUsers,
        totalCourses,
        totalInternships,
        activeCourses,
        activeInternships,
        recentUsers,
        recentCourses,
        recentInternships,
      },
    });
  } catch (error) {
    response.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = getDashboard;