require("colors");
const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.paths = {
      auth:         '/api/auth',
      buscar:       '/api/buscar',
      catogerias:   '/api/categorias',
      productos:    '/api/productos',
      usuariosPath: '/api/usuarios'
    }

    //DB connection
    this.conectarDB()

    //Middlewares
    this.middlewares();

    //Routes
    this.routes();
  }

  async conectarDB() {
    await dbConnection()
  }

  middlewares() {
    //CORS
    this.app.use(cors());

    //Body parser
    this.app.use(express.json())
  }

  routes() {
    this.app.use(this.paths.auth, require('../routes/auth'))
    this.app.use(this.paths.buscar, require('../routes/buscar'))
    this.app.use(this.paths.catogerias, require('../routes/categorias'))
    this.app.use(this.paths.productos, require('../routes/productos'))
    this.app.use(this.paths.usuariosPath, require('../routes/usuarios'))
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server running on PORT = ${this.port}`.italic.blue);
    });
  }
}

module.exports = Server;
