const { Router } = require("express");

const Connection = require("../connection/db");
const {
  requirementValidator,
  inventoryValidator,
  orderValidator,
  weekValidator,
} = require("../helpers/fileValidator");

const {
  parseInventory,
  uploadInventory,
  inventoryExist,
} = require("../controllers/inventory.controller");

const {
  parseRequirement,
  uploadRequirement,
  requirementExist,
} = require("../controllers/requirement.controller");

const {
  parseOrder,
  uploadOrder,
  orderExist,
} = require("../controllers/order.controller");

const {
  parseWeeks,
  uploadWeeks,
  weeksExist,
} = require("../controllers/weeks.controller");

const router = Router();

router.post("/inventario", async (req, res) => {
  try {
    const date = req.body.fecha;
    const files = req.files.files;

    if (files && files.length > 0) {
      let inv_nacional;

      for (let i = 0; i < files.length; i++) {
        if (inventoryValidator(files[i].name)) {
          inv_nacional = files[i];
        }
      }

      if (inv_nacional) {
        const cn = new Connection(false);
        const data_inv = await parseInventory(inv_nacional.data);
        const exist = await inventoryExist(cn, date);
        if (exist === 2) {
          await uploadInventory(cn, res, data_inv, date);
          res.json({
            isError: false,
            status: "SUCCESS",
            data: { uploadStatus: true },
          });
        } else {
          res.json({
            isError: true,
            status: "ERROR: Ya existe un inventario para esta fecha.",
          });
        }
        cn.close();
      }
    }
  } catch (e) {
    console.log(e);
    res.json({ isError: true, status: "Error al cargar inventario" });
  }
});

router.post("/requerimiento", async (req, res) => {
  try {
    const date = req.body.fecha;
    const files = req.files.files;

    if (files && files.length > 0) {
      let req_celda;

      for (let i = 0; i < files.length; i++) {
        if (requirementValidator(files[i].name)) {
          req_celda = files[i];
        }
      }

      if (req_celda) {
        const cn = new Connection(false);
        const data_req = parseRequirement(req_celda.data);
        const exist = await requirementExist(cn, date);
        if (exist === 2) {
          await uploadRequirement(cn, res, data_req, date);
          res.json({
            isError: false,
            status: "SUCCESS",
            data: { uploadStatus: true },
          });
        } else {
          res.json({
            isError: true,
            status: "ERROR: Ya existe un requerimiento para esta fecha.",
          });
        }
        cn.close();
      }
    }
  } catch (e) {
    console.log(e);
    res.json({ isError: true, status: "Error al cargar inventario" });
  }
});

router.post("/wip", async (req, res) => {
  try {
    const date = req.body.fecha;
    const files = req.files.files;

    if (files && files.length > 0) {
      let wip_jam;

      for (let i = 0; i < files.length; i++) {
        if (orderValidator(files[i].name)) {
          wip_jam = files[i];
        }
      }

      if (wip_jam) {
        const cn = new Connection(false);
        const data_order = parseOrder(wip_jam.data);
        const exist = await orderExist(cn, date);
        if (exist === 2) {
          await uploadOrder(cn, res, data_order, date);
          res.json({
            isError: false,
            status: "SUCCESS",
            data: { uploadStatus: true },
          });
        } else {
          res.json({
            isError: true,
            status: "ERROR: Ya existe un WIP para esta fecha.",
          });
        }
        cn.close();
      }
    }
  } catch (e) {
    console.log(e);
    res.json({ isError: true, status: "Error al cargar inventario" });
  }
});

router.post("/semanas", async (req, res) => {
  try {
    const date = req.body.fecha;
    const files = req.files.files;

    if (files && files.length > 0) {
      let weeks;

      for (let i = 0; i < files.length; i++) {
        if (weekValidator(files[i].name)) {
          weeks = files[i];
        }
      }

      if (weeks) {
        const cn = new Connection(false);
        const data_weeks = parseWeeks(weeks.data);
        const exist = await weeksExist(cn, date);
        if (exist === 2) {
          await uploadWeeks(cn, res, data_weeks, date);
          res.json({
            isError: false,
            status: "SUCCESS",
            data: { uploadStatus: true },
          });
        } else {
          res.json({
            isError: true,
            status: "ERROR: Ya existe un WIP para esta fecha.",
          });
        }
        cn.close();
      }
    }
  } catch (e) {
    console.log(e);
    res.json({ isError: true, status: "Error al cargar inventario" });
  }
});

module.exports = router;
