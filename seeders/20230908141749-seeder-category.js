'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const names = [
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
    let data = names.map(el => {
      return {
        category: el,
        icon: el.split(" ").join("") + ".png",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    })
    await queryInterface.bulkInsert('Categories', data)
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories', null, {});
  }
};
