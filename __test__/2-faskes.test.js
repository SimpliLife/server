const app = require("../app");
const request = require("supertest");
const { sequelize, Province, City, Facility } = require("../models");
const { queryInterface } = sequelize;

let dataProvince = [{
  "province": "DKI Jakarta",
  "createdAt": "2023-09-12T04:55:31.941Z",
  "updatedAt": "2023-09-12T04:55:31.941Z"
}]
let dataCity = [
  {
    "province": "DKI Jakarta",
    "city": "Kota Jakarta Selatan",
    "createdAt": "2023-09-12T04:55:31.941Z",
    "updatedAt": "2023-09-12T04:55:31.941Z"
  },
  {
    "province": "DKI Jakarta",
    "city": "Kota Jakarta Timur",
    "createdAt": "2023-09-12T04:55:31.941Z",
    "updatedAt": "2023-09-12T04:55:31.941Z"
  }
]
let dataFacility = [
  {
    "kode_faskes": "0112R016",
    "facility": "RS Bhayangkara Sespimma Polri",
    "province": "DKI Jakarta",
    "city": "Kota Jakarta Selatan",
    "type": "Rumah Sakit",
    "gmap_url": "http://maps.google.co.id/?q=-6.286886,106.770734",
    "address": "Jl, Ciputat Raya No. 40",
    "telephone": "021-7650384",
    "geography": "POINT(106.770734 -6.286886)",
    "lat": "-6.286886",
    "lng": "106.770734",
    "createdAt": "2023-09-12T04:55:31.941Z",
    "updatedAt": "2023-09-12T04:55:31.941Z"
  },
  {
    "kode_faskes": "0112R027",
    "facility": "RS. Dr. Suyoto",
    "province": "DKI Jakarta",
    "city": "Kota Jakarta Selatan",
    "type": "Rumah Sakit",
    "gmap_url": "http://maps.google.co.id/?q=-6.268421,106.766696",
    "address": "Jl. Rc Veteran N0. 178",
    "telephone": "021-73884000",
    "geography": "POINT(106.766696 -6.268421)",
    "lat": "-6.268421",
    "lng": "106.766696",
    "createdAt": "2023-09-12T04:55:31.941Z",
    "updatedAt": "2023-09-12T04:55:31.941Z"
  },
]

beforeAll(async () => {
  await queryInterface.bulkInsert("Provinces", dataProvince)
  await queryInterface.bulkInsert("Cities", dataCity)
  await queryInterface.bulkInsert("Facilities", dataFacility)
})

afterAll(async () => {
  await queryInterface.bulkDelete("Facilities", null, {
    restartIdentity: true,
    cascade: true,
    truncate: true,
  })
  await queryInterface.bulkDelete("Cities", null, {
    restartIdentity: true,
    cascade: true,
    truncate: true,
  })
  await queryInterface.bulkDelete("Provinces", null, {
    restartIdentity: true,
    cascade: true,
    truncate: true,
  })
}, 10000)



describe("GET /loc", () => {
  test("200 get list of City and Province", (done) => {
    request(app)
      .get("/api/loc")
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(200);
        expect(typeof body == 'object').toBeTruthy();
        expect(body).toHaveProperty('locations')
        expect(Array.isArray(body.locations)).toBeTruthy();
        expect(body.locations.length).toEqual(3);
        done();
      })
      .catch((err) => done(err));
  })
  test("500 failed get list of City and Province", (done) => {
    jest.spyOn(sequelize, 'query').mockRejectedValue('Error')
    request(app)
      .get("/api/loc")
      .then((response) => {
        jest.restoreAllMocks()
        const { body, status } = response;
        expect(status).toBe(500);
        expect(body).toHaveProperty('message', 'Internal server error')
        done();
      })
      .catch((err) => done(err));
  })
})

