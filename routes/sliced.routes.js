const { Router } = require("express");

const response = require("../helpers/response");
const { getRequirements, insertRequirement } = require("../queries/sliced");

const router = Router();

router.get("/", (req, res) => {
  const { date } = req.query;
  response(res, false, getRequirements, date);
});

router.post("/", (req, res) => {
  const { products, date } = req.body;
  response(res, false, insertRequirement, { products, date });
});

module.exports = router;
