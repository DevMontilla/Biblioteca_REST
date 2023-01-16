const { Schema, model } = require("mongoose");

const BookSchema = Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    unique: true,
  },
  genre: {
    type: Schema.Types.ObjectId,
    ref: "Genre",
    required: true,
  },
  year: {
    type: String,
    require: true
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  description: {
      type: String,
  },
  isAvailable: {
      type: Boolean,
      default: true
  }
});

BookSchema.methods.toJSON = function () {
  const { __v, isDeleted, ...book } = this.toObject();
  return book;
};

module.exports = model("Book", BookSchema);
