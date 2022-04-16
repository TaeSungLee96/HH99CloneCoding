const mongoose = require("mongoose");

const articlelikesSchema = mongoose.Schema({

    // ArticleLikes
 
articleNumber: {
    type: Number,
    required: true,
  },
  userId: {
    type: String,
    required: true
      }

});

module.exports = mongoose.model("articlelikes", articlelikesSchema);
