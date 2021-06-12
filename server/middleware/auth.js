const { verify } = require('argon2');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

const verifyToken = async (req, res, next) => {
  const authHeader = req.header('Authorization');
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: 'Access token not found' });
  }

  try {
    // Decode
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.userId = decoded.userId;

    // Get user
    const user = await User.findById(req.userId).select('-password');
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: 'User not found' });
    }

    req.role = user.role;
    // Role = expert
    if (user.expertId) {
      req.expertId = user.expertId;
    }
    // Role = client
    if (user.clientId) {
      req.clientId = user.clientId;
    }

    next();
  } catch (error) {
    console.log(error);
    return res.status(403).json({ success: false, message: 'Invalid token' });
  }
};

module.exports = verifyToken;
