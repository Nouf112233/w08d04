const postModel = require("./../../db/models/post");
const userModel = require("./../../db/models/user");
const commentModel = require("./../../db/models/comment");

const createcomment = (req, res) => {
  const { disc, user, post } = req.body;
  userModel
    .find({$and:[{ _id: user},{isdeleted:false}] })
    .then((result) => {
      if (result) {
        postModel
          .find({$and:[{ _id: post},{isdeleted:false}] })
          .then((result) => {
            if (result) {
              const newComment = new commentModel({
                disc,
                user,
                post,
              });
              newComment
                .save()
                .then((result) => {
                  res.status(200).json(result);
                })
                .catch((err) => {
                  res.status(400).json(err);
                });
            } else {
              res.status(400).json("Post not found");
            }
          })
          .catch((err) => {
            res.status(400).json("Post not found");
          });
      } else res.status(400).json("User not found");
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

const updateComment = (req, res) => {
    const { user, _id, disc ,post} = req.body;
      userModel
      .find({$and:[{ _id: user},{isdeleted:false}] })
      .then((result)=>{
          postModel
          .find({$and:[{ _id: post},{isdeleted:false}] })
          .then((result)=>{
            commentModel
            .findOne({$and: [ {_id:_id}, {user:user},{post:post}, {isdeleted: false}] })
            .then(async (result) => {
                let doc = await commentModel.findOneAndUpdate(
                  {_id:_id},
                  {disc:disc},
                  {
                    new: true,
                  }
                );      
                res.status(200).json(doc);            
            })
            .catch((err) => {
              res.status(400).send("comment not found");
            });
          })
          .catch((err)=>{
            res.status(400).json("post not found");
          })
      })
      .catch((err)=>{
        res.status(400).json("User not found");
      })
  };

  const deleteComment = (req, res) => {
    const { user, post,_id } = req.body;
      userModel
      .find({$and:[{ _id: user},{isdeleted:false}] })
      .then((result)=>{
          postModel
          .find({$and:[{ _id: post},{isdeleted:false}] })
          .then((result)=>{
            commentModel
            .findOne({$and: [ {_id:_id}, {user:user},{post:post}, {isdeleted: false}] })
            .then(async (result) => {
                let doc = await commentModel.findOneAndUpdate(
                  {_id:_id},
                  {isdeleted:true},
                  {
                    new: true,
                  }
                );
                res.status(200).json("comment deleted sucsseful");
            })
            .catch((err) => {
              res.status(400).send("comment not found");
            });
          })
          .catch((err)=>{
            res.status(400).json("post not found");
          })
      })
      .catch((err)=>{
        res.status(400).json("User not found");
      })
   
  };




module.exports = {
    createcomment,
    updateComment,
    deleteComment
};
