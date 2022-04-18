const express = require('express');
const Likes = require('../schemas/articleLikes');
const Articles = require('../schemas/articles');
const Users = require("../schemas/Users.js");
const router = express.Router();
const authmiddleware = require("../middle/auth-middlewares");

//사용자위치 기반  article
router.get('/list',authmiddleware,async(req,res)=>{
    try{ 
        //유저위치기반  조회
        const{ user }= res.locals.userDB;
        if(user){
            // 사용자 위치 정보
            const userGu = user.userGu;
            const userDong = user.userDong;
            //위치 정보 매칭
            const List =  await Articles.aggregate([
                {$match:{ userGu:userGu,
                   userDong:userDong }},
                { $lookup: {
                    from: 'articlelike',
                    localField:'articleNumber' ,
                    foreignField:'articleNumber',
                    as: 'Like'
                }},
                {
                $project:{
                _id: 1,
                articleNumber: 1,
                userId: 1,
                userNickname: 1,
                userGu: 1,
                userDong: 1,
                articleCreatedAt: 1,
                articleImageUrl: 1,
                articlePrice: 1,
                likeCount: { $size: '$Like'}
               }}
            ]).sort("-articleCreatedAt").exec();
            //위치 정보에일치하는 정보가 없을때 
                if(Array.isArray(List) && List.length === 0)  {
                    return res.status(401).send({
                        response:"fail",
                        msg: "조건에 일치하는 게 없습니다"
                    });
                };
                //정보가 있을 때
                return res.status(200).json({
                    List,
                    response:"Succeal",
                    msg:"전체조회 성공"
                });
        }
        //검색기능
        const keyword = req.query.keyword;
        //검색어가 있는 지 확인
         if(keyword){
             //array생성
             let option = [];
             //조건문
             if (option) {
              //정규식(articleTitle키값은 밸류 req.qurey.item설정)
              option = [ { articleTitle: new RegExp(keyword) },
                  {  userGu:new RegExp(user.userGu) },
                 {  userDong:new RegExp(user.userDong) } ];
             } 
             //db에서 검색
             const Srech = await Articles.aggregate([
                 {$match: {$or:option}  
                 },
                 { $lookup: {
                     from: 'articlelike',
                     localField:'articleNumber' ,
                     foreignField:'articleNumber',
                     as: 'Like'
                 }},
                 {
                 $project:{
                 _id: 1,
                 articleNumber: 1,
                 userId: 1,
                 userNickname: 1,
                 userGu: 1,
                 userDong: 1,
                 articleCreatedAt: 1,
                 articleImageUrl: 1,
                 articlePrice: 1,
                 likeCount: { $size: '$Like'}
                }}
             ]).
                 sort("-articleCreatedAt")
                 .exec();
                //검색 조건에 일치 하는 게 없을 때
                 if(Array.isArray(Srech) && Srech.length === 0)  {
                     return res.status(401).send({
                         response:"fail",
                         msg: "조건에 일치하는 게 없습니다"
                     })
                 }
                 // 조건에 일치 시
                 return res.status(200).json({
                     Srech,
                     response:"Succeal",
                     msg:"조회 성공하셨습니다"
                 });
                }
         throw error;
    }catch(error){
        res.status(400).send({
            response:"fail",
            msg: "로그인을 해주십시오"
        })
    }
})

//article 상세페이지
router.get('/detail/:articleNumber',authmiddleware,async(req,res)=>{
    try{
        const{articleNumber}=req.params;
        const {user} = res.locals.userDB;
        //유저 정보확인
      if(user.length > 0){
            if(articleNumber){
            //articleNumber가일치 동작
            const List = await Articles.find({articleNumber});
            //List.userId가 같은 것만 가져옴
            const userImage = await Users.findOne({userId:List.userId}).userImage;
            const totalLike = (await Likes.find({articleNumber})).length;
           return res.status(200).json({
                List,userImage,totalLike,
                response:"Succeal",
                msg:'상세조회 페이지입니다'
            });
        }
        res.status(400).send({
            response:"fail",
            msg: "해당 페이지가 존재하지 않습니다"
        });
    }
    }catch(error){
        res.status(401).send({
            response:"fail",
            msg: "토큰이 유효하지 않습니다."
        });
    };
});

//좋아요 추가,삭제
router.post('/like',authmiddleware,async(req,res)=>{
    try{
        //유저 정보 받기
        const{user}=res.locals.userDB;
        //articleNumber받는다
        const{articleNumber}=req.body;
        //유저 정보가 있는 지 확인
      if (user.length > 0){
            //사용유자가 같은 상품에 좋아요를 했는지 확인
        const like = await Likes.find({articleNumber,userId:user.userId});
        if(like){
            //일치하는 갚은 있으면 삭제
            await Likes.deleteOne({ articleNumber,userId:user.userId });
            //남은 개수
            const totalLike = (await Likes.find({articleNumber})).length;
            return  res.status(200).json({ result: "Succeal",  totalLike});
        };
        // 일치 하는 값이 없을 시 생성
        await Likes.create({articleNumber,userId:user.userId});
        // 총갯수
        const totalLike = (await Likes.find({articleNumber})).length;
        return  res.status(200).json({ result: "Succeal",  totalLike});
    };
    return res.status(401).send({
        response:'fail',
        msg:'유효하지 않은 토큰입니다'
    });
       
    }catch(error){
        res.status(400).send({
            response:"fail",
            msg: "알수 없는 오류가 발생했습니다."
        });
    };
});



module.exports = router