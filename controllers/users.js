const { response, request } = require("express");
const User = require("../models/user");
const bcryptjs = require("bcryptjs");

const registerUser = async (req = request, res = response) => {
  const { name, email, password } = req.body;
  const user = new User({ name, email, password });

  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt);

  await user.save();

  res.status(201).json({
    user,
  });
};

module.exports = {
  registerUser,
};
