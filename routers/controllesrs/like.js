const postModel = require("./../../db/models/post");
const userModel = require("./../../db/models/user");
const likeModel = require("./../../db/models/like");

const addlike = (req, res) => {
  const { userId, post } = req.body;

  try {
    postModel
      .findOne({ $and: [{ _id: post }, { isdeleted: false }] })
      .then((result) => {
        if (result) {
          const newLike = new likeModel({
            user: userId,
            post,
          });
          newLike
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
  } catch (err) {
    res.status(400).send(err);
  }
};

const taggleLike = (req, res) => {
  const { userId, _id } = req.body;
  try {
    likeModel
      .findOne({
        $and: [{ _id: _id }, { user: userId }],
      })
      .then(async (result) => {
        let doc = await likeModel.findOneAndUpdate(
          { _id: _id },
          { like: !like },
          {
            new: true,
          }
        );
        res.status(200).json(doc);
      })
      .catch((err) => {
        res.status(400).send("like not found");
      });
  } catch (err) {
    res.status(400).send(err);
  }
};

module.exports = { addlike, taggleLike };
