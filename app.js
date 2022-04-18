const express = require("express");
const connect = require("./schemas/index");
connect();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
const port = 3000;
<<<<<<< HEAD
/* const mainRouter =  require("./routes/main")
const userRouter =  require("./routes/user")
const articleRouter =  require("./routes/article") */
const listRouter = require('./routes/List')
=======
//const mainRouter =  require("./routes/main")
//const userRouter =  require("./routes/user")
const articleRouter =  require("./routes/article")
>>>>>>> 6a9c829a72d2fda39a4768903560a77c8116bc4e

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
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());
app.use(requestMiddleware);
app.use(express.urlencoded({ extended: false }));
app.use(express.static("uploads"));

//라우터 연결
<<<<<<< HEAD
/* app.use("/main", [mainRouter]);
app.use("/user", [userRouter]);
app.use("/article", [articleRouter]) */
app.use("/article", [listRouter])
=======
// app.use("/main", [mainRouter]);
// app.use("/user", [userRouter]);
app.use("/article", [articleRouter])
>>>>>>> 6a9c829a72d2fda39a4768903560a77c8116bc4e


// 서버 열기
app.listen(port, () => {
  console.log(port, "포트로 서버가 켜졌어요!");
});
