const taskModel = require("../models/task.model")

const getTasks = async (req, res) => {
    try {
        const tasks = await taskModel.find({
            user: req.user.id
        }).populate('user')
        res.json(tasks)
    } catch (error) {
        res.json({ message: "Task no found" })
    }
}

const CreateTasks = async (req, res) => {
    try {
        const { title, description, date } = req.body;

        const newTask = new taskModel({
            title,
            description,
            date,
            user: req.user.id
        })

        const savedTask = await newTask.save()
        res.json(savedTask)
    } catch (error) {
        res.status(404).json({ message: "Something wront bad" });

    }
}

const getTask = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await taskModel.findById(id).populate('user')
        if (!task) return res.status(404).json({ message: "task not found" });
        res.json(task)
    } catch (error) {
        res.status(404).json({ message: "task not found" });

    }
}

const UpdateTasks = async (req, res) => {
    try {
        const task = await taskModel.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        })
        if (!task) return res.status(404).json({ message: "task not found" });
        res.json(task)
    } catch (error) {
        return res.status(404).json({ message: "task not found" });
    }
}

const DeleteTasks = async (req, res) => {
    try {
        const task = await taskModel.findByIdAndDelete(req.params.id)
        if (!task) return res.status(404).json({ message: "task not found" });
        return res.sendStatus(204)
    } catch (error) {
        return res.status(404).json({ message: "task not found" });

    }
}

module.exports = {
    CreateTasks,
    DeleteTasks,
    UpdateTasks,
    getTask,
    getTasks,
}