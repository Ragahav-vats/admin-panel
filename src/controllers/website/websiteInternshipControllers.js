const Internship = require("../../models/internship");

const getWebsiteInternships = async (request, response) => {
  try {

    const internships = await Internship.find({
      status: "active"
    }).sort({ createdAt: -1 });

    const formattedInternships = internships.map((internship) => {

      let image = internship.thumbnail || "";

      if (image) {
        image = image.replaceAll("\\", "/");

        if (!image.startsWith("http")) {
          image = `${request.protocol}://${request.get("host")}/${image.replace(/^\/+/, "")}`;
        }
      }

      return {
        id: internship._id,
        title: internship.title,
        description: internship.description,
        company: internship.company,
        type: internship.type,
        category: internship.category,
        duration: internship.duration,
        stipend: internship.stipend,
        location: internship.location,
        image,
      };
    });

    response.status(200).json({
      success: true,
      message: "Internships fetched successfully",
      count: formattedInternships.length,
      internships: formattedInternships
    });

  } catch (error) {

    response.status(500).json({
      success: false,
      message: error.message
    });

  }
};

const getWebsiteInternshipById = async (request, response) => {
  try {

    const internship = await Internship.findOne({
      _id: request.params.id,
      status: "active"
    });

    if (!internship) {
      return response.status(404).json({
        success: false,
        message: "Internship not found"
      });
    }

    let image = internship.thumbnail || "";

    if (image) {
      image = image.replaceAll("\\", "/");

      if (!image.startsWith("http")) {
        image = `${request.protocol}://${request.get("host")}/${image.replace(/^\/+/, "")}`;
      }
    }

    response.status(200).json({
      success: true,
      message: "Internship fetched successfully",
      internship: {
        id: internship._id,
        title: internship.title,
        description: internship.description,
        company: internship.company,
        type: internship.type,
        category: internship.category,
        duration: internship.duration,
        stipend: internship.stipend,
        location: internship.location,
        image
      }
    });

  } catch (error) {

    response.status(500).json({
      success: false,
      message: error.message
    });

  }
};

module.exports = {
  getWebsiteInternships,
  getWebsiteInternshipById
};