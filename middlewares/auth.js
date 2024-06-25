const { decodeToken } = require("../utilities/jwt");
const { errorObj } = require("../helpers/responseObjects");

const middleware = (admin) => (req, res, next) => {
  const {
    headers: { authorization },
  } = req;
  if (!authorization) return res.json(errorObj("No tienes autorización"));
  decodeToken(authorization)
    .then((payload) => {
      req.userId = payload.userId;
      if (admin && !payload.admin)
        return res.json(errorObj("No tienes autorización"));
      if (!payload.n_pr)
        return res.status(401).json(errorObj("Acceso no autorizado"));
      return next();
    })
    .catch((error) => res.status(401).json(errorObj(error)));
};

module.exports.auth = middleware(false);
module.exports.adminAuth = middleware(true);
