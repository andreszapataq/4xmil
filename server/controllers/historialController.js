const Historial = require("../models/historialModel");

exports.getHistorial = async (req, res, next) => {
    const historials = await Historial.find({ fecha: { $gte: currentMonth() } }).sort({ fecha: -1 });

    // res.status(201).json({
    res.json({
      status: "success",
      data: historials, // LA CONVENCION ES ENVIAR ESTO AL CLIENTE
    });
};

function currentMonth() {
  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  if(month <= 9) {
    let dateReg1 = `${year}-0${month}-01`;
    console.log(dateReg1); // 2021-01-01
    return dateReg1;
  } else {
    let dateReg2 = `${year}-${month}-01`;
    console.log(dateReg2);
    return dateReg2;
  }
}

exports.postHistorial = async (req, res, next) => {
    // const historial = await Historial.create(req.body);
    await Historial.create(req.body); // 1
    
    const historials = await Historial.find({ fecha: { $gte: currentMonth() } }).sort({ fecha: -1 }); // 2

    console.log("req.nuevoCupo: ", req.body.nuevoCupo);
    // res.status(201).json({
    res.json({
      status: "success",
      data: historials, // LA CONVENCIÓN ES ENVIAR ESTO AL CLIENTE
      nuevoCupo: req.body.nuevoCupo
    });
};