describe("GET /provinces", () => {
  test("200 get list Province", (done) => {
    request(app)
      .get("/api/provinces")
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(200);
        expect(typeof body == 'object').toBeTruthy();
        expect(body).toHaveProperty('provinces')
        expect(Array.isArray(body.provinces)).toBeTruthy();
        expect(body.provinces.length).toEqual(1);
        done();
      })
      .catch((err) => done(err));
  })
  test("500 failed get list Province", (done) => {
    jest.spyOn(Province, 'findAll').mockRejectedValue('Error')
    request(app)
      .get("/api/provinces")
      .then((response) => {
        jest.restoreAllMocks()
        const { body, status } = response;
        expect(status).toBe(500);
        expect(body).toHaveProperty('message', 'Internal server error')
        done();
      })
      .catch((err) => done(err));
  })
})

describe("GET /cities", () => {
  test("200 get list City", (done) => {
    request(app)
      .get("/api/cities")
      .query({
        province: "DKI Jakarta"
      })
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(200);
        expect(typeof body == 'object').toBeTruthy();
        expect(body).toHaveProperty('province', 'DKI Jakarta')
        expect(body).toHaveProperty('cities')
        expect(Array.isArray(body.cities)).toBeTruthy()
        expect(body.cities.length).toEqual(2);
        done();
      })
      .catch((err) => done(err));
  })
  test("400 get list City", (done) => {
    request(app)
      .get("/api/cities")
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(400);
        expect(typeof body == 'object').toBeTruthy();
        expect(body).toHaveProperty('message', 'Bad request')
        done();
      })
      .catch((err) => done(err));
  })
  test("404 get list City", (done) => {
    request(app)
      .get("/api/cities")
      .query({
        province: "Dummy Data"
      })
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(404);
        expect(typeof body == 'object').toBeTruthy();
        expect(body).toHaveProperty('message', 'Data not found')
        done();
      })
      .catch((err) => done(err));
  })
  test("500 failed get list City", (done) => {
    jest.spyOn(City, 'findAll').mockRejectedValue('Error')
    request(app)
      .get("/api/cities")
      .query({
        province: "DKI Jakarta"
      })
      .then((response) => {
        jest.restoreAllMocks()
        const { body, status } = response;
        expect(status).toBe(500);
        expect(body).toHaveProperty('message', 'Internal server error')
        done();
      })
      .catch((err) => done(err));
  })
})

