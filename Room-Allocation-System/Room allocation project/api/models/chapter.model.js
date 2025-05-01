import mongoose from "mongoose";

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

const Chapter = mongoose.model("Chapter", chapterSchema);
export default Chapter;