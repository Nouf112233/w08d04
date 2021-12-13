const express = require("express");
const {createcomment,updateComment,deleteComment,deleteCommentByPost,deleteCommentAdmin } = require("./../controllesrs/comment");
const commentRouter = express.Router();
const authontication=require("./../middelwares/authontication");
const {adminAuthorization,userAuthorization}=require("./../middelwares/authorization");

commentRouter.post("/comment",authontication,createcomment);
commentRouter.put("/comment",authontication,updateComment);
commentRouter.delete("/comment/:_id",authontication,deleteComment);
commentRouter.delete("/commentPost",authontication,userAuthorization,deleteCommentByPost);
commentRouter.delete("/commentadmin",authontication,deleteCommentAdmin);


module.exports = commentRouter;