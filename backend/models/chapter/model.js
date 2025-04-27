const mongoose = require("mongoose");

const chapterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  deleteStatus: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Chapter", chapterSchema);
