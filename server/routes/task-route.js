const express = require('express');
const router = express.Router();
const taskControllers = require('../controllers/task-controller');

// Implement route for the task
router.route('/:projectId/project').get(taskControllers.getAllTasks);
router.route('/:projectId/project/add').post(taskControllers.addTask)
router.route('/:taskId/edit').put(taskControllers.editTask);
router.route('/:taskId/delete').delete(taskControllers.deleteTask);
router.route('/:taskId').get(taskControllers.getTaskById);

module.exports = router;