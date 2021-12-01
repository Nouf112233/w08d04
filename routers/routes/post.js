const express = require("express");
const { createPost,getPosts,getPostById,updatePost } = require("./../controllesrs/post");
const postRouter = express.Router();
const authontication=require("./../middelwares/authontication");
const authorization=require("./../middelwares/authorization");

postRouter.post("/post",createPost);
postRouter.post("/getpost",getPosts);
postRouter.post("/getPostId",getPostById);
postRouter.post("/updatePost",updatePost);


module.exports = postRouter;