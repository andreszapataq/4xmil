const express = require('express');
const cors = require('cors');
const usuarioRouter = require("./routes/usuarioRoutes");
const cuentaRouter = require("./routes/cuentaRoutes");
const historialRouter = require("./routes/historialRoutes");
const app = express();

//GLOBAL MIDDLEWARE (SETTINGS)
app.use(cors()); // PREGUNTAR A TAVO
app.use(express.json());
// app.use(bodyParser.json());
//Más como el de arriba

// app.use(express.json()); //allows us to access the body of the request

//RUTAS
app.use("/api/v1/usuarios", usuarioRouter); //PREGUNTAR A TAVO API...
app.use("/api/v1/cuentas", cuentaRouter);
app.use("/api/v1/historial", historialRouter);

// app.use("/api/v1/usuarios", var router = express.Router(); router.get("/", usuarioController.getUsuarios);)

// app.use("/api/v1", (req, res, next) => {
//     await Usuario.find()
//     await Cuenta.find();

//     res.json({
//         statys:
//         data: usuarios,
//         data2: cuentas
//     })
// }); 
//Más como el de arriba

module.exports = app;