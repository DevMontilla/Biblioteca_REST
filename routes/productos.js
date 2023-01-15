const { Router } = require("express");
const { check } = require("express-validator");
const {
  crearProducto,
  obtenerProductos,
  obtenerUnProducto,
  actualizarProducto,
  eliminarProducto,
} = require("../controllers/productos");
const {
  existeProductoPorId,
  existeCategoriaPorId,
} = require("../helpers/db-validators");
const { validarJWT, validarCampos, esAdminRole } = require("../middlewares");

const router = Router();

router.get("/", obtenerProductos);

router.get(
  "/:id",
  [
    check("id", "No es un id de Mongo valido").isMongoId(),
    validarCampos,
    check("id").custom(existeProductoPorId),
  ],
  obtenerUnProducto
);

router.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("categoria", "No es un id de mongo").isMongoId(),
    validarCampos,
    check("categoria").custom(existeCategoriaPorId),
  ],
  crearProducto
);

router.put(
  "/:id",
  [
    validarJWT,
    check("id", "No es un id de Mongo valido").isMongoId(),
    validarCampos,
    check("id").custom(existeProductoPorId),
  ],
  actualizarProducto
);

router.delete(
  "/:id",
  [
    validarJWT,
    esAdminRole,
    check("id", "No es un id de Mongo valido").isMongoId(),
    validarCampos,
    check("id").custom(existeProductoPorId),
  ],
  eliminarProducto
);

module.exports = router;
