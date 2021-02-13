const mongoose = require("mongoose");

const historialSchema = new mongoose.Schema({
    fecha: {
        type: Date,
        required: true,
        default: Date.now
    },
    concepto: String,
    valor: {
        type: Number,
        required: true
    },
    cuenta: {
        type: mongoose.Schema.ObjectId,
        ref: "Cuenta"
    }
});

historialSchema.pre(/^find/, function(next) {
    this.populate({
      path: "cuenta",
    // select: "-__v -photo", //don't display this field
    });
    next();
});

const Historial = mongoose.model("Historial", historialSchema);

module.exports = Historial;