const app = require("../app");
const request = require("supertest");
const { Category, Symptom, sequelize } = require("../models");
const { queryInterface } = sequelize;

// Data seeding testing
const data1 = [
  {
    category: "Gejala Umum (Seluruh Tubuh)",
    icon: "GejalaUmum(SeluruhTubuh).png",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    category: "Gejala Di Tulang, Sendi dan Otot",
    icon: "GejalaDiTulang,SendidanOtot.png",
    createdAt: new Date(),
    updatedAt: new Date()
  }
]
const data2 = {
  "CategoryId": 1,
  "title": "Tidak enak badan",
  "slug": "Tidak-enak-badan",
  "ref": 1,
  "firstQuestion": "Apakah anda terus waswas atau khawatir tanpa jelas sebabnya?",
  "q": JSON.stringify({
    "ya": "KEMUNGKINAN PENYEBAB\nKecemasaran terhadap suatu hal spesifik atau penumbpukan sebagai stress da kekhawatiran bisa menimbulkan perasaan kurang sehat.",
    "tidak": {
      "q": "Apakah berat badan Anda turun sendiri sampai 4 kg dalam 10 miggu terakhir?",
      "ya": "KEMUNGKINAN PENYEBAB\nLINK(58-berat-badan-turun.json)"
    }
  }),
  createdAt: new Date(),
  updatedAt: new Date()
}

beforeEach(() => {
  jest.restoreAllMocks()
})

beforeAll((done) => {
  queryInterface.bulkInsert("Categories", data1)
    .then(() => {
      return queryInterface.bulkInsert("Symptoms", [data2])
    })
    .then(_ => done())
    .catch(err => done(err))
})

afterAll((done) => {
  Symptom.destroy({ truncate: true, cascade: true, restartIdentity: true })
    .then(() => {
      return Category.destroy({ truncate: true, cascade: true, restartIdentity: true })
    })
    .then(_ => done())
    .catch(err => done(err));
})

describe("GET /", () => {
  test("200 get list routes", (done) => {
    request(app)
      .get("/api")
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(200);
        expect(typeof body == 'object').toBeTruthy();
        done();
      })
      .catch((err) => done(err));
  })
})

describe("GET /categories", () => {
  test("200 success get categories", (done) => {
    request(app)
      .get("/api/categories")
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(200);
        expect(body).toHaveProperty('categories')
        expect(Array.isArray(body.categories)).toBeTruthy();
        expect(body.categories.length).toEqual(data1.length);
        done();
      })
      .catch((err) => done(err));
  })
  test("500 failed get categories", (done) => {
    jest.spyOn(Category, 'findAll').mockRejectedValue('Error')
    request(app)
      .get("/api/categories")
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(500);
        expect(body).toHaveProperty('message', 'Internal server error')
        done();
      })
      .catch((err) => done(err));
  })
})

describe("GET /categories/:id/symptoms", () => {
  test("200 success get symptoms by category", (done) => {
    request(app)
      .get("/api/categories/1/symptoms")
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(200);
        expect(body).toHaveProperty('category', data1[0].category)
        expect(body).toHaveProperty('icon', data1[0].icon)
        expect(body).toHaveProperty('Symptoms')
        expect(Array.isArray(body.Symptoms)).toBeTruthy();
        expect(body.Symptoms.length).toEqual(1);
        done();
      })
      .catch((err) => done(err));
  })
  test("404 failed get symptoms by category", (done) => {
    request(app)
      .get("/api/categories/100/symptoms")
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(404);
        expect(body).toHaveProperty('message', 'Data not found')
        done();
      })
      .catch((err) => done(err));
  })
  test("500 failed get symptoms by category", (done) => {
    jest.spyOn(Category, 'findByPk').mockRejectedValue('Error')
    request(app)
      .get("/api/categories/1/symptoms")
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(500);
        expect(body).toHaveProperty('message', 'Internal server error')
        done();
      })
      .catch((err) => done(err));
  })
})


describe("GET /symptoms/:id", () => {
  test("200 success get symptoms", (done) => {
    request(app)
      .get("/api/symptoms/1")
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(200);
        expect(body).toHaveProperty('category', data1[0].category)
        expect(body).toHaveProperty('categoryIcon', data1[0].icon)
        done();
      })
      .catch((err) => {
        done(err);
      });
  })
  test("404 failed get symptoms", (done) => {
    request(app)
      .get("/api/symptoms/100")
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(404);
        expect(body).toHaveProperty('message', 'Data not found')
        done();
      })
      .catch((err) => {
        done(err);
      });
  })
  test("500 failed get symptoms", (done) => {
    jest.spyOn(Symptom, 'findByPk').mockRejectedValue('Error')
    request(app)
      .get("/api/symptoms/1")
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(500);
        expect(body).toHaveProperty('message', 'Internal server error')
        done();
      })
      .catch((err) => {
        done(err);
      });
  })
})