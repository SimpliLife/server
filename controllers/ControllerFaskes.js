const { sequelize, Facility, Province, City } = require('../models');
const { Op } = require("sequelize")

class ControllerFaskes {
  static async getListFaskes(req, res, next) {
    try {
      const { filter } = req.params
      let output = {}
      let result
      if (filter == 'loc') {
        const distance = req.query.distance || 1000;
        const lng = req.query.lng || '107.5904275402039';
        const lat = req.query.lat || '-6.9439994342171225';
        result = await sequelize.query(
          `select
            *
          from
            "Facilities"
          where
            ST_DWithin(geography,
            ST_MakePoint(:lng,
            :lat),
            :distance,
          true) = true;`,
          {
            replacements: {
              distance: +distance,
              lng: parseFloat(lng),
              lat: parseFloat(lat),
            },
            plain: false,
            raw: false,
            type: sequelize.QueryTypes.SELECT,
          }
        );
        output.message = "Filtering by location"
        output.total = result.length
      } else if (filter == 'city') {
        if (!req.query.city) throw { code: 400 }
        result = await Facility.findAll({
          where: {
            city: {
              [Op.iLike]: `%${req.query.city}%`
            }
          }
        })
        output.message = "Filtering by city"
        output.total = result.length
      } else if (filter == 'province') {
        if (!req.query.province) throw { code: 400 }
        result = await Facility.findAll({
          where: {
            province: {
              [Op.iLike]: `%${req.query.province}%`
            }
          }
        })
        output.message = "Filtering by province"
        output.total = result.length
      } else if (filter == 'name') {
        if (!req.query.name) throw { code: 400 }
        result = await Facility.findAll({
          where: {
            facility: {
              [Op.iLike]: `%${req.query.name}%`
            }
          }
        })
        output.message = "Filtering by name"
        output.total = result.length
      } else {
        output.message = "Here is the default output"
        result = await sequelize.query(
          `select
            *
          from
            "Facilities"
          where
            ST_DWithin(geography,
            ST_MakePoint(:lng,
            :lat),
            :distance,
          true) = true 
          ORDER BY type DESC, city ASC;`,
          {
            replacements: {
              distance: 350,
              lng: parseFloat("106.8481933"),
              lat: parseFloat("-6.1949989"),
            },
            plain: false,
            raw: false,
            type: sequelize.QueryTypes.SELECT,
          }
        );
        output.total = result.length
      }
      output.facilities = result
      res.status(200).json(output);
    } catch (error) {
      next(error)
    }
  }
  static faskesById(req, res, next) {
    Facility.findByPk(req.params.id)
      .then(data => {
        if (!data) throw { code: 404 }
        res.status(200).json(data)
      })
      .catch(error => next(error))
  }
  static async listProvince(req, res, next) {
    Province.findAll({
      attributes: ['province']
    })
      .then(data => {
        res.status(200).json({ provinces: data })
      })
      .catch(err => next(err))
  }
  static listCityByProvinces(req, res, next) {
    if (!req.query.province) return next({ code: 400 })
    City.findAll({
      attributes: ['province', 'city'],
      where: {
        province: req.query.province
      }
    })
      .then(data => {
        if (!data.length) throw { code: 404 }
        res.status(200).json(
          {
            province: req.query.province,
            cities: data
          }
        )
      })
      .catch(err => next(err))
  }
  static async unionProvinceCity(req, res, next) {
    try {
      let locations = await sequelize.query(
        `SELECT * FROM (
          SELECT city as name, 'City' as type from "Cities"
          UNION SELECT province as name,'Province'as type  from "Provinces"
        ) raw
        ORDER BY name, type;`,
        {
          plain: false,
          raw: false,
          type: sequelize.QueryTypes.SELECT,
        }
      );
      res.status(200).json({ locations })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = ControllerFaskes
