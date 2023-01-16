const { response } = require("express");
const Genre = require("../models/genre");

const getAllGenres = async (req, res = response) => {
  const { limit = 5, from = 0 } = req.query;

  const [total, genres] = await Promise.all([
    Genre.countDocuments({ isAvailable: true }),
    Genre.find({ isAvailable: true })
      .skip(Number(from))
      .limit(Number(limit)),
  ]);

  res.status(200).json({ total, genres });
};

const getGenreById = async (req, res = response) => {
  const { id } = req.params;
  const genre = await Genre.findById(id)

  res.status(200).json({ genre });
};

const createGenre = async (req, res = response) => {
  const name = req.body.name.toUpperCase();

  const genreDB = await Genre.findOne({ name });

  if (genreDB) {
    res.status(400).json({
      msg: `The genre ${genreDB.name} already exist`,
    });
  }

  const data = {
    name
  };

  const genre = await new Genre(data);

  await genre.save();

  res.status(201).json({
    genre,
  });
};

const updateGenre = async (req, res = response) => {
  const { id } = req.params;
  const { isAvailable, ...data } = req.body;

  data.name = data.name.toUpperCase();

  const genre = await Genre.findByIdAndUpdate(id, data, { new: true });

  res.status(200).json({
    genre,
  });
};

const deleteGenre = async (req, res = response) => {
  const { id } = req.params;
  const genre = await Genre.findByIdAndUpdate(
    id,
    { isAvailable: false },
    { new: true }
  );

  res.status(200).json({
      genre
  })
};

module.exports = {
  getAllGenres,
  getGenreById,
  createGenre,
  updateGenre,
  deleteGenre
};
