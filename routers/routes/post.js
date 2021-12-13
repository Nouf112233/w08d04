const express = require("express");
const { createPost,getPosts,getPostById,updatePost,deletePostById,deletePostByAdmin,getPostsByAdmin,getAllPosts } = require("./../controllesrs/post");
const postRouter = express.Router();
const authontication=require("./../middelwares/authontication");
const {adminAuthorization,userAuthorization}=require("./../middelwares/authorization");

postRouter.post("/post",authontication,createPost);
postRouter.get("/getpost",authontication,getPosts);
postRouter.post("/getPostId",getPostById);
postRouter.put("/post",authontication,updatePost);
postRouter.delete("/post/:_id",authontication,deletePostById);
postRouter.delete("/postadmin",authontication,adminAuthorization,deletePostByAdmin);
postRouter.delete("/getpostadmin",authontication,adminAuthorization,getPostsByAdmin);
postRouter.get("/getallpost",getAllPosts);


module.exports = postRouter;