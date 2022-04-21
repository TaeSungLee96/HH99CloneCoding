const mongoose = require("mongoose");

const ArticlesSchema = mongoose.Schema({
  // Article
  articleNumber: {
    type: Number,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  userImage: {
    type: String,
    required: true,
  },
  userNickname: {
    type: String,
    required: true,
  },
  userGu: {
    type: String,
    required: true,
  },
  userDong: {
    type: String,
    required: true,
  },
  articleTitle: {
    type: String,
    required: true,
  },
  articleContent: {
    type: String,
    required: true,
  },
  articleCreatedAt: {
    type: String,
    required: true,
  },
  articleImageUrl_1: {
    type: String,
    required: true,
  },
  articleImageUrl_2: {
    type: String,
  },
  articleImageUrl_3: {
    type: String,
  },
  articlePrice: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("articles", ArticlesSchema);
