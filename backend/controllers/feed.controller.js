// backend/controllers/feed.controller.js
const Feed = require("../models/feed.model");

// exports.createFeed = async (req, res) => {
//   try {
//     const feed = new Feed(req.body);
//     await feed.save();
//     res.status(201).json(feed);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

exports.createFeed = async (req, res) => {
  try {
    const { userId, content } = req.body;

    const newFeed = new Feed({ userId, content });
    await newFeed.save();

    res.status(201).json(newFeed);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// exports.getAllFeeds = async (req, res) => {
//   try {
//     const feeds = await Feed.find().sort({ createdAt: -1 });
//     res.status(200).json(feeds);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };


exports.getAllFeeds = async (req, res) => {
  try {
    // const feeds = await Feed.find()
    //   .populate('userId', 'name profilePhotoUrl experiences')
    //   .sort({ createdAt: -1 });

    const feeds = await Feed.find()
  .populate('userId', 'name profilePhotoUrl experiences')
  .sort({ updatedAt: -1 });

    res.status(200).json(feeds);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



// Get feeds by userId
exports.getFeedByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const feeds = await Feed.find({ userId }).populate('userId', 'name'); // optional: populate user info

    if (!feeds || feeds.length === 0) {
      return res.status(404).json({ message: 'No feeds found for this user' });
    }

    res.status(200).json(feeds);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// exports.getFeedById = async (req, res) => {
//   try {
//     const feed = await Feed.findById(req.params.id);
//     if (!feed) {
//       return res.status(404).json({ message: "Feed not found" });
//     }
//     res.status(200).json(feed);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// }





// backend/controllers/feed.controller.js
// const Feed = require("../models/feed.model");

// Like or unlike a post
exports.toggleLike = async (req, res) => {
  try {
    const { feedId } = req.params;
    const userId = req.body.userId; // current user

    const feed = await Feed.findById(feedId);
    if (!feed) return res.status(404).json({ message: "Feed not found" });

    const idx = feed.likes.indexOf(userId);
    if (idx === -1) {
      feed.likes.push(userId);
    } else {
      feed.likes.splice(idx, 1);
    }

    await feed.save();
    res.json({ likesCount: feed.likes.length, liked: idx === -1 });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add a comment
exports.addComment = async (req, res) => {
  try {
    const { feedId } = req.params;
    const { userId, text } = req.body;

    const feed = await Feed.findById(feedId);
    if (!feed) return res.status(404).json({ message: "Feed not found" });

    feed.comments.push({ userId, text });
    await feed.save();

    const newComment = feed.comments[feed.comments.length - 1];
    res.status(201).json(newComment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Delete a comment
// backend/controllers/feed.controller.js
exports.deleteComment = async (req, res) => {
  try {
    const { feedId, commentId } = req.params;
    const userId = req.body.userId;  // current user

    const feed = await Feed.findById(feedId);
    if (!feed) return res.status(404).json({ message: "Feed not found" });

    // Find the comment
    const comment = feed.comments.id(commentId);
    if (!comment) return res.status(404).json({ message: "Comment not found" });
    if (comment.userId.toString() !== userId) {
      return res.status(403).json({ message: "Not authorized to delete this comment" });
    }

    // Remove it
    comment.remove();
    await feed.save();

    res.json({ commentId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
