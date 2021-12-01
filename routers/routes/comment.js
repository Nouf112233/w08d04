const express = require("express");
const {createcomment } = require("./../controllesrs/comment");
const commentRouter = express.Router();
const authontication=require("./../middelwares/authontication");
const authorization=require("./../middelwares/authorization");

commentRouter.post("/comment",createcomment);
// postRouter.post("/getpost",getPosts);
// postRouter.post("/getPostId",getPostById);
// postRouter.put("/post",updatePost);
// postRouter.delete("/post",deletePostById);
// postRouter.delete("/postadmin",authontication,authorization,deletePostByAdmin);


module.exports = commentRouter;