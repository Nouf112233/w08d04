const roleModel =require("./../../db/models/role");

const adminAuthorization=async (req,res,next)=>{
    try{
        const roleId=req.token.role;
        const result=await roleModel.findById(roleId);
        if(result.role==="admin")
        {
            next();
        }else{
            return res.status(403).json({message:"forbidden"});
        }

    }catch{
        res.status(403).json(error);
    }
}

const userAuthorization=async (req,res,next)=>{
    try{
        const tokenId=req.token.id;
        
        if(tokenId===req.body.userId)
        {
            next();
        }else{
            return res.status(403).json({message:"forbidden"});
        }

    }catch{
        res.status(403).json(error);
    }
}
module.exports={adminAuthorization,userAuthorization};