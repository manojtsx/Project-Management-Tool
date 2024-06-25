const User = require("../models/user-model");
const deleteProjectById = require("../reusable/project-reusable");

const getUserById = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    if (!user) throw new Error("Cannot find user");
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
const editUserById = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { name, username } = req.body;

    //Ensuring both username and name are provided
    if (!name || !username) {
      return res.status(400).json({ msg: "Name and Username are required." });
    }
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          name: name,
          username: username,
        },
      },
      { new: true }
    );

    if (!updatedUser) throw new Error("Couldnot update user");
    res.status(200).json({ msg: "User updated successfully" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
const deleteUserById = async (req, res) => {
  try {
      const userId = req.params.userId;
    const user = await User.findById(userId);
    if (!user) throw new Error("Couldnot get user");
    for (let item in user.projects) {
      const isDeleted = await deleteProjectById(item.projectId);
      if (!isDeleted)
        throw new Error("Couldnot find project or task to delete user");
    }
    const isDeleted = await User.findByIdAndDelete(userId);
    if (!isDeleted) throw new Error("Couldnot find a user to delete");
    res.status(200).json({ msg: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

module.exports = { getUserById, editUserById, deleteUserById };