describe("GET /facilities/:filter", () => {
  test("200 get list of Faskes (DEFUALT)", (done) => {
    request(app)
      .get("/api/facilities/q")
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(200);
        expect(typeof body == 'object').toBeTruthy();
        expect(body).toHaveProperty('message')
        expect(body).toHaveProperty('total')
        expect(body).toHaveProperty('facilities')
        expect(Array.isArray(body.facilities)).toBeTruthy();
        done();
      })
      .catch((err) => done(err));
  })
  test("200 get list of Faskes (NAME)", (done) => {
    request(app)
      .get("/api/facilities/name")
      .query({
        name: "RS Bhayangkara"
      })
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(200);
        expect(typeof body == 'object').toBeTruthy();
        expect(body).toHaveProperty('message', "Filtering by name")
        expect(body).toHaveProperty('total')
        expect(body).toHaveProperty('facilities')
        expect(Array.isArray(body.facilities)).toBeTruthy();
        done();
      })
      .catch((err) => done(err));
  })
  test("200 get list of Faskes (CITY)", (done) => {
    request(app)
      .get("/api/facilities/city")
      .query({
        city: "Kota Jakarta Timur"
      })
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(200);
        expect(typeof body == 'object').toBeTruthy();
        expect(body).toHaveProperty('message', "Filtering by city")
        expect(body).toHaveProperty('total')
        expect(body).toHaveProperty('facilities')
        expect(Array.isArray(body.facilities)).toBeTruthy();
        done();
      })
      .catch((err) => done(err));
  })
  test("200 get list of Faskes (PROVINCE)", (done) => {
    request(app)
      .get("/api/facilities/province")
      .query({
        province: "DKI Jakarta"
      })
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(200);
        expect(typeof body == 'object').toBeTruthy();
        expect(body).toHaveProperty('message', "Filtering by province")
        expect(body).toHaveProperty('total')
        expect(body).toHaveProperty('facilities')
        expect(Array.isArray(body.facilities)).toBeTruthy();
        done();
      })
      .catch((err) => done(err));
  })
  test("200 get list of Faskes (LOC)", (done) => {
    request(app)
      .get("/api/facilities/loc")
      .query({
        lat: "-6.286886",
        lng: "106.770734",
        distance: 1000
      })
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(200);
        expect(typeof body == 'object').toBeTruthy();
        expect(body).toHaveProperty('message', "Filtering by location")
        expect(body).toHaveProperty('total')
        expect(body).toHaveProperty('facilities')
        expect(Array.isArray(body.facilities)).toBeTruthy();
        done();
      })
      .catch((err) => done(err));
  })
  test("200 get list of Faskes (LOC DEFAULT)", (done) => {
    request(app)
      .get("/api/facilities/loc")
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(200);
        expect(typeof body == 'object').toBeTruthy();
        expect(body).toHaveProperty('message', "Filtering by location")
        expect(body).toHaveProperty('total')
        expect(body).toHaveProperty('facilities')
        expect(Array.isArray(body.facilities)).toBeTruthy();
        done();
      })
      .catch((err) => done(err));
  })
  test("400 failed get Faskes (NAME)", (done) => {
    request(app)
      .get("/api/facilities/name")
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(400);
        expect(typeof body == 'object').toBeTruthy();
        expect(body).toHaveProperty('message', "Bad request")
        done();
      })
      .catch((err) => done(err));
  })
  test("400 failed get Faskes (CITY)", (done) => {
    request(app)
      .get("/api/facilities/city")
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(400);
        expect(typeof body == 'object').toBeTruthy();
        expect(body).toHaveProperty('message', "Bad request")
        done();
      })
      .catch((err) => done(err));
  })
  test("400 failed get Faskes (PROVINCE)", (done) => {
    request(app)
      .get("/api/facilities/province")
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(400);
        expect(typeof body == 'object').toBeTruthy();
        expect(body).toHaveProperty('message', "Bad request")
        done();
      })
      .catch((err) => done(err));
  })
  test("500 failed get list of Faskes (DEFAULT)", (done) => {
    jest.spyOn(sequelize, 'query').mockRejectedValue('Error')
    request(app)
      .get("/api/facilities/q")
      .then((response) => {
        jest.restoreAllMocks()
        const { body, status } = response;
        expect(status).toBe(500);
        expect(body).toHaveProperty('message', 'Internal server error')
        done();
      })
      .catch((err) => done(err));
  })
  test("500 failed get list of Faskes (NAME/CITY/PROVINCE)", (done) => {
    jest.spyOn(sequelize, 'query').mockRejectedValue('Error')
    request(app)
      .get("/api/facilities/name")
      .query({
        name: "RS Bhayangkara"
      })
      .then((response) => {
        jest.restoreAllMocks()
        const { body, status } = response;
        expect(status).toBe(500);
        expect(body).toHaveProperty('message', 'Internal server error')
        done();
      })
      .catch((err) => done(err));
  })
})

describe("GET /facilities/id/:id", () => {
  test("200 get Faskes", (done) => {
    request(app)
      .get("/api/facilities/id/0112R016")
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(200);
        expect(typeof body == 'object').toBeTruthy();
        done();
      })
      .catch((err) => done(err));
  })
  test("200 get Faskes", (done) => {
    request(app)
      .get("/api/facilities/id/0112R099")
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(404);
        expect(typeof body == 'object').toBeTruthy();
        expect(body).toHaveProperty('message', 'Data not found')
        done();
      })
      .catch((err) => done(err));
  })
  test("500 failed get Faskes", (done) => {
    jest.spyOn(Facility, 'findAll').mockRejectedValue('Error')
    request(app)
      .get("/api/facilities/id/0112R016")
      .then((response) => {
        jest.restoreAllMocks()
        const { body, status } = response;
        expect(status).toBe(500);
        expect(body).toHaveProperty('message', 'Internal server error')
        done();
      })
      .catch((err) => done(err));
  })
})