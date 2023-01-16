const { request, response } = require("express");
const bcryptjs = require("bcryptjs");
const User = require("../models/user");
const { generateJWT } = require("../helpers/generate-jwt");

const login = async (req = request, res = response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        msg: "Email or password incorrect",
      });
    }

    if (!user.isActive) {
      return res.status(400).json({
        msg: "Email or password incorrect",
      });
    }

    const passwordIsValid = bcryptjs.compareSync(password, user.password);

    if (!passwordIsValid) {
      return res.status(400).json({
        msg: "Email or password incorrect",
      });
    }

    const token = await generateJWT(user.id);

    res.json({
      user,
      token,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Contact the administrator",
    });
  }
};

module.exports = {
  login,
};
