import mongoose from "mongoose";

const AvailabilitySchema = new mongoose.Schema({
    lecturerId: { type: mongoose.Schema.Types.ObjectId, ref: "Lecturer", required: true },
    availableDays: [String],
    availableTimes: [String],
    status: { type: String, default: "Pending" },
});

const Availability = mongoose.model("Availability", AvailabilitySchema);
export default Availability;