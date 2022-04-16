const mongoose = require("mongoose");
const fs = require("fs");
const pw = fs.readFileSync(__dirname + "/pw.txt").toString();

const connect = () => {
  mongoose
    .connect(
      `mongodb+srv://hanghae78952:${pw}clonecoding@cluster0.hgnt4.mongodb.net/cloneCoding?retryWrites=true&w=majority`,
      { ignoreUndefined: true }
    )
    .catch((err) => {
      console.error(err);
      console.log("여기?");
    });
};

module.exports = connect;
