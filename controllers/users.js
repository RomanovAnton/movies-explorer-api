const User = require('../models/user');

module.exports.createUser = (req, res) => {
  const { name, email, password } = req.body;
  User.create({
    name,
    email,
    password,
  })
    .then((user) => {
      res.status(201).send(user);
    })
    .catch((err) => {
      res.send({ message: err.message });
    });
};

module.exports.getProfileData = (req, res) => {
  User.findById(req.user._id)
    .then((user) => {
      res.status(201).send({ email: user.email, name: user.name });
    })
    .catch((err) => {
      res.send({ message: err.message });
    });
};

module.exports.updateProfileData = (req, res) => {
  const { email, name } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    { new: true, runValidators: true },
  )
    .then((updateData) => {
      res.status(200).send(updateData);
    })
    .catch((err) => {
      res.send({ message: err.message });
    });
};
