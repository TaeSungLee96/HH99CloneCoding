const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator"); // 회원가입 정보 필터링 라이브러리
const Users = require("../schemas/Users"); //Users DB 연결하기

const fs = require("fs");
const initProfile = fs.readFileSync(__dirname + "/initProfile.txt").toString(); // 프로필 사진 초기값 불러오기
const myKey = fs.readFileSync(__dirname + "/myKey.txt").toString(); // 토큰 시크릿 키값 불러오기

// 회원가입
router.post(
  "/signup",

  // userId 규칙 : 최소4자리이고, 알파벳과 숫자를 혼합하여 써야함.
  // notEmpty: 비어있으면 컷!, trim: 공백없애기, isLength: 최소문자길이지정, isAlphanumeric: 숫자, 문자 있는지 체크
  body("userId").notEmpty().trim().isLength({ min: 4 }).isAlphanumeric(),

  // userPassword 규칙 : 최소4자리이고, userId와 같은 값이 포함되어 있으면 안됨.
  body("userPassword")
    .notEmpty()
    .trim()
    .isLength({ min: 4 })
    .custom((value, { req }) => {
      if (value.includes(req.body.userId)) {
        throw new Error("비밀번호에 닉네임이 포함되어 있습니다.");
      }
      return true;
    }),

  // userPasswordCheck 규칙 : 비밀번호와 비밀번호 확인이 정확하게 일치하는지 확인
  body("userPasswordCheck").custom((value, { req }) => {
    if (value !== req.body.userPassword) {
      throw new Error("비밀번호와 비밀번호확인이 동일한지 확인해주세요.");
    }
    return true;
  }),

  // userNickname 규칙 : 비어있지 않고 최대길이는 15글자
  body("userNickname").notEmpty().trim().isLength({ max: 15 }),

  // userGu 규칙 : 비어있지 않기
  body("userGu").notEmpty(),

  // userDong 규칙 : 비어있지 않기
  body("userDong").notEmpty(),

  async (req, res) => {
    // 에러 핸들링 함수 (양식에 안맞으면 400상태와 errors메세지 반환)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // 프론트 --> 서버로 전달받은 데이터
    const { userId, userPassword, userNickname, userGu, userDong } = req.body;
    // 초기 유저프로필 URL
    const userImage = initProfile;

    // 이미 가입된 userId인지 확인
    const existUserId = await Users.findOne({ userId });
    if (existUserId.length) {
      return res.status(400).send({ msg: "이미 가입되어있는 아이디입니다." });
    }

    // DB에 저장
    Users.create({
      userId,
      userPassword,
      userNickname,
      userGu,
      userDong,
      userImage, // 초기 유저프로필 URL
    });

    // 회원가입 완료 메세지 응답
    res.json({ msg: "회원가입이 완료되었습니다." });
  }
);

// 로그인
router.post(
  "/login",

  // userId 규칙 : 비어있지 않기
  body("userId").notEmpty(),

  // userId 규칙 : 비어있지 않기
  body("userPassword").notEmpty(),

  async (req, res) => {
    // 에러 핸들링 함수 (양식에 안맞으면 400상태와 에러메세지 반환)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ msg: errors.array() });
    }

    // FE가 입력한 정보로 DB조회
    const { userId, userPassword } = req.body;
    const user = await Users.findOne({ userId, userPassword });

    // 가입안된 닉네임일때 혹은 비밀번호가 틀릴때 400상태와 에러메세지 반환
    if (!user) {
      res.status(400).send({
        msg: "닉네임 혹은 패스워드를 다시 확인해주세요.",
      });
      return;
    }

    // 토큰 발급단계 (위치정보와 Id담기)
    /// 위치정보 DB에서 조회
    const userInfo = await Users.findOne({ userId });
    const { userGu } = userInfo;
    const { userDong } = userInfo;
    const { userNickname } = userInfo;

    /// payload에 userId, userGu, userDong 담기
    const payload = { userId, userGu, userDong, userNickname };
    const secret = myKey;
    const options = {
      issuer: "TSlee", // 발행자
      expiresIn: "2h", // 만료시간 설정 : [날짜: $$d, 시간: $$h, 분: $$m, 그냥 숫자만 넣으면 ms단위]
    };

    // 토큰 생성 및 발급
    const token = jwt.sign(payload, secret, options);
    res.json({ token: token }).send({ msg: "로그인이 완료 되었습니다." });
  }
);
