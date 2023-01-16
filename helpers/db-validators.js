const User = require("../models/user");
const Book = require("../models/book");
const Genre = require("../models/genre");

const emailAlreadyExist = async (email = "") => {
  const emailFound = await User.findOne({ email });
  if (emailFound) {
    throw new Error(`The email: ${email} is already exist`);
  }
};

const existBookById = async (id) => {
  const book = await Book.findOne({ id });
  if (!book) {
    throw new Error(`The book id does not exist`);
  }
};

const existGenreById = async (id) => {
  const genre = await Genre.findOne({ id });
  if (!genre) {
    throw new Error(`The genre id does not exist`);
  }
};

const existUserById = async (id) => {
  const user = await User.findOne({ id });
  if (!user) {
    throw new Error(`The user id does not exist`);
  }
};

module.exports = {
  emailAlreadyExist,
  existBookById,
  existGenreById,
  existUserById
};
