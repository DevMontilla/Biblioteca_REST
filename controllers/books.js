const { response } = require("express");
const Book = require("../models/book");

const getAllBooks = async (req, res = response) => {
  const { limit = 5, from = 0 } = req.query;

  const [total, books] = await Promise.all([
    Book.countDocuments({ isAvailable: true }),
    Book.find({ isAvailable: true })
      .populate("genre", "name")
      .skip(Number(from))
      .limit(Number(limit)),
  ]);

  res.json({ total, books });
};

const getBookById = async (req, res = response) => {
  const { id } = req.params;
  const book = await Book.findById(id)
    .populate("genre", "name");

  res.json({ book });
};

const createBook = async (req, res = response) => {
  const { isDeleted, user, available, ...body } = req.body;

  const bookFound = await Book.findOne({ title: body.title.toUpperCase() });

  if (bookFound) {
    return res.status(400).json({
      msg: `The book ${bookFound.title} already exist`,
    });
  }

  const data = {
    ...body,
    title: body.title.toUpperCase(),
    user: req.user._id,
  };

  const book = await new Book(data);

  await book.save();

  res.status(201).json({
    book,
  });
};

const updateBookById = async (req, res = response) => {
  const { id } = req.params;
  const { isDeleted, user, ...data } = req.body;

  if (data.title) {
    data.title = data.title.toUpperCase();
  }

  data.user = req.user._id;

  const book = await Book.findByIdAndUpdate(id, data, { new: true });

  res.status(200).json({
    book,
  });
};

const deleteBookById = async (req, res = response) => {
  const { id } = req.params;
  const deletedBook = await Book.findByIdAndUpdate(
    id,
    { isDeleted: true, isAvailable: false },
    { new: true }
  );

  res.status(200).json({
    deletedBook,
  });
};

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBookById,
  deleteBookById
};
