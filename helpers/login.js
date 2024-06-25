const _ = require("lodash");

const Connection = require("../connection/db");
const { successObj, errorObj } = require("./responseObjects");
// const { hashPassword } = require("../utilities/encrypt");
const { generateToken } = require("../utilities/jwt");

const response = (res, getUserByEmail, credentials) => {
  const conn = new Connection();
  getUserByEmail(conn, credentials.email)
    .then((result) => success(res, conn, result, credentials.password))
    .catch((error) => fail(res, conn, error));
};

const success = async (res, conn, result = [], password_sent) => {
  conn.close();
  if (_.isEmpty(result)) return res.json(errorObj("El usuario no existe"));
  const { password, userId, userName, userEmail } = result;
  if (password !== password_sent)
    return res.json(errorObj("Contraseña incorrecta"));
  res.json(
    successObj(
      {
        token: generateToken(userId, userName, userEmail),
      },
      "SUCCESS"
    )
  );
};

const fail = (res, conn, error) => {
  console.log(error);
  conn.close();
  res.json(errorObj(error.message));
};

module.exports = response;
