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

  



module.exports = {createPost };
