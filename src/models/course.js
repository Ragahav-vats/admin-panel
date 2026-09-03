const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    title : {
       type : String,
       required : true,
       trim : true,
    },
    description : {
        type : String,
        required : true,
        trim : true,
    },
    instructor : {
        type : String,
        required : true,
        trim : true,
    },
    category: {
        type: String,
        required: true,
        trim: true,
  },
   price : {
    type : Number,
    required : true,
    min : 0
   },
   duration: {
    type: String,
    required: true,
    trim: true,
  },

  thumbnail: {
    type: String,
    default: "",
  },

  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  updatedAt: {
    type: Date,
    default: Date.now,
  },

});

const Course = mongoose.model("Course",courseSchema);

module.exports = Course;