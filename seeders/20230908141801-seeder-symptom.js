'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const rawData = require("../data/symptom.json")
    const symptoms = [
      "Gejala Umum (Seluruh Tubuh)",
      "Gejala Di Tulang, Sendi dan Otot",
      "Gejala Di Perut dan Sistem Pencernaan",
      "Gejala Di Hidung dan Tenggorokan",
      "Gejala Di Telinga dan Pendengaran",
      "Gejala Jantung dan Paru-Paru",
      "Gejala Di Sistem Reproduksi dan Sistem Kemih",
      "Gejala Di Mata dan Penglihatan",
      "Gejala Berat Badan dan Pertumbuhan",
      "Gejala Di Otak dan Sistem Saraf",
      "Gejala Di Kulit",
      "Gejala Dalam Kehamilan dan Persalinan"
    ]
    let data = rawData.map((el, i) => {
      let CategoryId = symptoms.indexOf(el.gejala) + 1
      return {
        CategoryId,
        title: el.judul,
        slug: el.judul.split(" ").join("-"),
        ref: i + 1,
        firstQuestion: el.pertanyaan,
        q: JSON.stringify(el.q),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    })
    await queryInterface.bulkInsert('Symptoms', data)
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Symptoms', null, {});
  }
};
