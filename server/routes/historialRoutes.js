const express = require("express");
const historialController = require("../controllers/historialController");
const cuentaController = require("../controllers/cuentaController");

const router = express.Router();

// router.post("/", historialController.postHistorial);

router
  .route("/")
  .get(historialController.getHistorial)
  .post(cuentaController.decrementCuenta, historialController.postHistorial);

module.exports = router;