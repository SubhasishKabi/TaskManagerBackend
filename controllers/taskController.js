import Task from "../models/Task.js";

export const addTask = async (req, res) => {
  try {
    const newTask = await Task.create({
      data: req.body.data,
      createdAt: Date.now(),
    });
    await newTask.save();

    return res.status(200).json(newTask);
  } catch (err) {
    return res.status(500).json(err.message);
  }
};

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({}).sort({ createdAt: -1 });
    return res.status(200).json(tasks);
  } catch (err) {
    return res.status(500).json(err.message);
  }
};

export const markToDone = async (req, res) => {
  try {
    const taskRef = await Task.findById(req.params.id);

    const task = await Task.findOneAndUpdate(
      { _id: req.params.id },
      { done: !taskRef.done }
    );

    await task.save();

    return res.status(200).json(task);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export const updateTask = async (req, res) => {
  try {
    await Task.findOneAndUpdate(
      { _id: req.params.id },
      { data: req.body.data }
    );
    const task = await Task.findById(req.params.id);
    return res.status(200).json(task);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    return res.status(200).json(task);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
