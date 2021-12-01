const roleModel =require("./../../db/models/role");

const authorization=(req,res,next)=>{
    try{
        const roleId=req.token.role;
        const result=roleModel.findById(roleId);
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
module.exports=authorization;