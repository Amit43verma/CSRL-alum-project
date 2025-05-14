// backend/routes/feed.route.js
const express = require("express");
const router = express.Router();
const { createFeed, getAllFeeds,getFeedByUserId } = require("../controllers/feed.controller");

router.post("/create", createFeed);
router.get("/getAllFeeds", getAllFeeds);
router.get("/getFeedByUserId/:userId", getFeedByUserId);

module.exports = router;
