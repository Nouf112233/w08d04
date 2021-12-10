const userModel = require("./../../db/models/user");
const bcrypt = require("bcrypt");
require("dotenv").config();
const SALT = Number(process.env.SALT);
const jwt = require("jsonwebtoken");
const secret = process.env.secretKey;
const nodemailer = require("nodemailer");
const passport = require('passport');


///  google authontication
// const passport=require("passport");
// const GoogleStratgy=require("passport-google-oauth20").Strategy;
// const GOOGLE_CLIENT_ID='1012491114950-5htc73u0e5d1f7shkqq8c852ponfa6jn.apps.googleusercontent.com';
// const GOOGLE_CLIENT_SECRET='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';
// passport.use(
//   new GoogleStratgy({
//     clientID: process.env.GOOGLE_CLIENT_ID,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     callbackURL: "http://localhost:5000/google/callback",
//     passReqToCallback: true

//   },function(accessToken, refreshToken, profile, done) {
//     // userModel.findOrCreate({ googleId: profile.id }, function (err, user) {
//       return done(err, profile);

// //   }
// // )
// }
// ));

// passport.serializeUser(function(user,done){
//   done(null,user);
// });
// passport.deserializeUser(function(user,done){
//   done(null,user);
// });

/// end google authentication




const register = async (req, res) => {
  const { email, username, password, role, avatar } = req.body;
  if (
    /\d/.test(password) &&
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/.test(password) &&
    password.length > 6
  ) {
    const savedEmail = email.toLowerCase();
    const savedName = username.toLowerCase();
    const savedPassword = await bcrypt.hash(password, SALT);
    rand = Math.floor(Math.random() * 100 + 54);

    const newUser = new userModel({
      email: savedEmail,
      username: savedName,
      password: savedPassword,
      role,
      avatar,
      rand,
    });
    newUser
      .save()
      .then((result) => {
        // console.log("HOST",HOST);
        const transporter = nodemailer.createTransport({
          service: "Gmail",
          auth: { user: process.env.USER, pass: process.env.PASS },
        });
        const mailOptions = {
          from: "nouf.ateeq@gmail.com",
          to: result.email,
          subject: "Account Verification Link",
          text:
            "Hello " +
            result.username +
            ",\n\n" +
            "Please verify your account by clicking the link: \nhttp://" +
            req.headers.host +
            "/confirmation/" +
            result.email +
            "/" +
            rand +
            "\n\nThank You!\n",
        };
        transporter.sendMail(mailOptions, function (err) {
          if (err) {
            res.status(500).send({
              msg: "Technical Issue!, Please click on resend for verify your Email.",
            });
          }
          res
            .status(200)
            .send(
              "A verification email has been sent to " +
                result.email +
                ". It will be expire after one day. If you not get verification Email click on resend link."
            );
        });

        // res.status(201).json(result);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  } else {
    res.status(400).json({ msg: "your password not complex" });
  }
};

const login = (req, res) => {
  const { name, password } = req.body;

  const savedname = name.toLowerCase();

  userModel
    .findOne({ $or: [{ email: savedname }, { username: savedname }] })
    .then(async (result) => {
      if (result) {
        if (result.active == false) {
          res.status(401).send({
            msg: "Your Email has not been verified. Please click on resend",
          });
        } else {
          const hashedPass = await bcrypt.compare(password, result.password);
          if (hashedPass) {
            const payload = {
              role: result.role,
              id: result._id,
            };
            const options = { expiresIn: "300m" };
            const token = await jwt.sign(payload, secret, options);
            res.status(200).json({ result, token });
          } else {
            res.status(400).json("invalid email or password");
          }
        }
      } else {
        res.status(404).json("user does not exit");
      }
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

const showUsers = (req, res) => {
  userModel
    .find({})
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

const deleteUser = (req, res) => {
  const { _id } = req.body;

  userModel
    .findByIdAndUpdate(_id, { isdeleted: true })
    .then(() => {
      res.status(200).json({ message: "User has been deleted successfully" });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

const confirmEmail = (req, res) => {
  const { email } = req.params;

  try {
    userModel
      .findOneAndUpdate(
        { email: email },
        { active: true },
        {
          new: true,
        }
      )
      .then((result) => {
        console.log("result", result);
        res.status(200).send("Your account has been successfully verified");
      })
      .catch((err) => {
        console.log("err", err);
        res.status(400).json(err);
      });
  } catch (err) {
    res.status(400).send(err);
  }
};

const resendLink = (req, res) => {
  const { email } = req.body;
  rand = Math.floor(Math.random() * 100 + 54);
  console.log("email", email);
  userModel
    .findOne({ email: email })
    .then((result) => {
      if (result.active) {
        res
          .status(200)
          .send("This account has been already verified. Please log in.");
      } else {
        const transporter = nodemailer.createTransport({
          service: "Gmail",
          auth: {
            user: process.env.USER,
            pass: process.env.PASS,
          },
        });
        const mailOptions = {
          from: "nouf.ateeq@gmail.com",
          to: result.email,
          subject: "Account Verification Link",
          text:
            "Hello " +
            result.name +
            ",\n\n" +
            "Please verify your account by clicking the link: \nhttp://" +
            req.headers.host +
            "/confirmation/" +
            result.email +
            "/" +
            rand +
            "\n\nThank You!\n",
        };
        transporter.sendMail(mailOptions, function (err) {
          if (err) {
            return res.status(500).send({
              msg: "Technical Issue!, Please click on resend for verify your Email.",
            });
          }
          return res
            .status(200)
            .send(
              "A verification email has been sent to " +
                result.email +
                ". It will be expire after one day. If you not get verification Email click on resend token."
            );
        });
      }
    })
    .catch((err) => {
      console.log("err", err);
      res.status(400).send({
        msg: "We were unable to find a user with that email. Make sure your Email is correct!",
      });
    });
};

const forgitpass = (req, res) => {
  const { email } = req.body;

  userModel
    .findOne({ email: email })
    .then((result) => {
      const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: process.env.USER,
          pass: process.env.PASS,
        },
      });
      const mailOptions = {
        from: "nouf.ateeq@gmail.com",
        to: result.email,
        subject: "Account Verification Link",
        text:
          "Hello " +
          result.name +
          ",\n\n" +
          "Please copy this code to change your password: \n" +
          result.rand +
          "\n\nThank You!\n",
      };
      transporter.sendMail(mailOptions, function (err) {
        if (err) {
          return res.status(500).send({
            msg: "Technical Issue!, Please click on resend for change.",
          });
        }
        return res.status(200).send("code has been sent to " + result.email);
      });
    })

    .catch((err) => {
      console.log("err", err);
      res.status(400).send({
        msg: "We were unable to find a user with that email. Make sure your Email is correct!",
      });
    });
};

const changepass=(req,res)=>{
  const {email,rand,password}=req.body;
  userModel.findOneAndUpdate({$and:[{email},{rand}]},{password},{new:true})
  .then((result)=>{
    res.status(200).json(result)
  })
  .catch((err)=>{
    res.status(400).json(err)
  });

};

const google=(req,res)=>{
  console.log("User",req.user);
  res.json("Thank you for signing in!");
}




module.exports = {
  register,
  login,
  showUsers,
  deleteUser,
  confirmEmail,
  resendLink,
  forgitpass,
  changepass,
  google
};
