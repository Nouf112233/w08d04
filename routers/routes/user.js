const express = require("express");
const { register,login,showUsers,deleteUser } = require("./../controllesrs/user");
const userRouter = express.Router();
const authontication=require("./../middelwares/authontication");
const authorization=require("./../middelwares/authorization");

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.get("/users",authontication,authorization, showUsers);
userRouter.delete("/user",authontication,authorization, deleteUser);


module.exports = userRouter;