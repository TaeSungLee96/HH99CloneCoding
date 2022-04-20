const express = require("express");
const connect = require("./schemas/index");
connect();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
//const port = 3000;
const mainRouter = require("./routes/main");
const userRouter = require("./routes/user");
const articleRouter = require("./routes/article");
const chatRouter = require("./routes/chat");
const server = require('http').createServer(app);
const io = require('socket.io')(server);
// http server를 socket.io server로 upgrade한다


// 접속 로그 남기기
const requestMiddleware = (req, res, next) => {
  console.log(
    "[Ip address]:",
    req.ip,
    "[method]:",
    req.method,
    "Request URL:",
    req.originalUrl,
    " - ",
    new Date()
  );
  next();
};

// 각종 미들웨어
app.use(cors({ credentials: true }));
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());
app.use(requestMiddleware);
app.use(express.urlencoded({ extended: false }));
app.use(express.static("uploads"));

//라우터 연결
app.use("/main", [mainRouter]);
app.use("/user", [userRouter]);
app.use("/article", [articleRouter]);
app.use("/chat", [chatRouter]);

// // 서버 열기
// app.listen(port, () => {
//   console.log(port, "포트로 서버가 켜졌어요!");
// });

server.listen(3000, function() {
  console.log('Socket IO server listening on port 3000');
});

// // chat 경로로 서버에 접속하면 클라이언트로 index.html을 전송한다
// router.get('/', function(req, res) {
//   res.sendFile(__dirname + '/../index-room.html');
// });

// // namespace /chat에 접속한다.
// var chat = io.of('/room').on('connection', function(socket) {
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


