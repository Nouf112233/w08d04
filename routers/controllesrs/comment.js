const postModel = require("./../../db/models/post");
const userModel = require("./../../db/models/user");
const commentModel = require("./../../db/models/comment");

const createcomment = (req, res) => {
  const { disc, userId, post } = req.body;
        try{postModel
          .findOne({ $and: [{ _id: post }, { isdeleted: false }] })
          .then((result) => {
            if (result) {
              const newComment = new commentModel({
                disc,
                user:userId,
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
        }catch(err){
            res.status(400).send(err);
        }
      
};

const updateComment = (req, res) => {
  const { userId, _id, disc, post } = req.body;
  
      try{postModel
        .findOne({ $and: [{ _id: post }, { isdeleted: false }] })
        .then((result) => {
          commentModel
            .findOne({
              $and: [
                { _id: _id },
                { user: userId },
                { post: post },
                { isdeleted: false },
              ],
            })
            .then(async (result) => {
              let doc = await commentModel.findOneAndUpdate(
                { _id: _id },
                { disc: disc },
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
        .catch((err) => {
          res.status(400).json("post not found");
        });
    }catch(err){
        res.status(400).send(err);
    }
    
};

const deleteComment = (req, res) => {
  const { userId, post, _id } = req.body;
      try{postModel
        .findOne({ $and: [{ _id: post }, { isdeleted: false }] })
        .then((result) => {
          commentModel
            .findOne({
              $and: [
                { _id: _id },
                { user: userId },
                { post: post },
                { isdeleted: false },
              ],
            })
            .then(async (result) => {
              await commentModel.findOneAndUpdate(
                { _id: _id },
                { isdeleted: true },
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
        .catch((err) => {
          res.status(400).json("post not found");
        });
    }catch(err){
        res.status(400).send(err);
    }
    
};

const deleteCommentByPost = (req, res) => {
  const { userId, post, _id } = req.body;
 
        try{postModel
          .findOne({ $and: [{ _id: post }, { isdeleted: false }, { user: userId }] })
          .then((result) => {
            if (result) {
              commentModel
                .findOne({
                  $and: [{ _id: _id }, { post: post }, { isdeleted: false }],
                })
                .then(async (resultt) => {
                  if (resultt) {
                    await commentModel.findOneAndUpdate(
                      { _id: _id },
                      { isdeleted: true },
                      {
                        new: true,
                      }
                    );
                    res
                      .status(200)
                      .json({
                        message: "comment has been deleted successfully",
                      });
                  }
                })
                .catch((err) => {
                  res.status(400).send("comment not found");
                });
            }
          })
          .catch((err) => {
            res.status(400).json("post not found");
          });
        }catch(err){
            res.status(400).send(err);
        }
      
};

const deleteCommentAdmin = (req, res) => {
  const { _id } = req.body;

  try{commentModel
    .findByIdAndUpdate(_id, { isdeleted: true })
    .then(() => {
      res
        .status(200)
        .json({ message: "comment has been deleted successfully" });
    })
    .catch((err) => {
      res.status(400).json("comment not exit");
    });
}catch(err){
    res.status(400).send(err);
}
};

module.exports = {
  createcomment,
  updateComment,
  deleteComment,
  deleteCommentByPost,
  deleteCommentAdmin,
};
