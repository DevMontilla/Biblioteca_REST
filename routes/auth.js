const { Router } = require("express");
const { check } = require("express-validator");
const { login } = require("../controllers/auth");
const { validateFields } = require("../middlewares/validate-fields");

const router = Router();

router.post(
  "/login",
  [
    check("password", "Password is required").not().isEmpty(),
    check("email", "Email is required").isEmail(),
    validateFields,
  ],
  login
);

module.exports = router;
