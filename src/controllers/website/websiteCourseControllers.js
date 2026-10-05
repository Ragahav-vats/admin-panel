const Course = require("../../models/course");
const mongoose = require("mongoose");

const getWebsiteCourses = async (request, response) => {
  try {
    const courses = await Course.find({
      status: "active"
    }).sort({ createdAt: -1 });

    const formattedCourses = courses.map((course) => {
      let image = course.thumbnail || "";

      if (image) {
        image = image.replaceAll("\\", "/");

        if (!image.startsWith("http")) {
          image = `${request.protocol}://${request.get("host")}/${image.replace(/^\/+/, "")}`;
        }
      }

      return {
        id: course._id,
        title: course.title,
        category: course.category,
        price: course.price,
        duration: course.duration,
        image
      };
    });

    response.status(200).json({
      success: true,
      message: "Courses fetched successfully",
      count: formattedCourses.length,
      courses: formattedCourses
    });

  } catch (error) {
    response.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const getWebsiteCourseById = async (request, response) => {
  try {

    const { id } = request.params;

    // Check course ID
    if (!id) {
      return response.status(400).json({
        success: false,
        message: "Course ID is required"
      });
    }

    // Check valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return response.status(400).json({
        success: false,
        message: "Invalid course ID"
      });
    }

    const course = await Course.findOne({
      _id: id,
      status: "active"
    });

    if (!course) {
      return response.status(404).json({
        success: false,
        message: "Course not found"
      });
    }

    response.status(200).json({
      success: true,
      message: "Course fetched successfully",
      course: {
        id: course._id,
        title: course.title,
        description: course.description,
        instructor: course.instructor,
        category: course.category,
        price: course.price,
        duration: course.duration,
        image: course.thumbnail || ""
      }
    });

  } catch (error) {

    console.error("Get Course By ID Error:", error);

    response.status(500).json({
      success: false,
      message: error.message
    });

  }
};

module.exports = {
  getWebsiteCourses,
  getWebsiteCourseById,
};