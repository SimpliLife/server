const { Category, Symptom, Sequelize } = require("../models")
const atCategory = ["id", "category", "icon"]
const atSymptom = ["id", "title"]

class ControllerPraDiagnosa {
  static root(req, res) {
    res.send({
      "1.": "GET /categories",
      "2.": "GET /categories/:id/symptoms",
      "3.": "GET /symptoms/:id",
    })
  }
  static listCategory(req, res, next) {
    Category.findAll({ attributes: atCategory })
      .then(data => res.send(data))
      .catch(err => next(err))
  }
  static async listSymptomByCategory(req, res, next) {
    try {
      let data = await Category.findByPk(req.params.id, {
        attributes: atCategory,
        include: [{ model: Symptom, attributes: atSymptom }]
      })
      if (!data) throw { statusCode: 404 }
      res.send(data)
    } catch (error) {
      next(error)
    }
  }
  static async symptomById(req, res, next) {
    try {
      let data = await Symptom.findByPk(req.params.id, {
        include: Category,
        attributes: [
          "id", "CategoryId", "title", "slug", "ref", "firstQuestion", "q",
          [Sequelize.col('"Category"."category"'), 'category'],
          [Sequelize.col('"Category"."icon"'), 'categoryIcon']
        ],
        raw: true,
        nest: true
      })
      if (!data) throw { statusCode: 404 }
      delete data.Category
      res.send(data)
    } catch (error) {
      console.log(error);
      next(error)
    }
  }
}

module.exports = ControllerPraDiagnosa