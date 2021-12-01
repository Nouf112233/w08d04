const express = require("express");
const {addlike} = require("./../controllesrs/like");
const likeRouter = express.Router();

likeRouter.post("/like",addlike);

module.exports = likeRouter;