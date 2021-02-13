const express = require("express");
const cuentaController = require("../controllers/cuentaController");

const router = express.Router();

router.get("/", cuentaController.getCuentas);
// router.post("/", cuentaController.agregarCuenta);

module.exports = router;