const mongoose = require("mongoose");

const articleSchema = mongoose.Schema({
  articleNum: {
    type: Number,
    required: true,
  },
  articleDesc: {
    type: String,
    required: true,
  },
  //   articleThumb: {
  //     type: String,
  //     required: true,
  //   },
  //   articleDate: {
  //     type: Date,
  //     required: true,
  //   },
  //   articleLikeNum: {
  //     type: Number,
  //     required: true,
  //   },
  //   articleCommentNum: {
  //     type: Number,
  //     required: true,
  //   },
  //   articleKind: {
  //     type: String,
  //     required: true,
  //   },
  //   userId: {
  //     type: String,
  //     required: true,
  //   },
  //   userInfo: {
  //     type: Object,
  //   },
});

module.exports = mongoose.model("article", articleSchema);
