const express = require("express");
const { register } = require("./../controllesrs/user");
const userRouter = express.Router();
const authontication=require("./../middelwares/authontication");
const authorization=require("./../middelwares/authorization");

userRouter.post("/register", register);


module.exports = userRouter;