const CompanyDB = require("../models/company");
const FounderDB = require("../models/founder");
var express = require("express");
// const { Op } = require("sequelize");
const { route } = require("../app");
var path = require("path");
var router = express.Router();

router.get("/companies", async (req, res, next) => {
  try {
    const companies = await CompanyDB.findAll({
      order: [["CompanyID", "ASC"]],
    });

    res.status(200).json(companies);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

router.get("/founders", async (req, res, next) => {
  try {
    const founders = await FounderDB.findAll();
    res.status(200).json(founders);
  } catch (err) {
    next(err);
  }
});

router.get("/founders/:id", async (req, res, next) => {
  try {
    const founders = await FounderDB.findByPk(req.params.id);
    res.status(200).json(founders);
  } catch (err) {
    next(err);
  }
});

router.post("/companies", async (req, res, next) => {
  try {
    await CompanyDB.create(req.body);
    res.status(201).json({ message: "Created the company!" });
  } catch (err) {
    next(err);
  }
});

router.post("/founders", async (req, res, next) => {
  try {
    await FounderDB.create(req.body);
    res.status(201).json({ message: "Founder Created!" });
  } catch (err) {
    next(err);
  }
});

router.get("/companies/:id/founders", async (req, res, next) => {
  try {
    const founders = await FounderDB.findAll({
      where: { CompanyID: `${req.params.id}` },
    });
    if (founders) {
      return res.status(200).json(founders);
    } else {
      return res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
});

router.put("/companies/:id", async (req, res, next) => {
  try {
    const { Name, FoundedDate } = req.body;
    await CompanyDB.update(
      {
        Name: Name,
        FoundedDate: FoundedDate,
      },
      {
        where: {
          CompanyID: `${req.params.id}`,
        },
      }
    );
    return res.status(200).json({ message: "Updated the company!" });
  } catch (err) {
    console.log(err);
    next(err);
  }
});

router.delete("/companies/:id", async (req, res, next) => {
  try {
    await FounderDB.destroy({ where: { CompanyID: `${req.params.id}` } });
    await CompanyDB.destroy({ where: { CompanyID: `${req.params.id}` } });
    return res
      .status(200)
      .json({
        message: "Successfully deleted company and the child founders!",
      });
  } catch (err) {
    console.log(err);
    next(err);
  }
});
router.delete("/founders/:id", async (req, res, next) => {
  try {
    await FounderDB.destroy({ where: { FounderID: `${req.params.id}` } });
    return res.status(200).json({ message: "Successfully deleted founder!" });
  } catch (err) {
    console.log(err);
    next(err);
  }
});

router.put("/companies/:id/founders/:founderID", async (req, res, next) => {
  try {
    const { CompanyID, Name, Role } = req.body;
    const company = await CompanyDB.findByPk(req.params.id);
    if (company) {
      const founder = await FounderDB.findByPk(req.params.founderID, {
        where: { CompanyID: `${company.CompanyID}` },
      });
      if (founder) {
        await FounderDB.update(
          {
            CompanyID: CompanyID,
            Name: Name,
            Role: Role,
          },
          {
            where: {
              FounderID: founder.FounderID,
            },
          }
        );
      }
      return res
        .status(200)
        .json({ message: "Successfully updated the founder!" });
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
});

router.delete("/companies/:id/founders/:founderID", async (req, res, next) => {
  try {
    const company = await CompanyDB.findByPk(req.params.id);
    if (company) {
      const founder = await FounderDB.findByPk(req.params.founderID, {
        where: { CompanyID: `${company.CompanyID}` },
      });
      if (founder) {
        await FounderDB.destroy({
          where: { FounderID: founder.FounderID },
        });
      }
      return res
        .status(200)
        .json({ message: "Successfully deleted the founder!" });
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
});

router.post("/companies/:id/founders", async (req, res, next) => {
  try {
    const company = await CompanyDB.findByPk(req.params.id);
    if (company) {
      const founder = await FounderDB.create(req.body);
      if (founder) {
        return res
          .status(201)
          .json({ message: "Successfully inserted the founder!" });
      }
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
});

router.get("/companies/:name/:foundedDate", async (req, res, next) => {
  try {
    const companies = await CompanyDB.findAll({
      where: {
        Name: req.params.name,
        FoundedDate: req.params.foundedDate,
      },
    });
    if (companies) {
      return res.status(200).json(companies);
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
});

module.exports = router;
