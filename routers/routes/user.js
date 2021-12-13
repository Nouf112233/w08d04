const express = require("express");
const { register,login,showUsers,deleteUser,confirmEmail,resendLink ,forgitpass,changepass} = require("./../controllesrs/user");
const userRouter = express.Router();
const authontication=require("./../middelwares/authontication");
const {adminAuthorization,userAuthorization}=require("./../middelwares/authorization");
// const passport = require('passport');

// const successLoginUrl="http://localhost:3000/login/success";
// const errorLoginUrl="http://localhost:3000/login/error";


userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.get("/users",authontication,adminAuthorization, showUsers);
userRouter.delete("/user",authontication,adminAuthorization, deleteUser);
userRouter.get('/confirmation/:email/:rand',confirmEmail);
userRouter.post('/resendlink',resendLink);
userRouter.post('/forgit',forgitpass);
userRouter.post('/changpass',changepass);
// userRouter.post("/googlelogin", googlelogin);



module.exports = userRouter;