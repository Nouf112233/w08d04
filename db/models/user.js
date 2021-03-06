const mongoose = require("mongoose");

const user = new mongoose.Schema({
  email:{type: String, required: true ,unique:true},
  username:{type: String, required: true ,unique:true},
  password:{type: String, required: true },
  isdeleted:{type: Boolean, default: false },
  active:{type: Boolean, default: false},
  role: {type: mongoose.Schema.Types.ObjectId, ref: "Role", required: true },
  avatar:{type:String},
  rand:{type:Number},
  googleId:{type:String}

 
  

 
});

module.exports = mongoose.model("User", user);