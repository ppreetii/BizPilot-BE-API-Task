const config = require("./config");
const COMMON = require("../constants/common");

let database =
  process.env.NODE_ENV === COMMON.ENVIRONMENT.DEV
    ? config.dbName + "_dev"
    : process.env.NODE_ENV === COMMON.ENVIRONMENT.TEST
    ? config.dbName + "_test"
    : config.dbName + "_prod";

module.exports = {
  database,
  username: config.dbUser,
  password: config.dbPassword,
  host: config.dbHost,
  dialect: "mysql",
  logging: false
};
