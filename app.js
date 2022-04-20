const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const connect = require("./schemas/index");
connect();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const port = 3000;
const mainRouter = require("./routes/main");
const userRouter = require("./routes/user");
const articleRouter = require("./routes/article");

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
server.use(cors({ credentials: true }));
server.use(express.json());
server.use(cookieParser());
server.use(requestMiddleware);
server.use(express.urlencoded({ extended: false }));
server.use(express.static("uploads"));

//라우터 연결
server.use("/main", [mainRouter]);
server.use("/user", [userRouter]);
server.use("/article", [articleRouter]);

// 서버 열기
server.listen(port, () => {
  console.log(port, "포트로 서버가 켜졌어요!");
});
