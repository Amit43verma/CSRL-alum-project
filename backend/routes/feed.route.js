
// backend/routes/feed.route.js
const express = require("express");
const router = express.Router();
const {
  createFeed,
  getAllFeeds,
  toggleLike,
  addComment,
  getFeedByUserId,
  deleteComment
} = require("../controllers/feed.controller");

router.post("/create", createFeed);
router.get("/getAllFeeds", getAllFeeds);
router.get("/getFeedByUserId/:userId", getFeedByUserId);
// new endpoints:
router.post("/:feedId/like", toggleLike);
router.post("/:feedId/comment", addComment);
router.delete("/:feedId/comment/:commentId", deleteComment);
module.exports = router;
