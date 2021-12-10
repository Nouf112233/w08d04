const passport=require("passport");
const passportJwt= require("passport-jwt");
const ExtractJwt=passportJwt.ExtractJwt;
const StrategyJwt=passportJwt.Strategy;
// const GoogleStratgy=require("passport-google-oauth20").Strategy;
const userModel=require('./../../db/models/user')



passport.use(
    new StrategyJwt(
        {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.secretKey,


        },
        function (jwtPayload,done){
            return userModel.findOne({where:{_id:jwtPayload.id}})
            .then((user)=>{
                return done(null,user);

            })
            .catch((err)=>{
                done(err);
            });
        }
    )
);