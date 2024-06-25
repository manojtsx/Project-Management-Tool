const Project = require("../models/project-model");
const Task = require("../models/task-model");
const User = require("../models/user-model");
const deleteProjectById = require('../reusable/project-reusable')

const getAllProjects = async(req,res) =>{
  try{
    const userId = req.params.userId;
    const user = await User.findById(userId);
    if(!user) throw new Error('The user id doesnot match');

    // Using promise.all to wait for all find by Id
    const projects = await Promise.all(
      user.projects.map(async(item)=>{
        const project =  await Project.findById(item.projectId)
        if(project){
          const progress = await project.calculateProgress();
          return {...project.toObject(), progress};
        }
        return null;
      })
    )
    // Filter out any null results in case some projects were not found
    const validProjects = projects.filter(project => project !== null)

    res.status(200).json({validProjects});
  }catch(err){
    res.status(500).json({msg : err.message})
  }
}

const addProject = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { name, description } = req.body;
    const user = await User.findById(userId);
    if (!user) throw new Error("User doesn't exists for adding project");
    const project = new Project({
      name,
      description,
    });
    const createdProject = await project.save();
    
    // Adding the project id into the projects of user document
    user.projects.push({ projectId: createdProject._id });
    await user.save(); // Save the updated user
    res.status(200).json({ msg: "Project has been added." });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

const deleteProject = async (req, res) => {
  try {
    const projectId = req.params.projectId;
    await deleteProjectById(res,projectId);
    res.status(200).json({ msg: "Project deleted successfully" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

const editProject = async (req, res) => {
  try {
    const projectId = req.params.projectId;
    const { name, description, status } = req.body;
    const updatedProject = await Project.findByIdAndUpdate(
      projectId,
      {
        $set: {
          name: name,
          description: description,
          status: status,
        },
      },
      {
        new: true,
      }
    ); // {new : true} returns the updated documents
    if (!updatedProject) {
      return res.status(404).json({ msg: "Project not found" });
    }
    res.status(200).json({ msg: "Project updated successfully" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
const getProjectById = async (req, res) => {
  try {
    const projectId = req.params.projectId;
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ msg: "Project not found" });
    }
    res.status(200).json(project);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

module.exports = { getAllProjects, addProject, editProject, deleteProject, getProjectById };
