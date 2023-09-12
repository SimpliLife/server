'use strict';
const axios = require("axios")
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let { data } = await axios.get("https://raw.githubusercontent.com/SimpliLife/data-cleaning-kaggle/main/faskes/result/cities.csv")
    data = data.split("\n")
    data.pop()
    data.shift()
    let result = data.map(e => {
      let [province, city] = e.split(',')
      return {
        city: city,
        province: province,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    })
    await queryInterface.bulkInsert('Cities', result)
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Cities', null, {});
  }
};
