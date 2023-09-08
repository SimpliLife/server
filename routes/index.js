const router = require("express").Router()
const ControllerPraDiagnosa = require("../controllers/ControllerPraDiagnosa")

router
  .get("/", ControllerPraDiagnosa.root)
  .get("/categories", ControllerPraDiagnosa.root)
  .get("/categories/:id/symptoms", ControllerPraDiagnosa.root)
  .get("/symptoms/:id", ControllerPraDiagnosa.root)

module.exports = router