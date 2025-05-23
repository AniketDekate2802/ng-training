const Task = require("../models/Task");

// Get all tasks
const getTasks = async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
};

// Create a task
const createTask = async (req, res) => {
    const newTask = new Task(req.body);
    const savedTask = await newTask.save();
    res.json(savedTask);
};

// Update a task
const updateTask = async (req, res) => {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedTask);
};

// Delete a task
const deleteTask = async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted" });
};

module.exports = {
    getTasks,
    createTask,
    updateTask,
    deleteTask
};