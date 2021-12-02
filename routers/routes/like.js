const express = require("express");
const {addlike,taggleLike} = require("./../controllesrs/like");
const likeRouter = express.Router();
const authontication=require("./../middelwares/authontication");
const {adminAuthorization,userAuthorization}=require("./../middelwares/authorization");

likeRouter.post("/like",authontication,userAuthorization,addlike);
likeRouter.put("/like",authontication,userAuthorization,taggleLike);

module.exports = likeRouter;