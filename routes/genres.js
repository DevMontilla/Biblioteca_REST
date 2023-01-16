const { Router } = require("express");
const { check } = require("express-validator");
const {
  createGenre,
  getAllGenres,
  getGenreById,
  updateGenre,
  deleteGenre,
} = require("../controllers/genres");
const { existGenreById } = require("../helpers/db-validators");
const { validateJWT, validateFields } = require("../middlewares");

const router = Router();

router.get("/", getAllGenres);

router.get(
  "/:id",
  [
    check("id", "Invalid mongo id").isMongoId(),
    validateFields,
    check("id").custom(existGenreById),
  ],
  getGenreById
);

router.post(
  "/",
  [
    validateJWT,
    check("name", "Name is required").not().isEmpty(),
    validateFields,
  ],
  createGenre
);

router.put(
  "/:id",
  [
    validateJWT,
    check("name", "Name is required").not().isEmpty(),
    check("id", "Invalid mongo id").isMongoId(),
    validateFields,
    check("id").custom(existGenreById),
  ],
  updateGenre
);

router.delete(
  "/:id",
  [
    validateJWT,
    check("id", "Invalid mongo id").isMongoId(),
    validateFields,
    check("id").custom(existGenreById),
  ],
  deleteGenre
);

module.exports = router;
