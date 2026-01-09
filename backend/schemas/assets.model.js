import mongoose, { Schema } from "mongoose";

const assetSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        enum: ["Hardware", "Software", "Documentation"],
        required: true
    },
    content: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["Available", "In Use", "Maintenance"],
        default: "Available"
    },
    assignedTo: {
        type: Schema.Types.ObjectId,
        ref: "User",
        default: null
    }
}, { timestamps: true });

export const Asset = mongoose.model("Asset", assetSchema);