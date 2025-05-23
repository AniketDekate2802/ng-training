const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
    assignedTo: String,
    status: String,
    dueDate: Date,
    priority: String,
    description: String
}, { timestamps: true });

module.exports = mongoose.model("Task", TaskSchema);