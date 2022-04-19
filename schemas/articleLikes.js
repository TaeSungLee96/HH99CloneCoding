const mongoose = require("mongoose");

const ArticlelikesSchema = mongoose.Schema({
  // ArticleLikes
  articleNumber: {
    type: Number,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("articlelikes", ArticlelikesSchema);
