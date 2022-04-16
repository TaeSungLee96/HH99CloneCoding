const mongoose = require("mongoose");

const articlesSchema = mongoose.Schema({
  // Article

  articleNumber: {
    type: Number,
    required: true,
  },
  userId: {
    type: String,
    required: true
  },
  userNickname: {
    type: String,
    required: true
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
    required: true
  },    
  articleCreatedAt: {
    type: String,
    required: true,
  },
  articleImageUrl: {
    type: String,
    required: true
  },
  articlePrice: {
    type: String,
    required: true
  },
});

module.exports = mongoose.model("articles", articlesSchema);
