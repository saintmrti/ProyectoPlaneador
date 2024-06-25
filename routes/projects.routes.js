const { Router } = require("express");

const response = require("../helpers/response");
const {
  getSummary,
  insertProject,
  updateProject,
  deleteProject,
} = require("../queries/projects");

const router = Router();

router.get("/", (req, res) => {
  response(res, false, getSummary);
});

router.post("/", (req, res) => {
  const project = req.body;
  response(res, false, insertProject, project);
});

router.put("/", (req, res) => {
  const project = req.body;
  response(res, false, updateProject, project);
});

router.delete("/", (req, res) => {
  const { idProyecto } = req.query;
  response(res, false, deleteProject, idProyecto);
});

module.exports = router;
