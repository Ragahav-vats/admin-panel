const Contact = require("../../models/contact");

const createContact = async (request, response) => {
  try {

    const {
      fullName,
      email,
      subject,
      message
    } = request.body;

    if (!fullName || !email || !subject || !message) {
      return response.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    const contact = await Contact.create({
      fullName,
      email,
      subject,
      message
    });

    response.status(201).json({
      success: true,
      message: "Contact message submitted successfully",
      contact
    });

  } catch (error) {

    response.status(500).json({
      success: false,
      message: error.message
    });

  }
};

module.exports = {
  createContact
};