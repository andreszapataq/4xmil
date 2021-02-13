const mongoose = require("mongoose");

const cuentaSchema = new mongoose.Schema({
    banco: String,
    cupo: {
        type: Number,
        required: [true, "Debes entrar un valor"],
        default: 0,
        lowercase: true,
    }
    // Propiedades
});

const Cuenta = mongoose.model("Cuenta", cuentaSchema); //"Cuenta" mismo o similar a la DB
// "Post"
// Posts

module.exports = Cuenta;