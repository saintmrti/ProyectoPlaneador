const { Router } = require("express");
const _ = require("lodash");

const Connection = require("../connection/db");
const response = require("../helpers/response");
const {
  getSummary,
  insertRequirement,
  deleteRequirement,
} = require("../queries/requirement");
const { transfered } = require("../controllers/transfered.controller");

const router = Router();

router.get("/", (req, res) => {
  const { date } = req.query;
  response(res, false, getSummary, date);
});

router.post("/", async (req, res) => {
  try {
    const { date } = req.body;
    const cn = new Connection(false);
    const invNacional = await transfered(cn, date);
    cn.close();
    response(res, true, insertRequirement, { invNacional, date });
  } catch (error) {
    console.log(error);
  }
});

router.delete("/", (req, res) => {
  const { date } = req.query;
  response(res, true, deleteRequirement, date);
});

module.exports = router;
