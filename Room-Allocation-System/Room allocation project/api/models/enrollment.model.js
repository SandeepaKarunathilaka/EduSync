import mongoose from "mongoose";
const enrollmentSchema = new mongoose.Schema({
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true,
    },
    student: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["pending", "active", "completed", "cancelled"],
        default: "pending",
    },
    deleteStatus: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

export default mongoose.model("Enrollment", enrollmentSchema);