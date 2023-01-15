const { findById } = require("../models/role");
const Role = require("../models/role");
const Usuario = require("../models/usuario");
const Categoria = require("../models/categoria");
const Producto = require('../models/producto')

const esRolValido = async (rol = "") => {
  const existeRol = await Role.findOne({ rol });
  if (!existeRol) {
    throw new Error(`El rol ${rol} no existe`);
  }
};

const existeEmail = async (correo = "") => {
  const existeEmail = await Usuario.findOne({ correo });

  if (existeEmail) {
    throw new Error(`El correo: ${correo} ya esta registrado`)
  }
};

const existeUsuarioPorId = async (id) => {
  const usuario = await Usuario.findById(id)
  if(!usuario) {
    throw new Error(`El id no existe`)
  }
}

const existeCategoriaPorId = async(id)=>{
  const categoria = await Categoria.findById(id)
  if(!categoria) {
    throw new Error(`El id no existe`)
  }
}

const existeProductoPorId = async(id)=>{
  const producto = await Producto.findById(id)
  if(!producto) {
    throw new Error(`El id no existe`)
  }
}

module.exports = { esRolValido, existeEmail, existeUsuarioPorId, existeCategoriaPorId, existeProductoPorId };
