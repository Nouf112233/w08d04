const postModel = require("./../../db/models/post");
const userModel = require("./../../db/models/user");
const commentModel = require("./../../db/models/comment");
const likeModel = require("./../../db/models/like");



  const createPost = (req, res) => {
    const { disc, userId,image } = req.body;

          try{const newPost = new postModel({
            disc,
            user:userId,
            image
          });
  
          newPost
            .save()
            .then((result) => {
              res.status(200).json(result);
            })
            .catch((err) => {
              res.status(400).send(err);
            });
        }catch(err){
            res.status(400).send(err);
        }
 
  };

  const getPosts = (req, res) => {
    const { userId } = req.body;
       try{postModel
          .find({$and: [{user: userId}, {isdeleted: false}] })
          .then((result) => {
              if(result.length>0)
              {
                res.status(200).json(result);
              }else{
                res.status(400).json("User not has any posts");
              }   
          })
          .catch((err) => {
            res.status(400).json("User not has any posts");
          });
        }catch(err){
            res.status(400).send(err);
        }
  };

  const getPostById = (req, res) => {
    const { userId, postId } = req.body;

        try{postModel
          .find({$and: [{ _id: postId}, {isdeleted: false}] })
          .then((resul) => {
            if (resul.length>0)
            {
                commentModel
                .find({$and: [{post: postId},{isdeleted: false}] })
                .then((result)=>{
                    res.status(200).json({resul,result});
                })
                .catch(()=>{
                    res.status(200).json(resul);
                })
                
            } 
            else res.status(400).send("user does not has this post ");
          })
          .catch((err) => {
            res.status(400).send("user does not has this post");
          });
        }catch(err){
            res.status(400).send(err);
        }

  };

  const updatePost = (req, res) => {
    const { user, _id, disc } = req.body;
  
    if (user == undefined || _id == undefined || disc == undefined)
      return res.status(400).send("some data are missing");
    postModel
      .findOne({$and: [ {_id:_id}, {user:user}, {isdeleted: false}] })
      .then(async (result) => {
        if (result) {
          let doc = await postModel.findOneAndUpdate(
            {_id:_id},
            {disc:disc},
            {
              new: true,
            }
          );
  
          res.status(200).json(doc);
        } else res.status(400).send("user does not has this post");
      })
      .catch((err) => {
        res.status(400).send("user does not has post");
      });
  };

  const deletePostById = (req, res) => {
    const { user, _id } = req.body;
  
    userModel
      .findById({ _id: user })
      .then((result) => {
        postModel
          .findOne({$and: [{_id}, {user}] })
          .then(async (result) => {
            if (result) {
              let doc = await postModel.findOneAndUpdate(
                { _id:  _id },
                {
                    isdeleted: true,
                },
                {
                  new: true,
                }
              );
  
              res.status(200).json(doc);
            } else res.status(400).send("user does not has this post");
          })
          .catch((err) => {
            res.status(400).send("user does not has this post");
          });
      })
      .catch((err) => {
        res.status(400).json("User not found");
      });
  };

  const deletePostByAdmin = (req, res) => {
  
        const { _id } = req.body;
      
        postModel
          .findByIdAndUpdate(_id, { isdeleted: true })
          .then(() => {
            res.status(200).json({ message: "Post has been deleted successfully" });
          })
          .catch((err) => {
            res.status(400).json(err);
          });
      };

  



module.exports = {createPost,getPosts,getPostById,updatePost,deletePostById,deletePostByAdmin };
