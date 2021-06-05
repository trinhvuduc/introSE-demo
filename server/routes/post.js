const express = require('express');
const router = express.Router();

const verifyToken = require('../middleware/auth');

const Post = require('../models/Post');

// @route GET api/posts
// @desc Get posts
// @access Private
router.get('/', verifyToken, async (req, res) => {
  try {
    const posts = await Post.find({ user: req.userId }).populate('user', [
      'username',
      'createdAt',
    ]);
    res.json({ sucess: true, posts });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// @route POST api/posts
// @desc Create post
// @access Private
router.post('/', verifyToken, async (req, res) => {
  const { title, description, url, status } = req.body;

  // Simple validation
  if (!title) {
    return res
      .status(400)
      .json({ sucess: false, message: 'Title is required' });
  }
  try {
    const newPost = new Post({
      title,
      description,
      url: url.startsWith('https://') ? url : `https://${url}`,
      status: status || 'TO WATCH',
      user: req.userId,
    });

    await newPost.save();

    res.json({ sucess: true, message: 'Happy watching', post: newPost });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// @route PUT api/posts
// @desc Update post
// @access Private
router.put('/:id', verifyToken, async (req, res) => {
  const { title, description, url, status } = req.body;

  // Simple validation
  if (!title) {
    return res
      .status(400)
      .json({ sucess: false, message: 'Title is required' });
  }
  try {
    const updatedPost = {
      title,
      description: description || '',
      url: (url.startsWith('https://') ? url : `https://${url}`) || '',
      status: status || 'TO WATCH',
    };

    const postUpdateCondition = { _id: req.params.id, user: req.userId };

    const oldPost = await Post.findOneAndUpdate(
      postUpdateCondition,
      updatedPost,
      { new: false }
    );

    // User not authorized to update or post not found
    if (!oldPost) {
      return res.status(401).json({
        success: false,
        message: 'User not authorized or post not found',
      });
    }

    // Update success
    res.json({
      sucess: true,
      message: 'Updated completely',
      oldPost,
      updatedPost,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// @route DELETE api/posts
// @desc Delete post
// @access Private
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const postDeleteCondition = { _id: req.params.id, user: req.userId };
    const deletedPost = await Post.findOneAndDelete(postDeleteCondition);

    // User not authorized or post not found
    if (!deletedPost) {
      return res.status(401).json({
        success: false,
        message: 'User not authorized or post not found',
      });
    }

    // Delete success
    res.json({ sucess: true, deletedPost });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

module.exports = router;
