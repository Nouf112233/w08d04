const jwt =require('jsonwebtoken');
require("dotenv").config();
const secret = process.env.secretKey;

const authontication=(req,res,next)=>{
    try{
        if(!req.header.authorization)
        {
            return res.status(403).json({message:"forbiddin"})
        } 
        const token=req.header.authorization.split(" ")[1];
        const parsedToken=jwt.verify(token,secret);
        req.token=parsedToken;
        next();
    }catch(error){
        res.status(403).json(error);
    }

}
module.exports=authontication;