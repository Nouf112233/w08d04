const express = require("express");
const { createPost,getPosts } = require("./../controllesrs/post");
const postRouter = express.Router();
const authontication=require("./../middelwares/authontication");
const authorization=require("./../middelwares/authorization");

postRouter.post("/post",createPost);
postRouter.post("/getpost",getPosts);


module.exports = postRouter;