const express = require("express");
const { createPost,getPosts,getPostById,updatePost,deletePostById,deletePostByAdmin } = require("./../controllesrs/post");
const postRouter = express.Router();
const authontication=require("./../middelwares/authontication");
const {adminAuthorization,userAuthorization}=require("./../middelwares/authorization");

postRouter.post("/post",authontication,createPost);
postRouter.get("/getpost",authontication,getPosts);
postRouter.post("/getPostId",authontication,getPostById);
postRouter.put("/post",authontication,updatePost);
postRouter.delete("/post",authontication,deletePostById);
postRouter.delete("/postadmin",authontication,adminAuthorization,deletePostByAdmin);


module.exports = postRouter;