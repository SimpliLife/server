'use strict';
const csv = require('csvtojson')
const axios = require("axios")
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let { data } = await axios.get("https://raw.githubusercontent.com/SimpliLife/data-cleaning-kaggle/main/faskes/result/facilities.csv")
    let dataFacility = await csv()
      .fromString(data)
      .subscribe((jsonObj) => {
        jsonObj.geography = `POINT(${jsonObj.lng} ${jsonObj.lat})`
        jsonObj.createdAt = new Date()
        jsonObj.updatedAt = new Date()
        return jsonObj
      });
    await queryInterface.bulkInsert('Facilities', dataFacility, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Facilities', null, {});
  }
};
