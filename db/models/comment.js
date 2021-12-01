const mongoose = require("mongoose");

const comment = new mongoose.Schema({
  disc:{type: String, required: true },
  time:{type: Date, default: Date.now},
  user: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  post: {type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true },
 
  

 
});

module.exports = mongoose.model("Comment", comment);