const { Router } = require("express");
const { check } = require("express-validator");
const {
  getAllBooks,
  getBookById,
  createBook,
  updateBookById,
  deleteBookById,
} = require("../controllers/books");
const {
  existGenreById,
  existBookById,
} = require("../helpers/db-validators");
const { validateFields, validateJWT } = require("../middlewares");

const router = Router();

router.get("/", getAllBooks);

router.get(
  "/:id",
  [
    check("id", "Invalid mongo id").isMongoId(),
    validateFields,
    check("id").custom(existBookById),
  ],
  getBookById
);

router.post(
  "/",
  [
    validateJWT,
    check("title", "Title is required").not().isEmpty(),
    check("year", "Year is required").not().isEmpty(),
    check("genre", "No es un id de mongo").isMongoId(),
    validateFields,
    check("genre").custom(existGenreById),
  ],
  createBook
);

router.put(
  "/:id",
  [
    validateJWT,
    check("id", "Invalid mongo id").isMongoId(),
    validateFields,
    check("id").custom(existBookById),
  ],
  updateBookById
);

router.delete(
  "/:id",
  [
    validateJWT,
    check("id", "Invalid mongo id").isMongoId(),
    validateFields,
    check("id").custom(existBookById),
  ],
  deleteBookById
);

module.exports = router;
