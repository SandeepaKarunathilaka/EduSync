import mongoose from "mongoose";

const scheduleSchema = new mongoose.Schema({
    lecturer: { type: mongoose.Schema.Types.ObjectId, ref: "Lecturer", required: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
    timeSlot: {
        day: { type: String, required: true },
        startTime: { type: String, required: true },
        endTime: { type: String, required: true },
    },
    notes: String,
}, { timestamps: true });

const Schedule = mongoose.model("Schedule", scheduleSchema);
export default Schedule;