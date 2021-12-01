const express = require("express");
const { addRole, getRoles } = require("./../controllesrs/role");
const roleRouter = express.Router();
const authontication=require("./../middelwares/authontication");
const authorization=require("./../middelwares/authorization");

roleRouter.post("/",addRole);
roleRouter.get("/", getRoles);

module.exports = roleRouter;