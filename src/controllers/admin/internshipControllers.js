const Internship = require("../../models/internship");

// Create Internship
const createInternship = async (request, response) => {
  try {
    const {
      title,
      description,
      company,
      type,
      category,
      duration,
      stipend,
      location,
      thumbnail,
      status,
    } = request.body;

    const internship = await Internship.create({
      title,
      description,
      company,
      type,
      category,
      duration,
      stipend,
      location,
      thumbnail: thumbnail || "",
      status: status || "active",
    });

    response.status(201).json({
      success: true,
      message: "Internship created successfully",
      internship,
    });
  } catch (error) {
    response.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// Get All Internships
const getInternships = async (request, response) => {
  try {
    const internships = await Internship.find().sort({ createdAt: -1 });

    response.status(200).json({
      success: true,
      message: "Internships fetched successfully",
      count: internships.length,
      internships,
    });
  } catch (error) {
    response.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// Get Internship By ID
const getInternshipById = async (request, response) => {
  try {
    const internship = await Internship.findById(request.params.id);

    if (!internship) {
      return response.status(404).json({
        success: false,
        message: "Internship not found",
      });
    }

    response.status(200).json({
      success: true,
      message: "Internship fetched successfully",
      internship,
    });
  } catch (error) {
    response.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// Filter Internships
const filterInternships = async (request, response) => {
  try {
    const { category, type, status } = request.query;

    const filter = {};

    if (category) {
      filter.category = category;
    }

    if (type) {
      filter.type = type;
    }

    if (status) {
      filter.status = status;
    }

    const internships = await Internship.find(filter).sort({
      createdAt: -1,
    });

    response.status(200).json({
      success: true,
      message: "Internships filtered successfully",
      count: internships.length,
      internships,
    });
  } catch (error) {
    response.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// Update Internship
const updateInternship = async (request, response) => {
  try {
    const internship = await Internship.findByIdAndUpdate(
      request.params.id,
      request.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!internship) {
      return response.status(404).json({
        success: false,
        message: "Internship not found",
      });
    }

    response.status(200).json({
      success: true,
      message: "Internship updated successfully",
      internship,
    });
  } catch (error) {
    response.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// Delete Internship
const deleteInternship = async (request, response) => {
  try {
    const internship = await Internship.findByIdAndDelete(
      request.params.id
    );

    if (!internship) {
      return response.status(404).json({
        success: false,
        message: "Internship not found",
      });
    }

    response.status(200).json({
      success: true,
      message: "Internship deleted successfully",
    });
  } catch (error) {
    response.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
    createInternship,
    getInternships,
    getInternshipById,
    filterInternships,
    updateInternship,
    deleteInternship,
};