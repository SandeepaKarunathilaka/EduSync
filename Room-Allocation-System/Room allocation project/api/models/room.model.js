import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {

        type: String,
        required: true
    },
    capacity: {
        type: Number,
        required: true
    },
    resources: {
        type: [String],
        required: true
    },
    status: {
        type: String,
        enum: ["Available", "Occupied"],
        default: "Available"
    }
}, { timestamps: true });

export default mongoose.model("Room", RoomSchema);