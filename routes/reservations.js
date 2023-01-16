const { Router } = require("express");
const { check } = require("express-validator");
const {
  getAllPendingReservations,
  getOnePendingReservationById,
  createReservation,
  updateReservation,
  deleteReservation,
} = require("../controllers/reservations");
const { existUserById, existBookById } = require("../helpers/db-validators");
const { validateFields, validateJWT } = require("../middlewares");

const router = Router();

router.get("/", validateJWT, getAllPendingReservations);

router.get(
  "/:id",
  [validateJWT, check("id", "Invalid mongo id").isMongoId(), validateFields],
  getOnePendingReservationById
);

router.post(
  "/",
  [
    validateJWT,
    check("returnDate", "Return date is required").not().isEmpty(),
    check("books", "Must select at least one book").not().isEmpty(),
    validateFields,
    check("user").custom(existUserById),
  ],
  createReservation
);

router.put(
  "/:id",
  [
    validateJWT,
    check("id", "Invalid mongo id").isMongoId(),
    validateFields,
    check("id").custom(existBookById),
  ],
  updateReservation
);

router.delete(
  "/:id",
  [
    validateJWT,
    check("id", "Invalid mongo id").isMongoId(),
    validateFields,
    check("id").custom(existBookById),
  ],
  deleteReservation
);

module.exports = router;
