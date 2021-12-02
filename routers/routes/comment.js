const express = require("express");
const {createcomment,updateComment,deleteComment,deleteCommentByPost,deleteCommentAdmin } = require("./../controllesrs/comment");
const commentRouter = express.Router();
const authontication=require("./../middelwares/authontication");
const {adminAuthorization,userAuthorization}=require("./../middelwares/authorization");

commentRouter.post("/comment",authontication,userAuthorization,createcomment);
commentRouter.put("/comment",authontication,userAuthorization,updateComment);
commentRouter.delete("/comment",authontication,userAuthorization,deleteComment);
commentRouter.delete("/commentPost",authontication,userAuthorization,deleteCommentByPost);
commentRouter.delete("/commentadmin",authontication,adminAuthorization,deleteCommentAdmin);


module.exports = commentRouter;