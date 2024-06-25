const express = require('express');
const router = express.Router();
const userControllers =require('../controllers/user-controller');

router.route('/:userId').get(userControllers.getUserById);
router.route('/:userId/edit').put(userControllers.editUserById);
router.route('/:userId/delete').delete(userControllers.deleteUserById);

module.exports = router;
