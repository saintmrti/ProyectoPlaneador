const router = require("express").Router();

const login = require("../helpers/login");
const { getUserByEmail } = require("../queries/users");
// const { auth } = require("../middlewares/auth");

router.post("/login", (req, res) => {
  const { credentials } = req.body;
  login(res, getUserByEmail, credentials);
});

module.exports = router;
