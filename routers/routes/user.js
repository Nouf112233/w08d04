const express = require("express");
const { register,login,showUsers,deleteUser } = require("./../controllesrs/user");
const userRouter = express.Router();
const authontication=require("./../middelwares/authontication");
const {adminAuthorization,userAuthorization}=require("./../middelwares/authorization");

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.get("/users",authontication,adminAuthorization, showUsers);
userRouter.delete("/user",authontication,adminAuthorization, deleteUser);


module.exports = userRouter;