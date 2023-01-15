const { Router } = require("express");
const { check } = require("express-validator");
const { login } = require("../controllers/auth");
const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();

router.post(
  "/login",
  [
    check("password", "La contraseña es obligatoria").not().isEmpty(),
    check("correo", "El email es obligatorio").isEmail(),
    validarCampos,
  ],
  login
);

module.exports = router;
