const express = require("express");
const { addRole, getRoles } = require("./../controllesrs/role");
const roleRouter = express.Router();
const authontication=require("./../middelwares/authontication");
const {adminAuthorization,userAuthorization}=require("./../middelwares/authorization");

roleRouter.post("/",authontication,adminAuthorization,addRole);
roleRouter.get("/",authontication,adminAuthorization, getRoles);

module.exports = roleRouter;