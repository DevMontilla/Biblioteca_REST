const { response, request } = require("express");
const Book = require("../models/book");

const searchBook = async (req = request, res = response) => {
  const { title, genre, limit = 5, from = 0 } = req.query;

  const titleSearch = new RegExp(title, "i");
  const genreSearch = new RegExp(genre, "i");

  await Book.find({
    isAvailable: true,
    $or: [{ title: titleSearch }],
  })
    .populate({
      path: "genre",
      select: "name",
      match: { name: genreSearch },
    })
    .skip(Number(from))
    .limit(Number(limit))
    .exec((err, books) => {
      if (err) {
        console.log(err);
        process.exit(-1);
      }
      res.json({
        total: books.filter((item) => item.genre).length,
        results: books.filter((item) => item.genre)});
    });
};

module.exports = { searchBook };
