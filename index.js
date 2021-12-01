const express = require("express");
require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");

require("./db/index");

const app = express();

app.use(express.json());
app.use(cors());

const roleRouter = require("./routers/routes/role");
app.use("/role", roleRouter);

const userRouter = require("./routers/routes/user");
app.use(userRouter);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});