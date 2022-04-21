const express = require("express");
const app = express();
// const io = require("socket.io")(server);
const connect = require("./schemas/index");
connect();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const port = 3000;
const mainRouter = require("./routes/main");
const userRouter = require("./routes/user");
const articleRouter = require("./routes/article");
const server = require('http').createServer(app);
const socketIo = require('socket.io')
//const io = require("socket.io")(server, { cors: { origin: "*" } });
// http server를 socket.io server로 upgrade한다
const io = socketIo(server, {
  cors : {
      origin:"*", //여기에 명시된 서버만 호스트만 내서버로 연결을 허용할거야
      methods: ["GET","POST"],
  },
})

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
app.use(cookieParser());
app.use(requestMiddleware);
app.use(express.urlencoded({ extended: false }));
app.use(express.static("uploads"));

//라우터 연결
app.use("/main", [mainRouter]);
app.use("/user", [userRouter]);
app.use("/article", [articleRouter]);

// // 서버 열기
// app.listen(port, () => {
//   console.log(port, "포트로 서버가 켜졌어요!");
// });
 

server.listen(3000, () => {
    console.log('3000번 서버가 정상적으로 켜졌습니다')
})

io.on("connection", (socket)=> {
    console.log("연결이되었습니다.")
    socket.on("init", (payload) => {
        console.log(payload)
    })
    socket.on("send message", (item) => {//send message 이벤트 발생
        console.log(item.name + " : " + item.message);
       io.emit("receive message", { name: item.name, message: item.message });
       //클라이언트에 이벤트를 보냄
     });
     
})




// let room = ['room1', 'room2'];
// let a = 0;

// io.on('connection', (socket) => {
//   console.log(socket.id)
//   socket.on('disconnect', () => {
//     console.log('user disconnected');
//   });

//   socket.on('disconnect', function(){   //2-2
//     console.log('사용자 연결 종료 ::', socket.id);
// });
// socket.on('joinRoom', (num, name) => {
//     socket.join(room[num], () => {//배열 찾을 때 index 적용 어려울 듯
//       console.log(name + ' join a ' + room[num]);
//       io.to(room[num]).emit('joinRoom', num, name);
//     });
//   });


//   socket.on('chat message', (num, name, msg) => {
//     a = num;
//     io.to(room[a]).emit('chat message', name, msg);
//   });
// });

// server.listen(3000, function() {
//   console.log('Socket IO server listening on port 3000');
// });


