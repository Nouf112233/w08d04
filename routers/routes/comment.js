const express = require("express");
const {createcomment,updateComment,deleteComment,deleteCommentByPost,deleteCommentAdmin } = require("./../controllesrs/comment");
const commentRouter = express.Router();
const authontication=require("./../middelwares/authontication");
const {adminAuthorization,userAuthorization}=require("./../middelwares/authorization");

commentRouter.post("/comment",createcomment);
// postRouter.post("/getpost",getPosts);
// postRouter.post("/getPostId",getPostById);
commentRouter.put("/comment",updateComment);
commentRouter.delete("/comment",deleteComment);
commentRouter.delete("/commentPost",deleteCommentByPost);
commentRouter.delete("/commentadmin",authontication,adminAuthorization,deleteCommentAdmin);


module.exports = commentRouter;