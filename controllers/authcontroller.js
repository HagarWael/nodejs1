const authService = require("../service/authService");

const registeredUser = async (req, res) => {
  try {
    const response = await authService.registeredUser(req.body);
    res.status(201).json({ response });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const response = await authService.loginUser(req.body);
    res.status(200).json({ response });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
module.exports = { registeredUser, loginUser };
