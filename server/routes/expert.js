const express = require('express');
const router = express.Router();
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const Client = require('../models/Client');
const Expert = require('../models/Expert');

const verifyToken = require('../middleware/auth');
const verifyExpert = require('../middleware/expert');

// @route POST api/expert/register
// @desc Register expert (only Admin)
// @access Private
router.post('/register', async (req, res) => {
  const { username, password, name } = req.body;
  const role = 'expert';

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

    const newExpert = new Expert({ name, username });
    await newExpert.save();

    const newUser = new User({
      username,
      password: hashedPassword,
      role,
      expertId: newExpert._id
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
    console.log(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// @route PUT api/expert/add
// @desc Add user into expert (only Expert)
// @access Private
router.put('/add', verifyToken, verifyExpert, async (req, res) => {
  const expertId = req.expertId;
  const { clientsId } = req.body;

  try {
    const expert = await Expert.find({ clientsId: { $in: clientsId } });
    if (expert.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'At least one client already taken. Check again'
      });
    }

    // All good
    const condition = { _id: expertId };
    const updatedExpert = await Expert.findOneAndUpdate(
      condition,
      {
        clientsId
      },
      { new: true }
    );
    if (!updatedExpert) {
      return res.status(401).json({
        success: false,
        message: 'Expert not authorized'
      });
    }
    res.json({
      success: true,
      message: 'Updated client completely',
      updatedExpert
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

module.exports = router;
