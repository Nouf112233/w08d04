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




module.exports = {
    createcomment
};
