const router = require("express").Router()
const ControllerPraDiagnosa = require("../controllers/ControllerPraDiagnosa")

router
  .get("/", ControllerPraDiagnosa.root)
  .get("/categories", ControllerPraDiagnosa.listCategory)
  .get("/categories/:id/symptoms", ControllerPraDiagnosa.listSymptomByCategory)
  .get("/symptoms/:id", ControllerPraDiagnosa.symptomById)

module.exports = router