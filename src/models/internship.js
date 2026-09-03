const mongoose = require("mongoose");

const internshipSchema = new mongoose.Schema({

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

    company : {
        type : String,
        required : true,
        trim : true,
    },

    type : {
        type : String,
        enum : ["internship","summer-internship"],
        required : true,
        trim : true,
    },

    category : {
        type : String,
        required : true,
        trim : true,
    },

    duration : {
        type : String,
        required : true,
        trim : true,
    },

    stipend : {
        type : Number,
        default : 0,
        min : 0,
    },

    location: {
        type: String,
        required: true,
        trim: true,
    },

    thumbnail : {
        type : String,
        default : "",
        trim : true,
    },

    status : {
        type : String,
        enum : ["active","inactive"],
        default : "active",
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

const Internship = mongoose.model("Internship",internshipSchema);

module.exports = Internship;