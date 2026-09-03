const Course = require("../../models/course");

const createCourse = async (request, response) => {
  try {

    const {
      title,
      description,
      category,
      instructor,
      price,
      duration,
      thumbnail,
      status
    } = request.body;

    // Check required fields
    if (!title || !description || !category || !price || !duration) {
      return response.status(400).json({
        success: false,
        message: "Title, description, category, price and duration are required",
      });
    }

    // Create course
    const course = await Course.create({
      title,
      description,
      category,
      instructor,
      price,
      duration,
      thumbnail: thumbnail || "",
      status: status || "active",
    });

    response.status(201).json({
      success: true,
      message: "Course created successfully",
      course,
    });

  } catch (error) {

    response.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

const getCourses = async (request, response) => {
  try {

    const courses = await Course.find()
      .sort({ createdAt: -1 });

    response.status(200).json({
      success: true,
      message: "Courses fetched successfully",
      count: courses.length,
      courses,
    });

  } catch (error) {

    response.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

const getCourseById = async (request, response) => {
  try {

    const course = await Course.findById(request.params.id);

    if (!course) {
      return response.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    response.status(200).json({
      success: true,
      message: "Course fetched successfully",
      course,
    });

  } catch (error) {

    response.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

const filterCourses = async (request, response) => {
  try {

    const { category, status } = request.query;

    const filter = {};

    if (category) {
      filter.category = category;
    }

    if (status) {
      filter.status = status;
    }

    const courses = await Course.find(filter)
      .sort({ createdAt: -1 });

    response.status(200).json({
      success: true,
      message: "Courses filtered successfully",
      count: courses.length,
      courses,
    });

  } catch (error) {

    response.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

const updateCourse = async (request, response) => {
  try {

    const {
      title,
      description,
      category,
      price,
      duration,
      thumbnail,
      status
    } = request.body;

    const course = await Course.findById(request.params.id);

    if (!course) {
      return response.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    if (title) {
      course.title = title;
    }

    if (description) {
      course.description = description;
    }

    if (category) {
      course.category = category;
    }

    if (price !== undefined) {
      course.price = price;
    }

    if (duration) {
      course.duration = duration;
    }

    if (thumbnail !== undefined) {
      course.thumbnail = thumbnail;
    }

    if (status) {
      course.status = status;
    }

    course.updatedAt = new Date();

    await course.save();

    response.status(200).json({
      success: true,
      message: "Course updated successfully",
      course,
    });

  } catch (error) {

    response.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

const deleteCourse = async (request, response) => {
  try {

    const course = await Course.findById(request.params.id);

    if (!course) {
      return response.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    await Course.findByIdAndDelete(request.params.id);

    response.status(200).json({
      success: true,
      message: "Course deleted successfully",
    });

  } catch (error) {

    response.status(500).json({
      success: false,
      message: error.message,
    });

  }
};


module.exports = {
  createCourse,
  getCourses,
  getCourseById,
  filterCourses,
  updateCourse,
  deleteCourse,
};