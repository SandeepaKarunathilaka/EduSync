import mongoose from "mongoose";

const lecturerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    expertise: { type: String, required: true },
    availability: {
        type: String,
        enum: ["Full-time", "Part-time"],
        default: "Full-time",
    },
});

const Lecturer = mongoose.model("Lecturer", lecturerSchema);
export default Lecturer;