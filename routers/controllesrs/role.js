const roleModel = require("./../../db/models/role");

const addRole = (req, res) => {
  const { role, permissions } = req.body;
  const newRole = new roleModel({
    role,
    permissions,
  });
  newRole
    .save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
        res.status(400).json(err);
    });
};

const getRoles = (req, res) =>{
    roleModel
    .find({})
    .then((result) => {
        res.status(201).json(result);
      
    })
    .catch((err) => {
        res.status(400).json(err);
      
    });
  };

module.exports = { addRole,getRoles };