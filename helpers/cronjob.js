const nodeCron = require("node-cron");
const Reservation = require("../models/reservation");
require("colors");

const job = nodeCron.schedule(
  // Run everyday at 8am
  "0 0 8 * * *", 
  // Run every second
  // "* * */1 * * *", 
  async () => {
    await Reservation.find({
      returned: false,
    })
      .populate("user", "email")
      .exec((err, reservations) => {
        if (err) {
          console.log(err);
          process.exit(-1);
        }
        reservations.map((item) => {
          if (new Date(item.returnDate) < new Date())
            console.log(
              "Sending email to ",
              `${item.user.email}`.bgGreen.white
            );
        });
      });
  },
  { scheduled: false }
);

module.exports = job;
