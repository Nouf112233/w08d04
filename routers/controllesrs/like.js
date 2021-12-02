const postModel = require("./../../db/models/post");
const userModel = require("./../../db/models/user");
const likeModel = require("./../../db/models/like");

const addlike = (req, res) => {
  const { user, post } = req.body;
  userModel
    .findOne({ $and: [{ _id: user }, { isdeleted: false }] })
    .then((result) => {
      if (result) {
        postModel
          .findOne({ $and: [{ _id: post }, { isdeleted: false }] })
          .then((result) => {
            if (result) {
              const newLike = new likeModel({
                user,
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
      } else res.status(400).json("User not found");
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

const taggleLike = (req, res) => {
  const { user, _id } = req.body;
  userModel
    .findOne({ $and: [{ _id: user }, { isdeleted: false }] })
    .then((result) => {
      if (result) {
        // let doc = await likeModel.findOneAndUpdate(
        //           {$and:[ {_id: _id},{user:user}] },
        //           { like: !like },
        //           {
        //             new: true,
        //           }
        //         );
        //         console.log("doc",doc);
        //         if(doc){
        //             console.log("doc",doc);
        //             res.status(200).json(doc);
        //         }else{
        //             res.status(400).send("like not found"); 
        //         }
          console.log(result);
        likeModel
        .findOne({
            $and: [
              { _id: _id },
              { user: user },
            ],
          }) 
          .then( async (resultt) => {
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

      } else {
        res.status(400).json("User not found");
      }
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

module.exports = { addlike, taggleLike };
