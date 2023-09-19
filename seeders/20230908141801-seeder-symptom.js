'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const rawData = require("../data/dataSymptom.json")
    let data = rawData.map((el, i) => {
      return { ...el, q: JSON.stringify(el.q) }
    })
    await queryInterface.bulkInsert('Symptoms', data)
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Symptoms', null, {});
  }
};
