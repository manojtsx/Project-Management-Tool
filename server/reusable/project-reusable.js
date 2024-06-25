const deleteTaskById = require("./task-reusable");
const Project = require("../models/project-model");

const deleteProjectById = async (res,projectId) => {
  try {
    const project = await Project.findById(projectId);
    if (!project) throw new Error("Project id not found");
    
    // Delete tasks associated with the projects
    for (const item of project.tasks) {
      const taskDeletionResult = await deleteTaskById(res,item.taskId);
      if (!taskDeletionResult) {
        throw new Error(`failed to delete task ${item.taskId}`);
      }
    } 
    const isDeleted = await Project.findByIdAndDelete(projectId);
    if (!isDeleted) throw new Error("Cannot delete. Check Project id once.");
    return isDeleted; 
  } catch (err) {
    if(!res.headerSent){
      res.status(500).json({msg : err.message});
    }
  }
};



module.exports = deleteProjectById;
