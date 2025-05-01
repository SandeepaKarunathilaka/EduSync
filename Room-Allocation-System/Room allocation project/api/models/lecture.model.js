import mongoose from "mongoose";

const lectureSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    duration: {
        type: Number,
        required: true,
    },
    lectureUrl: {
        type: String,
        required: true,
    },
    isPreview: {
        type: Boolean,
        default: false,
    },
    chapter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chapter",
        required: true,
    },
    deleteStatus: {
        type: Boolean,
        default: false,
    },
});

const Lecture = mongoose.model("Lecture", lectureSchema);
export default Lecture;