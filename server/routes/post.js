const express = require('express');
const router = express.Router();

const verifyToken = require('../middleware/auth');
const verifyExpert = require('../middleware/expert');

const Post = require('../models/Post');

// @route GET api/posts
// @desc Get posts
// @access Private
router.get('/', verifyToken, async (req, res) => {
  const { role, expertId, clientId } = req;
  try {
    if (role === 'expert') {
      const posts = await Post.find({ expertId })
        .select('-clientsId')
        .populate('expertId', 'name')
        .sort({ createdAt: 1 });

      return res.json({ success: true, posts });
    } else if (role === 'client') {
      const posts = await Post.find({ clientsId: clientId })
        .select('-clientsId')
        .populate('expertId', 'name')
        .sort({ createdAt: -1 });

      if (posts.length === 0) {
        return res
          .status(400)
          .json({ success: false, message: 'Post not found' });
      }

      return res.json({ success: true, posts });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// @route POST api/posts
// @desc Create post
// @access Private
router.post('/', verifyToken, verifyExpert, async (req, res) => {
  const { title, content, note, clientsId } = req.body;
  let { week } = req.body;
  const { monday, tuesday, wednesday, thursday, friday, saturday, sunday } =
    content;

  // Simple validation
  if (!title) {
    return res
      .status(400)
      .json({ success: false, message: 'Chưa nhập tiêu đề' });
  }

  function isNumeric(value) {
    return /^-?\d+$/.test(value);
  }
  if (!isNumeric(week)) {
    return res
      .status(400)
      .json({ success: false, message: 'Sai định dạng tuần' });
  }

  // mới chỉ check được tuần của một Expert, chưa check được cho từng user
  week = parseInt(week); // convert to number

  const maxPost = await Post.find({ expertId: req.expertId })
    .sort({ week: -1 })
    .limit(1);
  let maxWeek = 0;
  if (maxPost.length > 0) {
    maxWeek = maxPost[0].week;
  }
  if (week <= maxWeek) {
    return res.status(400).json({
      success: false,
      message: `Vui lòng chọn tuần lớn hơn. Tuần cũ: ${maxWeek}`
    });
  }

  if (!content) {
    return res
      .status(400)
      .json({ success: false, message: 'Content is required' });
  }

  const str =
    monday + tuesday + wednesday + thursday + friday + saturday + sunday;
  if (!str) {
    return res
      .status(400)
      .json({ success: false, message: 'Nhập ít nhất một ngày' });
  }

  if (clientsId.length === 0) {
    return res
      .status(400)
      .json({ success: false, message: 'Chưa chọn khách hàng nào' });
  }

  // All good
  try {
    const newPost = new Post({
      title,
      content,
      week,
      note,
      expertId: req.expertId,
      clientsId
    });

    await newPost.save();

    res.json({ success: true, message: 'Đăng bài thành công', post: newPost });
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
      .json({ success: false, message: 'Title is required' });
  }
  try {
    const updatedPost = {
      title,
      description: description || '',
      url: (url.startsWith('https://') ? url : `https://${url}`) || '',
      status: status || 'TO WATCH'
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
        message: 'User not authorized or post not found'
      });
    }

    // Update success
    res.json({
      success: true,
      message: 'Updated completely',
      oldPost,
      updatedPost
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
        message: 'User not authorized or post not found'
      });
    }

    // Delete success
    res.json({ success: true, deletedPost });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

module.exports = router;
