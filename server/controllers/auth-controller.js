const User = require("../models/user-model");

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(username, password)
    const user = await User.findOne({ username});
    if (!user) {
      return res.status(401).json({ msg: "Invalid credentials" });
    }
    const isValid = await user.comparePassword(password);
    if (!isValid) return res.status(401).json({ msg: "Invalid credentials" });
    const token = user.generateToken();
    res.status(200).json({ msg: "Login successfully", token, user });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

const register = async (req, res) => {
  try {
    const { name, username, password } = req.body;
    const user = await User.findOne({ username: username });
    if (user) {
      return res
        .status(401)
        .json({ msg: "Username already exists. Try another username." });
    }
    const hashedPassword = await User.hashPassword(password);
    const newUser = new User({
      name,
      username,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(200).json({ msg: "Registered Successfully." });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

module.exports = { login, register };
