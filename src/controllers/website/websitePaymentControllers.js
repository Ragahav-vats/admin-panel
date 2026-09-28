const Razorpay = require("razorpay");
const Course = require("../../models/course");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const createPaymentOrder = async (request, response) => {
  try {
    const { courseId } = request.body;

    if (!courseId) {
      return response.status(400).json({
        success: false,
        message: "Course ID is required",
      });
    }

    const course = await Course.findOne({
      _id: courseId,
      status: "active",
    });

    if (!course) {
      return response.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    const options = {
      amount: course.price * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    response.status(200).json({
      success: true,
      message: "Payment order created successfully",
      order,
    });

  } catch (error) {
    response.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const crypto = require("crypto");

const verifyPayment = async (request, response) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    } = request.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      return response.status(200).json({
        success: true,
        message: "Payment verified successfully"
      });
    }

    return response.status(400).json({
      success: false,
      message: "Invalid payment signature"
    });

  } catch (error) {
    response.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  createPaymentOrder,
  verifyPayment
};