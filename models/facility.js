'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Facility extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Facility.init({
    kode_faskes: {
      primaryKey: true,
      type: DataTypes.STRING
    },
    facility: DataTypes.STRING,
    province: DataTypes.STRING,
    city: DataTypes.STRING,
    type: DataTypes.STRING,
    gmap_url: DataTypes.STRING,
    address: DataTypes.TEXT,
    telephone: DataTypes.STRING,
    geography: DataTypes.GEOMETRY('POINT'),
    lat: DataTypes.FLOAT,
    lng: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Facility',
  });
  return Facility;
};