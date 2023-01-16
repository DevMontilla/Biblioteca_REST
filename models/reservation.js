const { Schema, model } = require("mongoose");

const ReservationSchema = Schema({
  retirementDate: {
    type: Date,
    default: new Date(),
  },
  returnDate: {
    type: String,
    required: [true, "Return date is required"],
  },
  books: [
    {
      type: Schema.Types.ObjectId,
      ref: "Book",
      required: [true, 'Must select at least one book']
    },
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, 'User is required']
  },
  returned: {
    type: Boolean,
    default: false,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

ReservationSchema.methods.toJSON = function () {
  const { __v, isDeleted, ...book } = this.toObject();
  return book;
};

module.exports = model("Reservation", ReservationSchema);
