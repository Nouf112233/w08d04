const express = require("express");
const { createPost,getPosts,getPostById,updatePost,deletePostById,deletePostByAdmin } = require("./../controllesrs/post");
const postRouter = express.Router();
const authontication=require("./../middelwares/authontication");
const {adminAuthorization,userAuthorization}=require("./../middelwares/authorization");

postRouter.post("/post",authontication,userAuthorization,createPost);
postRouter.post("/getpost",authontication,userAuthorization,getPosts);
postRouter.post("/getPostId",authontication,userAuthorization,getPostById);
postRouter.put("/post",updatePost);
postRouter.delete("/post",deletePostById);
postRouter.delete("/postadmin",authontication,adminAuthorization,deletePostByAdmin);


module.exports = postRouter;