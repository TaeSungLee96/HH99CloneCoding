const express = require("express");
const Http = require("http");
const router = express.Router();
const Articles = require("../schemas/Articles");
const Users = require("../schemas/Users");
const jwt = require("jsonwebtoken");
const { response } = require("express");
const moment = require("moment");
const authMiddleware = require("../middleware/authMiddleware");
const multipart = require("connect-multiparty"); // 사진data 핸들링 라이브러리
const imgMiddleware = multipart({
  uploadDir: "uploads",
});


router.use(express.json());
router.use(express.urlencoded({ extended: false }));


router.get("/", (req, res) => {
  res.send("/article 경로에 해당합니다");
});

//게시글 저장
router.post("/add", authMiddleware, imgMiddleware, async ( req, res) => {
  try{
  const { articleTitle, articleContent, articlePrice } = req.body;
  console.log("이게 바디다!!!!!",req.body)
  const { userId, userNickname, userGu, userDong } = res.locals.userDB;
  console.log("res.locals.userDB:",res.locals.userDB)
  console.log("이게 토큰에서 가져온 값이다!!!!!",userId, userNickname, userGu, userDong)
  const article =  Articles.find()
  const articleNumber = await article.countDocuments() + 1
  const articleCreatedAt = moment().format("YYYY-MM-DD HH:mm:ss")
  const existsUsers = await Users.findOne({userId})
  // 게시글 이미지 받기
  const { path } = req.files.articleImageUrl;
  console.log("이게 이미지 경로다!!!!!",path)
  const articleImageUrl = path.replace("uploads", ""); // img파일의 경로(원본 img파일은 uploads폴더에 저장되고있음)
  const createArticles = await Articles.create({articleTitle, articleContent ,articleImageUrl, articlePrice, userId, userNickname, userGu, userDong, articleNumber, articleCreatedAt, userImage});
  res.status(200).json({createArticles})
  console.log(createArticles)
}
  catch(err){
    
      res.status(400).json({response: "fail",
      msg: "양식에 맞추어 모든 내용을 작성해주세요"  })
      }
  });
  
  // (입력 값) articleTitle  articleContent  articleImageUrl articlePrice
  //(헤더 토큰 값) userId  userNickname  userGu  userDong
  //(server 지정 값) articleNumber  articleCreatedAt 
  //(DB 빼올 값) userImage

//게시글 삭제
router.delete("/delete/:articleNumber", authMiddleware, async (req, res) => {  
  const articleNumber = req.params.articleNumber;
  const { userId } = res.locals.userDB;
  const existsArticles = await Articles.findOne({ articleNumber });
  const DBuserId = existsArticles.userId;
  if (userId == DBuserId) {
    await Articles.deleteOne({ articleNumber });
    console.log("정상적으로 삭제됨")
    res.json({ response : "success" });
    return;
  }
  else{res.json({ response : "유효하지 않은 토큰정보 입니다." });
  }
});

//게시글 수정
router.post("/edit/:articleNumber", authMiddleware, async (req, res) => {  
  const { userId } = res.locals.userDB; 
  const articleNumber = req.params.articleNumber;
  const { articleTitle, articleContent, articlePrice  } = req.body;
  console.log(req.body)
// 게시글 수정 이미지 받기
  const { path } = req.files.articleImageUrl;
  const articleImageUrl = path.replace("uploads", ""); // img파일의 경로(원본 img파일은 uploads폴더에 저장되고있음)
  const existsArticles = await Articles.findOne({ articleNumber });
  const DBuserId = existsArticles.userId;
  if (userId == DBuserId) {
    await Articles.updateOne({ articleNumber },{ $set: req.body})
    console.log({ articleTitle, articleContent, articleImageUrl, articlePrice  })
    res.json({ response: "success", msg: "게시글 수정이 완료되었습니다" });
    return;
  }
  // else{ res.json({ response: "fail", msg: "양식에 맞추어 모든 내용을 작성해주세요" });
  // } // 한 부분 빠지더라도 바디에서 받아온 내역만 수정하여 오류 나지 않음
});

router.get("/edit/:articleNumber", authMiddleware, async  (req, res) => {  
    const { userId } = res.locals.userDB; 
    const articleNumber = req.params.articleNumber;
    const existsArticles = await Articles.findOne({ articleNumber });
    const existsUsers = await Users.findOne({userId})
    const userImage = existsUsers.userImage
    console.log({ existsArticles, existsUsers, userImage  })
    res.json({ existsArticles, userImage});
  });


module.exports = router;
