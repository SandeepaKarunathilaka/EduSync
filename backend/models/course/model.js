const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    default: 0,
  },
  courseThumbnail: {
    type: String,
    required: true,
  },
  deleteStatus: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Course", courseSchema);
