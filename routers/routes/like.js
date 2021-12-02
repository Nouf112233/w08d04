const express = require("express");
const {addlike,taggleLike} = require("./../controllesrs/like");
const likeRouter = express.Router();
const {adminAuthorization,userAuthorization}=require("./../middelwares/authorization");

likeRouter.post("/like",addlike);
likeRouter.put("/like",taggleLike);

module.exports = likeRouter;