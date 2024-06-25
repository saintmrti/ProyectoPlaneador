const { Router } = require("express");

const response = require("../helpers/response");
const { getSummary, updateProducts } = require("../queries/products");

const router = Router();

router.get("/", (req, res) => {
  response(res, false, getSummary);
});

router.put("/", (req, res) => {
  try {
    const { id, min_kg_carga } = req.body;
    const newObject = { id, min_kg_carga: parseInt(min_kg_carga) };
    response(res, false, updateProducts, newObject);
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
