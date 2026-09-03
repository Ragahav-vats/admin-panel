const jwt = require("jsonwebtoken");

const protectAdmin = (request, response, next) => {
  try {

    // Get token from request header
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return response.status(401).json({
        success: false,
        message: "Access denied. No token provided",
      });
    }

    // Get token
    const token = authHeader.split(" ")[1];

    // Verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // Store admin id in request
    request.adminId = decoded.id;

    next();

  } catch (error) {

    return response.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });

  }
};

module.exports = protectAdmin;