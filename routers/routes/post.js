const express = require("express");
const { createPost,getPosts,getPostById,updatePost,deletePostById } = require("./../controllesrs/post");
const postRouter = express.Router();
const authontication=require("./../middelwares/authontication");
const authorization=require("./../middelwares/authorization");

postRouter.post("/post",createPost);
postRouter.post("/getpost",getPosts);
postRouter.post("/getPostId",getPostById);
postRouter.put("/post",updatePost);
postRouter.delete("/post",deletePostById);


module.exports = postRouter;