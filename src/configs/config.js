const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  port: process.env.PORT || 3000,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PSWD,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  courierApiKey: process.env.COURIER_AUTH_TOKEN,
  jwtSecret: process.env.JWT_SECRET
};
