const Cuenta = require("../models/cuentaModel");
const schedule = require('node-schedule');

schedule.scheduleJob('0 0 0 1 * *', () => {
    console.log('Actualizando cupos')
    nuevoMes()
});

async function nuevoMes() {
    const epa = await Cuenta.updateMany({cupo: 2360020});
      console.log(epa)
}

exports.getCuentas = async (req, res, next) => {

    const cuentas = await Cuenta.find(); // SELECT * FROM cuentas
    
    console.log(cuentas);

    /*
    cuando inicie la pagina (4 x mil)
    hit this end-point
    y trae el valor de cuentas e.g. 10,000 or -100,000
        if fecha hoy es 1 marzo ?
            update cuentas cupo a: 2,000,000
        else 
            trae los cupos tal como estan
    */

    res.status(200).json({
        status: "Success",
        message: "Todo bien!",
        data: cuentas
    })
}

exports.decrementCuenta = async (req, res, next) => {
    const cuenta = await Cuenta.findOne({
        banco: req.body.banco
    });
    let cupo = cuenta.cupo;
    let valor = req.body.valor;
    cuenta.cupo = cupo - valor;
    req.body.nuevoCupo = cuenta.cupo;
    await Cuenta.findByIdAndUpdate(cuenta._id, {cupo: cuenta.cupo});
    next();
}