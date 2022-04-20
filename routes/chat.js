// const express = require("express");
// const router = express.Router();
// const Articles = require("../schemas/articles");
// const Users = require("../schemas/users");
// const Likes = require("../schemas/articleLikes");
// const jwt = require("jsonwebtoken");
// const { response } = require("express");
// const moment = require("moment");
// const authMiddleware = require("../middleware/authMiddleware");
// const server = require('http').createServer(router);
// const io = require('socket.io')(server);


// router.use(express.json());
// router.use(express.urlencoded({ extended: false }));


// // chat 경로로 서버에 접속하면 클라이언트로 index.html을 전송한다
// router.get('/', function(req, res) {
//   res.sendFile(__dirname + '/index-room.html');
// });

// // namespace /chat에 접속한다.
// var chat = io.of('/').on('connection', function(socket) {
//   socket.on('chat message', function(data){
//     console.log('message from client: ', data);

//     var name = socket.name = data.name;
//     var room = socket.room = data.room;

//     // room에 join한다
//     socket.join(room);
//     // room에 join되어 있는 클라이언트에게 메시지를 전송한다
//     chat.to(room).emit('chat message', data.msg);
//   });
// });
// module.exports = router;
