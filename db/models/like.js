const mongoose = require("mongoose");

const like = new mongoose.Schema({
  like:{type: Boolean, default: true },
  user: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  post: {type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true }
});

module.exports = mongoose.model("Like", like);