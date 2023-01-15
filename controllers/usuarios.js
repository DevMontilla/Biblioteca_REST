const { response, request } = require("express");
const Usuario = require("../models/usuario");
const bcryptjs = require("bcryptjs");

const getUsuarios = async (req = request, res = response) => {
  const { limite = 5, desde = 0 } = req.query;

  const [total, usuarios] = await Promise.all([
    Usuario.countDocuments({estado: true}),
    Usuario.find({estado: true})
    .skip(Number(desde))
    .limit(Number(limite))
  ])

  res.json({total, usuarios});
};

const postUsuarios = async (req = request, res = response) => {
  const { nombre, correo, password, rol } = req.body;
  const usuario = new Usuario({ nombre, correo, password, rol });

  const salt = bcryptjs.genSaltSync();
  usuario.password = bcryptjs.hashSync(password, salt);

  await usuario.save();

  res.json({
    usuario,
  });
};

const putUsuarios = async (req = request, res = response) => {
  const { id } = req.params;
  const { _id, password, google, correo, ...resto } = req.body;

  if (password) {
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(password, salt);
  }

  const usuario = await Usuario.findByIdAndUpdate(id, resto);

  res.json({
    usuario,
  });
};

const deleteUsuarios = async (req = request, res = response) => {
  const {id} = req.params

  const usuario = await Usuario.findByIdAndUpdate(id, {estado: false})
  const usuarioAutenticado = req.usuario

  res.json({
    usuario,
    usuarioAutenticado
  });
};

module.exports = {
  getUsuarios,
  postUsuarios,
  putUsuarios,
  deleteUsuarios,
};
