const { Router } = require("express");

const response = require("../helpers/response");
const {
  getSummary,
  insertParameters,
  updateParameters,
  deleteParameters,
} = require("../queries/parameters");

const router = Router();

router.get("/", (req, res) => {
  response(res, false, getSummary);
});

router.post("/", (req, res) => {
  const skuParams = req.body;
  response(res, false, insertParameters, skuParams);
});

router.put("/", (req, res) => {
  const skuParams = req.body;
  response(res, false, updateParameters, skuParams);
});

router.delete("/", (req, res) => {
  const { id } = req.query;
  response(res, false, deleteParameters, id);
});

module.exports = router;
