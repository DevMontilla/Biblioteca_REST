const { Router } = require("express");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares");
const { emailAlreadyExist } = require("../helpers/db-validators");
const { registerUser } = require("../controllers/users");

const router = Router();

router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("password", "Password must be longer than 6 characters").isLength({
      min: 6,
    }),
    check('email', 'Email is required').not().isEmpty().isEmail(),
    check("email").custom(emailAlreadyExist),
    validateFields,
  ],
  registerUser
);

module.exports = router;
