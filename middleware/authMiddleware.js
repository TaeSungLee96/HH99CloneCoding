const jwt = require("jsonwebtoken");
const Users = require("../schemas/Users");
const fs = require("fs");
const myKey = fs.readFileSync(__dirname + "/../routes/key.txt").toString();

module.exports = (req, res, next) => {
  const Token = req.headers.authorization; // authorization은 FE가 헤더에 실은 key이름에 따라 변동 되어야함.
  // const logInToken = Token.replace("Bearer", ""); // replace()는 헤더에 실은 value에 따라 필요없을 수 있음.
  const logInToken = Token;
  console.log("내가 토큰이다!!!!!",Token)

  try {
    const token = jwt.verify(logInToken, myKey);
    const userId = token.userId;

    Users.findOne({ userId })
      .exec()
      .then((user) => {
        //Users DB의 데이터가 res.locals.userDB라는 전역변수에 할당됨.
        res.locals.userDB = user;
        //순수 로그인 토큰 값
        res.locals.token = logInToken;
        next();
      });
  } catch (error) {
    console.log("인증미들웨어에서 에러 발생");
    console.log(error);
    res.status(401).json({ result: "토큰이 유효하지 않습니다." });
    return;
  }
};
