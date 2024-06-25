const express = require('express');
const router = express.Router();
const projectControllers = require('../controllers/project-controller');

// Implement route for the task
router.route('/:userId/user').get(projectControllers.getAllProjects);
router.route('/:userId/user/add').post(projectControllers.addProject)
router.route('/:projectId/edit').put(projectControllers.editProject);
router.route('/:projectId/delete').delete(projectControllers.deleteProject);
router.route('/:projectId').get(projectControllers.getProjectById);

module.exports = router;