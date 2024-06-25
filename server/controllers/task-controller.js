const Task = require("../models/task-model");
const Project = require("../models/project-model");
const {deleteTaskById, findProjectByTaskId} = require("../reusable/task-reusable");
const getAllTasks = async (req, res) => {
  try {
    const projectId = req.params.projectId;
    const project = await Project.findById(projectId);
    if (!project) throw new Error("The project id doesnot match");

    // Using promise.all to wait for all find by Id
    const projects = await Promise.all(
      project.tasks.map(async (item) => {
        return await Task.findById(item.taskId);
      })
    );

    // Filter out any null results in case some projects were not found
    const validTasks = projects.filter((task) => task !== null);
    res.status(200).json({ validTasks });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

const addTask = async (req, res) => {
  try {
    const projectId = req.params.projectId;
    const { name, description, deadline } = req.body;
    const project = await Project.findById(projectId);
    if (!project) throw new Error("Project doesn't exists for adding task");
    const task = new Task({
      name,
      description,
      deadline,
    });
    const createdTask = await task.save();

    // Adding the task id into the projects of project document
    project.tasks.push({ taskId: createdTask._id });
    await project.save(); // Save the updated project
    res.status(200).json({ msg: "Task has been added." });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const taskId = req.params.taskId;
    // Assuming a function to find a project by taskId exists and is used here
    const project = await Project.findOne({ "tasks.taskId": taskId });
    if (!project) {
      return res.status(404).json({ msg: "Project not found" });
    }

    // Assuming deleteTaskById is a function that deletes the task from the database
    await Task.findOneAndDelete(taskId);

    // Remove taskId from the project's task array
    project.tasks = project.tasks.filter(task => task.taskId.toString() !== taskId);

    // Save the updated project
    await project.save();

    res.status(200).json({ msg: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ msg: err.message }); 
  } 
};

const editTask = async (req, res) => {
  try {
    const taskId = req.params.taskId;
    const { name, description, status, deadline } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      {
        $set: {
          name: name,
          description: description,
          status: status,
          deadline: deadline,
        },
      },
      {
        new: true,
      }
    ); // {new : true} returns the updated documents
    if (!updatedTask) {
      return res.status(404).json({ msg: "Task not found" });
    }
    res.status(200).json({ msg: "Task updated successfully" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

const getTaskById = async (req, res) => {
  try {
    const taskId = req.params.taskId;
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }
    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

module.exports = { getAllTasks, addTask, editTask, deleteTask, getTaskById };
