const mongoose = require("mongoose");

const connect = () => {
  mongoose
    .connect(
      "mongodb+srv://hanghae78952:clonecoding@cluster0.gnxiz.mongodb.net/cloneCoding?retryWrites=true&w=majority",
      { ignoreUndefined: true }
    )
    .catch((err) => {
      console.error(err);
    });
};

module.exports = connect;
