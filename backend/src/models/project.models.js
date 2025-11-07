import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    content: { type: String, default: "" }
});

const projectSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    projectName: {
        type: String,
        required: true
    },
    files: [fileSchema],
});

export const Project = mongoose.model('Project', projectSchema);