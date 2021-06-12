const express = require('express');
const router = express.Router();
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const Client = require('../models/Client');
const Expert = require('../models/Expert');

const verifyToken = require('../middleware/auth');

// @route GET api/auth
// @desc Check if user logged in
// @access Public
router.get('/', verifyToken, async (req, res) => {
  try {
    let user = await User.findById(req.userId)
      .select('-_id -password -createdAt -username') // - means not select
      .populate('clientId', '-_id name')
      .populate('expertId', 'name clientsId');
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: 'User not found' });
    }

    let expertId;
    if (user.role === 'expert') {
      expertId = await Expert.findById(user.expertId._id)
        .select('-name -username -_id')
        .populate('clientsId', 'name');
      let { clientsId } = expertId;
      return res.json({ success: true, user, clientsId });
    }

    return res.json({ success: true, user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// @route POST api/auth/register
// @desc Register user
// @access Public
router.post('/register', async (req, res) => {
  const { username, password, name } = req.body;

  // Simple validation
  if (!username || !password) {
    return res
      .status(400)
      .json({ success: false, message: 'Missing username or password' });
  }

  if (password.trim() === '') {
    return res
      .status(400)
      .json({ success: false, message: 'Invalid password' });
  }

  try {
    // Check for existing user
    const user = await User.findOne({ username });

    if (user)
      return res
        .status(400)
        .json({ success: false, message: 'Username already taken' });

    // All good
    const hashedPassword = await argon2.hash(password);

    const newClient = new Client({ name, username });
    await newClient.save();

    const newUser = new User({
      username,
      password: hashedPassword,
      clientId: newClient._id
    });
    await newUser.save();

    // Return token
    const accessToken = jwt.sign(
      { userId: newUser._id },
      process.env.ACCESS_TOKEN_SECRET
    );

    res.json({
      success: true,
      message: 'User created successfully',
      accessToken
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// @route POST api/auth/login
// @desc Login user
// @access Public
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ success: false, message: 'Missing username or password' });
  }
  try {
    // Check for existing user
    const user = await User.findOne({ username });
    if (!user) {
      return res
        .status(400)
        .json({ sucess: false, message: 'Incorrect username or password' });
    }
    // Username found
    const passwordValid = await argon2.verify(user.password, password);
    if (!passwordValid) {
      return res
        .status(400)
        .json({ sucess: false, message: 'Incorrect password or password' });
    }
    // All good
    // Return token
    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN_SECRET
    );

    return res.json({
      success: true,
      message: 'Logged in successfully',
      accessToken
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// @route GET api/auth/user
// @desc Get all users
// @access Private
router.get('/user', async (req, res) => {
  try {
    const allUsers = await User.find({ role: 'client' })
      .select('username')
      .populate('clientId', 'name');
    res.json(allUsers);
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

module.exports = router;
