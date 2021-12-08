const roleModel =require("./../../db/models/role");
const userModel = require("./../../db/models/user");
const postModel = require("./../../db/models/post");
const commentModel = require("./../../db/models/comment");


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
            return res.status(403).json({message:"admin forbidden"});
        }

    }catch{
        res.status(403).json(error);
    }
}
// const userAuthorization=async (req,res,next)=>{
//     try{
//         const tokenId=req.token.id;
//         const result=await userModel.findById(tokenId);
        
//         if(result&&result.isdeleted==false)
//         {
//             next();
//         }else{
//             return res.status(403).json({message:"user forbidden"});
//         }

//     }catch{
//         res.status(403).json(error);
//     }
// }

// const postAuthorization=async (req,res,next)=>{
//         try{
//             const tokenId=req.token.id;
//             const result=await postModel.findById(req.body.postId);
            
//             if(result&&result.isdeleted==false&&result.user===tokenId)
//             {
//                 next();
//             }else{
//                 return res.status(403).json({message:"post forbidden"});
//             }
    
//         }catch{
//             res.status(403).json(error);
//         }
//     }

    // const commentAuthorization=async (req,res,next)=>{
    //     try{
    //         const tokenId=req.token.id;
    //         const result=await commentModel.findById(req.body.commentId);
            
    //         if(result&&result.isdeleted==false&&result.user===tokenId)
    //         {
    //             next();
    //         }else{
    //             return res.status(403).json({message:"comment forbidden"});
    //         }
    
    //     }catch{
    //         res.status(403).json(error);
    //     }
    // }


module.exports={adminAuthorization,userAuthorization};