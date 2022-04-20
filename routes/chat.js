const express = require("express");
const router = express.Router();
const Articles = require("../schemas/articles");
const Users = require("../schemas/users");
const Likes = require("../schemas/articleLikes");
const jwt = require("jsonwebtoken");
const moment = require("moment");
const authMiddleware = require("../middleware/authMiddleware");
const multipart = require("connect-multiparty"); // 사진data 핸들링 라이브러리
const imgMiddleware = multipart({
  uploadDir: "uploads",
});

// http server를 socket.io server로 upgrade한다
const server = require("http").createServer(router);
const io = require("socket.io")(server);

// chat 경로로 서버에 접속하면 클라이언트로 index.html을 전송한다
router.get("/", function (req, res) {
  res.sendFile(__dirname + "/index-room.html");
});

// namespace /chat에 접속한다.
const chat = io.on("connection", function (socket) {
  socket.on("chat message", function (data) {
    console.log("message from client: ", data);

    const name = (socket.name = data.name);
    const room = (socket.room = data.room);

    // room에 join한다
    socket.join(room);
    // room에 join되어 있는 클라이언트에게 메시지를 전송한다
    chat.to(room).emit("chat message", data.msg);
  });
});
module.exports = router;
