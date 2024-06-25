const Connection = require("../connection/db");
const { successObj, errorObj } = require("./responseObjects");

const response = (res, tran, prom, ...values) => {
  const cn = new Connection(tran);
  prom(cn, ...values)
    .then((result) => success(res, cn, result))
    .catch((error) => fail(res, cn, error));
};

const success = async (res, cn, result = []) => {
  cn.close();
  res.json(successObj(result, "SUCCESS"));
};

const fail = (res, cn, error) => {
  console.log(error);
  cn.close();
  res.json(errorObj(error));
};

module.exports = response;
