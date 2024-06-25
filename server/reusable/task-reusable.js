const Task = require('../models/task-model');
const Project = require('../models/project-model');

const deleteTaskById = async(res,taskId) =>{
    try{
        const isDeleted = await Task.findByIdAndDelete(taskId);
        if (!isDeleted) throw new Error("Cannot delete. Check Task id once.");
        return isDeleted;
    }catch(err){
        if(!res.headerSent){
            res.status(500).json({msg : err.message});
          }
    }
}
module.exports = deleteTaskById;