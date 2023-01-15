const { Router } = require("express");
const { check } = require("express-validator");
const {
  crearCategoria,
  obtenerCategorias,
  obtenerUnaCategoria,
  actualizarCategoria,
  eliminarCategoria,
} = require("../controllers/categorias");
const { existeCategoriaPorId } = require("../helpers/db-validators");
const { validarJWT, validarCampos, esAdminRole } = require("../middlewares");

const router = Router();

//Obtener todas las categorias - publico
router.get("/", obtenerCategorias);

//Obtener una categorias por id - publico
router.get(
  "/:id",
  [
    check("id", "No es un id de Mongo valido").isMongoId(),
    validarCampos,
    check("id").custom(existeCategoriaPorId),
  ],
  obtenerUnaCategoria
);

//Crear nueva categoria - privado - cualquier persona con un token valido
router.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  crearCategoria
);

//Actualizar - privado - cualquiera con token valido
router.put(
  "/:id",
  [
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("id", "No es un id de Mongo valido").isMongoId(),
    validarCampos,
    check("id").custom(existeCategoriaPorId),
  ],
  actualizarCategoria
);

//Borrar categoria - privado - solo AdminRole
router.delete("/:id", [
    validarJWT,
    esAdminRole,
    check("id", "No es un id de Mongo valido").isMongoId(),
    validarCampos,
    check("id").custom(existeCategoriaPorId),
],eliminarCategoria);

module.exports = router;
