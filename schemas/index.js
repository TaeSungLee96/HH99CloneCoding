const mongoose = require("mongoose");
const fs = require("fs");
const pw = fs.readFileSync(__dirname + "/pw.txt").toString();

const connect = () => {
  mongoose
    .connect(
      `mongodb+srv://hanghae78952:${pw}@cluster0.gnxiz.mongodb.net/cloneCoding?retryWrites=true&w=majority`,
      { ignoreUndefined: true }
    )
    .catch((err) => {
      console.error(err);
    });
};

module.exports = connect;
