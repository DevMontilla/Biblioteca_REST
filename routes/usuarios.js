const { Router } = require("express");
const { check } = require("express-validator");
const {
  validarCampos,
  validarJWT,
  esAdminRole,
  tieneRole,
} = require("../middlewares");
const {
  esRolValido,
  existeEmail,
  existeUsuarioPorId,
} = require("../helpers/db-validators");
const {
  getUsuarios,
  postUsuarios,
  putUsuarios,
  deleteUsuarios,
} = require("../controllers/usuarios");

const router = Router();

router.get("/", getUsuarios);

router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("password", "El password debe de ser de mas de 6 letras").isLength({
      min: 6,
    }),
    check("correo").custom(existeEmail),
    // check("rol", "No es un rol permitido").isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check("rol").custom(esRolValido),
    validarCampos,
  ],
  postUsuarios
);

router.put(
  "/:id",
  [
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existeUsuarioPorId),
    check("rol").custom(esRolValido),
    validarCampos,
  ],
  putUsuarios
);

router.delete(
  "/:id",
  [
    validarJWT,
    // esAdminRole,
    tieneRole("ADMIN_ROLE", "USER_ROLE", "VENTAS_ROLE"),
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existeUsuarioPorId),
    validarCampos,
  ],
  deleteUsuarios
);

module.exports = router;
