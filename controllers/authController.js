const User = require('../models/User');
const jwt = require('jsonwebtoken');
const {
  generateAccessToken,
  generateRefreshToken
} = require('../utils/token');
// const tokenUtils = require('../utils/token');
// console.log("tokenUtils:" , tokenUtils);

// In-memory refresh token store (for simplicity)
let refreshTokens = [];

exports.register = async (req, res) => {
  const { email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) return res.status(400).json({ error: 'User already exists' });

  const user = await User.create({ email, password });

  const accessToken = generateAccessToken(user._id);
  const refreshToken = generateRefreshToken(user._id);

  refreshTokens.push(refreshToken);

  res.status(201).json({ accessToken, refreshToken });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password)))
    return res.status(401).json({ error: 'Invalid credentials' });

  const accessToken = generateAccessToken(user._id);
  const refreshToken = generateRefreshToken(user._id);

  refreshTokens.push(refreshToken);

  res.json({ accessToken, refreshToken });
};

exports.refreshToken = (req, res) => {
  const { token } = req.body;
  if (!token) return res.status(401).json({ error: 'Refresh token required' });
  if (!refreshTokens.includes(token)) return res.status(403).json({ error: 'Invalid refresh token' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    const accessToken = generateAccessToken(decoded.id);
    res.json({ accessToken });
  } catch (err) {
    return res.status(403).json({ error: 'Invalid or expired refresh token' });
  }
};

exports.logout = (req, res) => {
  const { token } = req.body;
  refreshTokens = refreshTokens.filter(t => t !== token);
  res.json({ message: 'Logged out' });
};
