'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Symptom extends Model {
    static associate(models) {
      Symptom.belongsTo(models.Category)
    }
  }
  Symptom.init({
    CategoryId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    slug: DataTypes.STRING,
    ref: DataTypes.INTEGER,
    firstQuestion: DataTypes.STRING,
    q: DataTypes.JSON
  }, {
    sequelize,
    modelName: 'Symptom',
  });
  return Symptom;
};