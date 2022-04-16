const mongoose = require("mongoose");

const UsersSchema = mongoose.Schema({

  // Users

  userId: {
    type: String,
    required: true,
    unique: true,
  },
  userPassword: {
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
  //userImage default = 임의image
  userImage: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Users", UsersSchema);
