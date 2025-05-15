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
