const express = require("express");
const {addlike,taglleLike} = require("./../controllesrs/like");
const likeRouter = express.Router();

likeRouter.post("/like",addlike);
likeRouter.put("/like",taglleLike);

module.exports = likeRouter;