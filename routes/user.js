const express = require("express");
const router = express.Router();
const Users = require("../schemas/Users"); //Users DB 연결하기

const fs = require("fs");
const myKey = fs.readFileSync(__dirname + "/key.txt").toString(); // 토큰 시크릿 키값 불러오기
const multipart = require("connect-multiparty"); // 사진data 핸들링 라이브러리
const imgMiddleware = multipart();
const authMiddleware = require("../middleware/authMiddleware"); // 인증미들웨어

// 사용자 정보수정
/// 인증미들웨어 추가예정
router.post("/mypage", authMiddleware, imgMiddleware, async (req, res) => {
  try {
    // 수정 할 userNickname, userGu, userDong 받기
    const { userNickname, userGu, userDong } = req.body;

    // 수정 할 프로필 이미지 받기
    const { path } = req.files.userProfile;
    const userImage = path.replace("uploads", ""); // img파일의 경로(원본 img파일은 uploads폴더에 저장되고있음)

    // 기존 토큰에서 userId 추출
    const { user } = res.locals; // 인증미들웨어에서 제공하는 전역변수
    const { userId } = user; // 유저Id

    // Users DB 업데이트
    await Users.updateOne(
      { userId },
      { $set: { userImage, userNickname, userGu, userDong } }
    );

    // 쿠키비우기
    res.clearCookie(); // 프론트분들이 브라우저에 저장한 쿠키명울 매개변수로 넣으면됨

    /// payload에 userId, userGu, userDong 담기
    const payload = { userId, userGu, userDong, userNickname };
    const secret = myKey;
    const options = {
      issuer: "TSlee", // 발행자
      expiresIn: "2h", // 만료시간 설정 : [날짜: $$d, 시간: $$h, 분: $$m, 그냥 숫자만 넣으면 ms단위]
    };

    // 토큰 생성 및 발급
    const token = jwt.sign(payload, secret, options);

    // 쿠키에 바로 저장시키기
    res.cookie("token", token);

    // 정상응답하기
    res.status(200).json({ msg: "사용자 정보 수정이 완료되었습니다." });
  } catch (error) {
    console.log(error);
    console.log("user.js -> 사용자 정보수정에서 에러남");

    res.status(400).json({ result: false });
  }
});
