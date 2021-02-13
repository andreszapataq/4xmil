const Usuario = require("../models/usuarioModel");

exports.getUsuarios = async (req, res, next) => {
    const usuarios = await Usuario.find();

    console.log(usuarios);

    res.json({
        data: usuarios
    })
}