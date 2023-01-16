const { Schema, model } = require("mongoose");

const GenreSchema = Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    unique: true,
  },
  isAvailable: {
    type: Boolean,
    default: true,
    required: true,
  }
});

GenreSchema.methods.toJSON = function () {
  const { __v, isAvailable, ...genre } = this.toObject();
  return genre;
};

module.exports = model("Genre", GenreSchema);
