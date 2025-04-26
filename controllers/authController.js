const authService = require('../services/authService');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    await authService.registerUser(username, email, password);
    res.json({ msg: 'User registered successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const token = await authService.loginUser(email, password);
    res.json({ token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.dashboard = (req, res) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ msg: `Welcome user with ID: ${decoded.id}` });
  } catch (err) {
    res.status(400).json({ msg: 'Token is not valid' });
  }
};
