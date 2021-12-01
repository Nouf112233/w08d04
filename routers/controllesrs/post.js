const postModel = require("./../../db/models/post");
const userModel = require("./../../db/models/user");



  const createPost = (req, res) => {
    const { disc, user,image } = req.body;
  
    userModel
      .findById({ _id: user })
      .then((result) => {
        if (result) {
          const newPost = new postModel({
            disc,
            user,
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
        } else res.status(400).json("User not found");
      })
      .catch((err) => {
        res.status(400).json("User not found");
      });
  };

  const getPosts = (req, res) => {
    const { id } = req.body;
  
    userModel
      .find({ _id: id })
      .then((result) => {
        postModel
          .find({$and: [{user: id}, {isdeleted: false}] })
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
      })
      .catch((err) => {
        res.status(400).json("User not found");
      });
  };

  const getPostById = (req, res) => {
    const { userId, postId } = req.body;
    userModel
      .findById({ _id: userId })
      .then((result) => {
        postModel
          .find({$and: [{ _id: postId},{ user: userId}, {isdeleted: false}] })
          .then((result) => {
            if (result.length>0) res.status(200).json(result);
            else res.status(400).send("user does not has this post ");
          })
          .catch((err) => {
            res.status(400).send("user does not has this post");
          });
      })
      .catch((err) => {
        res.status(400).json("User not found");
      });
  };

  



module.exports = {createPost,getPosts,getPostById };
