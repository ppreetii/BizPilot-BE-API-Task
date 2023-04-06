const jwt = require("jsonwebtoken");
const jwtConfig = require("../configs/config");

module.exports = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(403).send({
      message: "No Token provided.",
    });
  }
  if (!req.headers.authorization.startsWith("Bearer")) {
    return res.status(401).send({
      message: "Please provide proper token",
    });
  }
  let token = req.headers.authorization.split(" ")[1];
  
  jwt.verify(token, jwtConfig.secret, (err, decoded) => {
    if (err) {
      return res.status(403).send({
        message: "Unauthorized!",
      });
    }
    req.user = decoded.id;
    next();
  });
};
