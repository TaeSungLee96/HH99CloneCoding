const express = require("express");
const Http = require("http");
const router = express.Router();
const Articles = require("../schemas/Articles")
const Users = require("../schemas/users");
const jwt = require("jsonwebtoken");
const { response } = require("express");
const moment = require("moment");
const authMiddleware = require("../middleware/authMiddleware");


router.use(express.json()); 
router.use(express.urlencoded( {extended : false } ));

const app = express();

router.get("/", (req, res) =>{
  res.send("/article 경로에 해당합니다")
})

//게시글 저장
router.post("/add", async (req, res) => {
  const { articleTitle, articleContent, articleImageUrl, articlePrice  } = req.body;
  //const { userId, userNickname, userGu, userDong } = res.locals.userDB; //전역변수로 받을 예정
  const article =  Articles.find();
  const articleNumber = await article.countDocuments() + 1
  const articleCreatedAt = moment().format("YYYY-MM-DD HH:mm:ss")
 
  const createPosting = await Posting.create({articleTitle, articleContent ,articleImageUrl, articlePrice, userId, userNickname, userGu, userDong, articleNumber, articleCreatedAt});
  res.status(200).json({createPosting})
  });

  // (입력 값) articleTitle  articleContent  articleImageUrl articlePrice
  //(헤더 토큰 값) userId   userNickname  userGu  userDong
  //(server 지정 값) articleNumber  articleCreatedAt 


//포스팅 삭제
router.delete("delete/:articleNumber", async (req, res) => {  
  //const { userId } = res.locals.userDB; //전역변수로 받을 예정
  //const article =  Articles.find();
  const articleNumber = req.params;
  const existsArticles = await Articles.findOne({ articleNumber });
  const DBuserId = existsArticles.userId;
  if (userId == DBuserId) {
    await Posting.deleteOne({ postId });
    res.json({ response : "success" });
    return;
  }
  else{res.json({ response : "유효하지 않은 토큰정보 입니다." });

  }
});

//포스팅 수정
router.post("/edit/:articleNumber", async (req, res) => {  
  //const { userId } = res.locals.userDB; //전역변수로 받을 예정
  const articleNumber = req.params;
  let { articleTitle, articleContent, articleImageUrl, articlePrice  } = req.body;
  const existsArticles = await Articles.findOne({ articleNumber });
  const DBuserId = existsArticles.userId;
  if (userId == DBuserId) {
    await Articles.updateOne({ "articleNumber" : articleNumber },{ $set: req.body})
    res.json({ response: "success", msg: "게시글 수정이 완료되었습니다" });
    return;
  }
  else{ res.json({ response: "fail", msg: "양식에 맞추어 모든 내용을 작성해주세요" });
  }
});

router.get("/edit/:articleNumber", async (req, res) => { 
    const { userId } = res.locals.userDB; //전역변수로 받을 예정
    const articleNumber = req.params;
    const existsArticles = await Articles.findOne({ articleNumber });
    const existsUsers = await Users.findOne({userId})
    const userImage = existsUsers.userImage
    res.json({ existsArticles, userImage});
  });



module.exports = router;