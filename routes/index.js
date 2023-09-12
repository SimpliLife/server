const router = require("express").Router()
const ControllerFaskes = require("../controllers/ControllerFaskes")
const ControllerPraDiagnosa = require("../controllers/ControllerPraDiagnosa")

router
  .get("/", ControllerPraDiagnosa.root)
  .get("/categories", ControllerPraDiagnosa.listCategory)
  .get("/categories/:id/symptoms", ControllerPraDiagnosa.listSymptomByCategory)
  .get("/symptoms/:id", ControllerPraDiagnosa.symptomById)
  .get("/facilities/:filter", ControllerFaskes.getListFaskes)
  .get("/facilities/id/:id", ControllerFaskes.faskesById)
  .get("/provinces", ControllerFaskes.listProvince)
  .get("/cities", ControllerFaskes.listCityByProvinces)
  .get("/loc", ControllerFaskes.unionProvinceCity)

module.exports = router