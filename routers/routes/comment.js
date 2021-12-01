const express = require("express");
const {createcomment,updateComment,deleteComment } = require("./../controllesrs/comment");
const commentRouter = express.Router();
const authontication=require("./../middelwares/authontication");
const authorization=require("./../middelwares/authorization");

commentRouter.post("/comment",createcomment);
// postRouter.post("/getpost",getPosts);
// postRouter.post("/getPostId",getPostById);
commentRouter.put("/comment",updateComment);
commentRouter.delete("/comment",deleteComment);
// postRouter.delete("/postadmin",authontication,authorization,deletePostByAdmin);


module.exports = commentRouter;