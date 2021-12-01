const express = require("express");
const { register,login } = require("./../controllesrs/user");
const userRouter = express.Router();
const authontication=require("./../middelwares/authontication");
const authorization=require("./../middelwares/authorization");

userRouter.post("/register", register);
userRouter.post("/login", login);


module.exports = userRouter;