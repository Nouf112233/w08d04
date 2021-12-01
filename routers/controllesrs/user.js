const userModel = require("./../../db/models/user");
const bcrypt = require("bcrypt");
require("dotenv").config();
const SALT = Number(process.env.SALT);
const jwt = require("jsonwebtoken");
const secret = process.env.secretKey;

const register = async (req, res) => {
  const { email,username, password, role } = req.body;
  const savedEmail = email.toLowerCase();
  const savedName = username.toLowerCase();
  const savedPassword = await bcrypt.hash(password, SALT);

  const newUser = new userModel({
    email: savedEmail,
    username:savedName,
    password: savedPassword,
    role,
  });
  newUser
    .save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

const login = (req, res) => {
    const { name, password } = req.body;
  
    const savedname = name.toLowerCase();
  
    userModel
      .findOne({$or: [{email: savedname},{username: savedname}] })
      .then(async (result) => {
        if (result)
         {
            const hashedPass = await bcrypt.compare(password, result.password);
            if (hashedPass) 
            {
              const payload = {
                role: result.role,
              };
              const options = { expiresIn: "60m" };
              const token = await jwt.sign(payload, secret, options);
              res.status(200).json({ result, token });
            } else {
              res.status(400).json("invalid email or password");
            }
          
        } else {
          res.status(404).json("user does not exit");
        }
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  };
  
  

module.exports = { register,login};