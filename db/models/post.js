const mongoose = require("mongoose");

const post = new mongoose.Schema({
  disc:{type: String, required: true },
  time:{type: Date, default: Date.now},
  Image:{type: String },
  user: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
 
  

 
});

module.exports = mongoose.model("Post", post);