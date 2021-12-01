const express = require("express");
const { register,login,showUsers } = require("./../controllesrs/user");
const userRouter = express.Router();
const authontication=require("./../middelwares/authontication");
const authorization=require("./../middelwares/authorization");

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.get("/users",authontication,authorization, showUsers);


module.exports = userRouter;