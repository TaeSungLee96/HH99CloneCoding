const express = require('express')
const Likes = require('../schemas/')
const Articles = require('../schemas/')
const router = express.Router();
//const authmiddleware = require("../middle/auth-middlewares");

//사용자위치 기반  article
router.get('/',authmiddleware,async(req,res)=>{
    try{
        const{}=req.params;
        const{}=res.locals;
    }catch(error){
     
    }
})

//상품 검색 목록 
router.get('/',authmiddleware,async(req,res)=>{
    try{
        const{}=req.params;
        const{}=res.locals;

    }catch(error){
        
    }

})


//article 상세페이지
router.get('/',authmiddleware,async(req,res)=>{
    try{
        const{}=req.params;
        const{}=res.locals;
    }catch(error){
        
    }
})

//좋아요 추가
router.post('/',authmiddleware,async(req,res)=>{
    try{
        const{}=req.params;
        const{}=res.locals;
    }catch(error){
        
    }
})


//좋아요 삭제
router.delete('/',authmiddleware,async(req,res)=>{
    try{
        const{}=req.params;
        const{}=res.locals;
    }catch(error){
        
    }
})


module.exports = router