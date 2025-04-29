import mongoose from "mongoose"; // ✅ Add this line

const BookingSchema = new mongoose.Schema({
    roomId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room",
        required: true,
    },
    requestedTime: {
        type: Date,
        required: true,
    },
    endTime: {
        type: Date,
        required: true,
    },
    reason: {
        type: String,
        required: true,
    },
    userId: { // ✅ Ensure userId exists
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    status: { // ✅ Add status field
        type: String,
        enum: ["Pending", "Approved", "Rejected"],
        default: "Pending",
    },
}, { timestamps: true });

export default mongoose.model("Booking", BookingSchema);