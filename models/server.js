require("colors");
const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/config");
const job = require("../helpers/cronjob");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.paths = {
      auth: "/api/auth",
      books: "/api/books",
      genre: "/api/genres",
      reservation: "/api/reservations",
      search: "/api/search",
      usersPath: "/api/users",
    };

    //DB connection
    this.connectDB();

    //Middlewares
    this.middlewares();

    //Routes
    this.routes();

    //Cronjob
    this.cronjob();
  }

  async connectDB() {
    await dbConnection();
  }

  middlewares() {
    //CORS
    this.app.use(cors());
    //Body parser
    this.app.use(express.json());
  }

  routes() {
    this.app.use(this.paths.auth, require("../routes/auth"));
    this.app.use(this.paths.books, require("../routes/books"));
    this.app.use(this.paths.genre, require("../routes/genres"));
    this.app.use(this.paths.search, require("../routes/search"));
    this.app.use(this.paths.reservation, require("../routes/reservations"));
    this.app.use(this.paths.usersPath, require("../routes/users"));
  }

  cronjob() {
    job.start()
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server running on PORT = ${this.port}`.italic.blue);
    });
  }
}

module.exports = Server;
