const passport=require("passport");
const GoogleStratgy=require("passport-google-oauth20").Strategy;
const userModel=require('./../../db/models/user');

passport.use(
  new GoogleStratgy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/auth/google/callback",
    passReqToCallback: true

  },async (req,accessToken, refreshToken, profile, cb)=> {
      const defaultUser={
          username:`${profile.name.givenName} ${profile.name.familyName}`,
     email:profile.emails[0].value,
     avatar:profile.photos[0].value,
     googleId:profile.id

    }
    const user= await userModel.findOrCreate({where: {googleId: profile.id }, defaults:defaultUser}).catch((err)=>{
        console.log("Error signing up",err);
        cb(err,null);
    });
    if(user&&user[0])
    return cb(null,user&&user[0])

  }));

  passport.serializeUser((user,cb)=>{
      console.log("serialization user:",user);
  cb(null,user.id);
});
passport.deserializeUser((user,cb)=>{
    const user = await userModel.findOne({where: {id}}).catch((err)=>{
        console.log("Error deserializing",err)
        cb(err,user);
    })
    console.log("DeSerialized user",user);
    if(user) cb(null,user);
  
});