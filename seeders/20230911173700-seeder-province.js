'use strict';
const axios = require("axios")
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let { data } = await axios.get("https://raw.githubusercontent.com/SimpliLife/data-cleaning-kaggle/main/faskes/result/provinces.csv")
    data = data.split("\n")
    data.pop()
    data.shift()
    let result = data.map(e => {
      return {
        province: e,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    })
    await queryInterface.bulkInsert('Provinces', result)
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Provinces', null, {});
  }
};
