
// const mongoose = require('mongoose');
// const feedSchema = new mongoose.Schema({
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Alum",
//     required: true
//   },
//   content: {
//     type: String,
//     required: true
//   },
//   likes: {
//     type: Number,
//     default: 0
//   },
//   comments: {
//     type: Number,
//     default: 0
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now
//   }
// });

// module.exports = mongoose.model('Feed', feedSchema);



// backend/models/feed.model.js
// const mongoose = require("mongoose");

// const feedSchema = new mongoose.Schema(
//   {
//      userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Alum",
//     required: true
//   },
//     content: { type: String, required: true },
//     author: {
//       name: { type: String, required: true },
//       role: { type: String, required: true },
//     },
//   },
//   { timestamps: true }
// );




// const mongoose = require("mongoose");

// const feedSchema = new mongoose.Schema(
//   {
//     userId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Alum",
//       required: true
//     },
//     content: {
//       type: String,
//       required: true
//     }
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Feed", feedSchema);


// // module.exports = mongoose.model("Feed", feedSchema);













// backend/models/feed.model.js
const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "Alum", required: true },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const feedSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "Alum", required: true },
    content: { type: String, required: true },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Alum" }],    // array of userIds
    comments: [commentSchema]                                         // subdocs
  },
  { timestamps: true }
);

module.exports = mongoose.model("Feed", feedSchema);
