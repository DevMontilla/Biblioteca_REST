const { response } = require("express");
const Reservation = require("../models/reservation");
const Book = require("../models/book");

const getAllPendingReservations = async (req, res = response) => {
  const { limit = 5, from = 0 } = req.query;

  const [total, reservations] = await Promise.all([
    Reservation.countDocuments({ returned: false }),
    Reservation.find({ returned: false })
      .populate("user", "email")
      .skip(Number(from))
      .limit(Number(limit)),
  ]);

  res.status(200).json({
    total,
    reservations,
  });
};

const getOnePendingReservationById = async (req, res = response) => {
  const { id } = req.params;
  const reservation = await Reservation.findById(id)
    .populate("user", "email")
    .populate("books", "title");
  res.json({ reservation });
};

const createReservation = async (req, res = response) => {
  const { isDeleted, returned, user, ...body } = req.body;

  const reservedBooks = await Book.find({ isAvailable: false });

  if (reservedBooks.length > 0) {
    return res.status(400).json({
      msg: "Books not available",
      booksNotAvailable: reservedBooks,
    });
  }

  const data = {
    ...body,
    user: req.user._id,
  };

  await data.books.map(async item=>{
    await Book.findByIdAndUpdate(item, {isAvailable: false})
  })

  const reservation = await new Reservation(data);

  await reservation.save();

  res.status(201).json({
    reservation,
  });
};

const updateReservation = async (req, res = response) => {
  const { id } = req.params;
  const { isDeleted, user, ...data } = req.body;

  data.user = req.user._id;

  const reservation = await Reservation.findByIdAndUpdate(id, data, {
    new: true,
  });

  res.status(200).json({
    reservation,
  });
};

const deleteReservation = async (req, res = response) => {
  const { id } = req.params;
  const reservationDeleted = await Reservation.findByIdAndUpdate(id, {
    isDeleted: true,
  });

  res.status(200).json({
    reservationDeleted,
  });
};

module.exports = {
  getAllPendingReservations,
  getOnePendingReservationById,
  createReservation,
  updateReservation,
  deleteReservation,
};
